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

  // Autoplay hardening + viewport-gated playback. Every background film
  // autoplays (muted) on mobile AND desktop, in every scene that has one.
  //  1) Force the muted *property* on. React only writes the `muted` attribute,
  //     but the browser's autoplay policy checks the property — without this a
  //     muted video is treated as unmuted, autoplay is blocked, and the poster
  //     never lifts (this is why the film "doesn't play" in production).
  //  2) Playback is driven from JS, not the `autoPlay` attribute. The attribute
  //     makes the browser eagerly load the file even with preload="none",
  //     so every off-screen scene would fight for bandwidth on open. Calling
  //     play() ourselves gives muted autoplay (always policy-allowed) exactly
  //     when we want it: immediately for the opening, on approach for the rest.
  //  3) Play while on screen; pause when scrolled away.
  useEffect(() => {
    if (!showVideo) return undefined
    const el = videoRef.current
    const wrap = wrapRef.current
    if (!el || !wrap) return undefined
    el.muted = true
    el.defaultMuted = true
    const play = () => {
      if (!autoplay) return
      el.muted = true
      // Buffer ahead so a background film plays smoothly instead of stalling
      // ("getting stuck") mid-scene. The element ships as preload="none" so it
      // never loads on mount; we upgrade it to eager buffering only once the
      // scene is actually approaching, then start playback. Relying on the
      // opening's cache alone was not enough — a deferred film with no buffer
      // of its own runs dry the moment it plays.
      try { if (el.preload !== 'auto') el.preload = 'auto' } catch { /* noop */ }
      el.play?.().catch(() => {})
    }
    let io
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) play()
            else el.pause?.()
          })
        },
        // Start loading/playing well BEFORE the scene is fully in view so the
        // film has time to buffer and is already moving when it arrives.
        { threshold: 0.01, rootMargin: '40% 0px' },
      )
      io.observe(wrap)
    } catch {
      play() // no IntersectionObserver support: just autoplay
    }
    // The opening film (priority) is already on screen at mount — start it now
    // instead of waiting for the observer's first (async) callback.
    if (priority) play()
    return () => io?.disconnect()
  }, [showVideo, source, autoplay, priority])

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
          // No autoPlay attribute on purpose — playback is driven from JS (see
          // the effect above) so it autoplays muted on mobile + desktop without
          // the attribute forcing an eager load. The opening film (priority)
          // preloads eagerly so it starts instantly behind its poster. Later
          // scenes stay preload="none": every scene reuses the SAME film file,
          // so by the time one scrolls into view the opening has already cached
          // it and play() starts from cache — with no mount-time load that a
          // transient error could turn into a permanent poster fallback. The
          // poster is a real frame (eager), so first paint is always instant.
          preload={priority ? 'auto' : 'none'}
          // The poster (a real film frame) hides only once the film is truly
          // PLAYING, and comes back whenever playback stalls, waits to buffer,
          // or pauses. So a background film that buffers slowly shows a clean
          // still instead of a frozen or black frame ("stuck" / "does not
          // load"); onError falls back to the poster permanently.
          onPlaying={() => setReady(true)}
          onTimeUpdate={() => setReady(true)}
          onWaiting={() => setReady(false)}
          onStalled={() => setReady(false)}
          onPause={() => setReady(false)}
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
