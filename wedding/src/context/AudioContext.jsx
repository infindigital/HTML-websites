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

  // Warm the track up in the background so it plays the INSTANT the visitor taps
  // to open. This is the whole game for "instant music": the <audio> ships as
  // preload="none" (so it never blocks first paint), and warm() flips it to
  // "auto" and calls load() to start buffering. We do that EARLY — a few hundred
  // ms after mount, right after the film's poster has painted — because the
  // "begin" tap usually lands within a second or two, and if the buffer only
  // started at 1.6s (as it used to) the tap hit a stone-cold element and the
  // song lagged. Starting the fetch this early means the track is already
  // buffered (and, with start:0 configs, sitting at byte 0 ready to go) by the
  // time play() is called inside the tap gesture. Warmed on the first pointer
  // interaction too, so a very fast tapper (and iOS, which only buffers after a
  // gesture) still gets the buffer going the moment they touch the screen.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return undefined
    let warmed = false
    const warm = () => {
      if (warmed) return
      warmed = true
      try {
        el.preload = 'auto'
        el.load()
      } catch {
        /* noop */
      }
    }
    // Small head start for the film's poster, then buffer the song right away.
    const t = window.setTimeout(warm, 300)
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
