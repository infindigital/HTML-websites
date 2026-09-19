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

  // Whether the visitor wants the music on. This is the *intent* (set when they
  // open the seal / press play, cleared when they mute) and is kept separate
  // from whether the element is actually producing sound — so we can silence a
  // backgrounded tab without forgetting that the music should resume on return.
  const wantsPlayRef = useRef(false)

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
    wantsPlayRef.current = true
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
    // A manual pause clears the intent, so it won't auto-resume on return.
    wantsPlayRef.current = false
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, play, pause])

  // Tie the music to actually being on the page. A playing HTML5 audio element
  // otherwise keeps sounding in the background — in another tab, another app, or
  // the phone's lock-screen controls — until the browser itself is closed. So we
  // silence it the moment the page is hidden (tab switched away, screen locked,
  // navigating out, or closing) and resume it when the visitor returns, unless
  // they had muted it themselves. Works the same on desktop and mobile.
  useEffect(() => {
    const handleVisibility = () => {
      const el = audioRef.current
      if (!el) return
      if (document.visibilityState === 'hidden') {
        // Left the site — go quiet. Keep the intent so we can resume on return.
        if (!el.paused) el.pause()
      } else if (wantsPlayRef.current && el.paused) {
        // Back on the site and the music was meant to be on — pick it back up.
        el.play().catch(() => {})
      }
    }

    // pagehide covers the final unload (close / navigate away), including cases
    // where the last visibilitychange doesn't fire before the page is gone.
    const handlePageHide = () => {
      audioRef.current?.pause()
    }

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('pagehide', handlePageHide)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

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
