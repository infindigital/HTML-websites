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

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // Keep React state in sync if playback changes for any external reason.
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onReady = () => setReady(true)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('canplay', onReady)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('canplay', onReady)
    }
  }, [])

  const play = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    const p = el.play()
    if (p && typeof p.then === 'function') {
      p.then(() => setIsPlaying(true)).catch(() => {
        // Autoplay blocked or file missing — stay silent, user can retry.
        setIsPlaying(false)
      })
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
      {/* Single shared looping audio element for the whole app. */}
      <audio
        ref={audioRef}
        src={config.audioSrc}
        loop
        preload="auto"
        playsInline
      />
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
