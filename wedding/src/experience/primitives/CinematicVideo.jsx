import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// =====================================================================
//  CinematicVideo — the reusable video scene.
//  ---------------------------------------------------------------------
//  * autoplay · muted · playsInline · loop (where policy permits)
//  * poster + fallback image (never a black flash, never a broken box)
//  * desktop + mobile source
//  * pauses when scrolled out of view, resumes when visible (IO)
//  * preload strategy (eager for the opening scene, lazy otherwise)
//  * reduced-motion: shows the poster still instead of playing
//  * error handling: if the file can't load, the poster stands in
//  The experience must never break because a video cannot load.
// =====================================================================
export default function CinematicVideo({
  src,
  srcMobile,
  poster,
  fallback,
  className = '',
  objectPosition = 'center',
  priority = false,
  autoplay = true, // when false, hold on the poster and load the film only
                   // once something calls play() (e.g. the opening "begin" tap)
  dim = 0, // 0..1 dark scrim for text legibility over the footage
  overlay, // layers rendered above the video (SVG/HTML motifs)
  children,
  ...rest
}) {
  const reduced = useReducedMotion()
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const posterSrc = poster || fallback

  // Prefer the lighter mobile encode when one is supplied.
  const isNarrow =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(max-width: 640px)').matches
  const source = srcMobile && isNarrow ? srcMobile : src

  const showVideo = !reduced && !failed && !!source

  // Autoplay hardening + viewport-gated playback.
  //  1) Force the muted *property* on. React only writes the `muted` attribute,
  //     but the browser's autoplay policy checks the property — without this a
  //     muted video is treated as unmuted, autoplay is blocked, and the poster
  //     never lifts (this is why the film "doesn't play" in production).
  //  2) Play while on screen; pause when scrolled away.
  useEffect(() => {
    if (!showVideo) return undefined
    const el = videoRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return undefined
    el.muted = true
    el.defaultMuted = true
    const play = () => {
      el.muted = true
      el.play?.().catch(() => {})
    }
    if (autoplay) play()
    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { if (autoplay) play() }
            else el.pause?.()
          })
        },
        { threshold: 0.12 },
      )
      io.observe(wrap)
    } catch {
      if (autoplay) play()
    }
    return () => io?.disconnect()
  }, [showVideo, source, autoplay])

  return (
    <div ref={wrapRef} className={`cvideo ${className}`} {...rest}>
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={`cvideo__poster${ready && showVideo ? ' is-hidden' : ''}`}
          style={{ objectPosition }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
      {showVideo && (
        <video
          ref={videoRef}
          className="cvideo__el"
          style={{ objectPosition }}
          src={source}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay={autoplay}
          // Never front-load the film. The poster (a real frame) paints
          // instantly; the multi-MB video downloads only once it actually
          // plays — on the opening "begin" tap, or when a later scene scrolls
          // into view. This is what stops the opening from looking "empty"
          // while a film and the music fight over one connection on load.
          preload="none"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      {dim > 0 && (
        <span className="cvideo__scrim" style={{ opacity: dim }} aria-hidden="true" />
      )}
      {overlay}
      {children}
    </div>
  )
}
