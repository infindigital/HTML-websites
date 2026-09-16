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

  // Play only while on screen; pause when scrolled away.
  useEffect(() => {
    if (reduced || failed) return undefined
    const el = videoRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return undefined
    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) el.play?.().catch(() => {})
            else el.pause?.()
          })
        },
        { threshold: 0.12 },
      )
      io.observe(wrap)
    } catch {
      el.play?.().catch(() => {})
    }
    return () => io?.disconnect()
  }, [reduced, failed, source])

  const showVideo = !reduced && !failed && !!source

  return (
    <div ref={wrapRef} className={`cvideo ${className}`} {...rest}>
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={`cvideo__poster${ready && showVideo ? ' is-hidden' : ''}`}
          style={{ objectPosition }}
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
          autoPlay
          preload={priority ? 'auto' : 'metadata'}
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
