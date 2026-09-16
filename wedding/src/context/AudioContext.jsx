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
