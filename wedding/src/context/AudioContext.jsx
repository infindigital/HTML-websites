import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react'
import config from '../config.js'

const AudioContext = createContext(null)

// A single shared audio element. `src` and `startOffset` can be supplied per
// invitation (each religion has its own track and its own start time); they
// fall back to the studio defaults when omitted. Looping restarts from the
// offset so any intro is skipped every cycle.
export function AudioProvider({ children, src, startOffset }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  const audioSrc = src || config.audioSrc
  const resolveOffset = () =>
    startOffset != null ? Number(startOffset) || 0 : Number(config.audioStartOffset) || 0
  const offsetRef = useRef(resolveOffset())
  offsetRef.current = resolveOffset()

  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined

    const seekToStart = () => {
      const off = offsetRef.current
      if (off > 0 && el.currentTime < off) {
        try {
          el.currentTime = off
        } catch {
          /* not seekable yet - play() will retry the seek */
        }
      }
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onReady = () => setReady(true)
    const onMeta = seekToStart
    const onEnded = () => {
      try {
        el.currentTime = offsetRef.current
      } catch {
        /* ignore */
      }
      el.play().catch(() => {})
    }

    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('canplay', onReady)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnded)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('canplay', onReady)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnded)
    }
  }, [])

  // Warm the track up in the background so it plays the INSTANT the visitor
  // taps to open — on mobile and desktop alike. The <audio> ships as
  // preload="none" so it never competes with the poster on first paint; a
  // beat later (once the opening has painted, and the film still hasn't
  // loaded — that waits for the tap) we fetch the audio and pre-seek it to its
  // start offset, so the buffer is already sitting at the right spot when
  // play() is called. Also warmed on the first pointer interaction, whichever
  // comes first.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined
    let warmed = false
    const warm = () => {
      if (warmed) return
      warmed = true
      try {
        el.preload = 'auto'
        el.load() // loadedmetadata -> seekToStart buffers at the offset
      } catch {
        /* noop */
      }
    }
    const t = window.setTimeout(warm, 350)
    const onFirst = () => warm()
    window.addEventListener('pointerdown', onFirst, { once: true, passive: true })
    window.addEventListener('touchstart', onFirst, { once: true, passive: true })
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('pointerdown', onFirst)
      window.removeEventListener('touchstart', onFirst)
    }
  }, [])

  const play = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    const off = offsetRef.current
    if (off > 0 && el.currentTime < off) {
      try {
        el.currentTime = off
      } catch {
        /* ignore */
      }
    }
    const p = el.play()
    if (p && typeof p.then === 'function') {
      p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  return (
    <AudioContext.Provider value={{ isPlaying, ready, play, pause, toggle }}>
      <audio ref={audioRef} src={audioSrc} preload="none" playsInline />
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
