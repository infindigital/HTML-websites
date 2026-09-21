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

// The track opens with a short intro; playback — and every loop — begins here.
const START_OFFSET = Number(config.audioStartOffset) || 0

export function AudioProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // Cue the element to the start offset and keep React state in sync with the
  // element (playback can change for external reasons, e.g. the OS pausing it).
  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    const seekToStart = () => {
      // Only jump forward past the intro; never rewind a track already playing.
      if (START_OFFSET > 0 && el.currentTime < START_OFFSET) {
        try {
          el.currentTime = START_OFFSET
        } catch {
          /* not seekable yet — play() will retry the seek */
        }
      }
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onReady = () => setReady(true)
    // Cue to the offset as soon as we know the track's duration.
    const onMeta = seekToStart
    // Manual loop: restart from the offset so the intro is skipped every cycle
    // (native `loop` would rewind to 0 and replay the intro).
    const onEnded = () => {
      try {
        el.currentTime = START_OFFSET
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
    // Skip the intro if we're starting fresh (metadata seek may not have run).
    if (START_OFFSET > 0 && el.currentTime < START_OFFSET) {
      try {
        el.currentTime = START_OFFSET
      } catch {
        /* ignore */
      }
    }
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
      {/* Single shared audio element for the whole app. Looping is handled
          manually (see onEnded) so it repeats from the start offset. */}
      <audio ref={audioRef} src={config.audioSrc} preload="auto" playsInline />
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}
