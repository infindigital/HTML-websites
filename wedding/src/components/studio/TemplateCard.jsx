import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A living, video-first card. The film plays (muted, looping) while the card is
// in view; the whole card tilts in 3D toward the pointer; tapping the film opens
// the full interactive invitation, and "Watch film" opens the cinematic player.
export default function TemplateCard({ template, onPreview }) {
  const price = templatePrice(template)
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const mediaRef = useRef(null)
  const hasVideo = !!template.previewVideo
  // Serve the lighter 720p encode to phones.
  const narrow = typeof window !== 'undefined' && window.matchMedia?.('(max-width: 640px)').matches
  const videoSrc = (narrow && template.previewVideoMobile) || template.previewVideo
  const ev = template.event

  useEffect(() => {
    const card = cardRef.current
    const v = videoRef.current
    if (!card || !v || reduceMotion()) return undefined
    // Set the muted *property* (React only sets the attribute, which the
    // autoplay policy ignores) so the muted film is actually allowed to play.
    v.muted = true
    v.defaultMuted = true
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { v.muted = true; v.play().catch(() => {}) }
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(card)
    return () => io.disconnect()
  }, [hasVideo])

  const onEnter = () => {
    if (reduceMotion()) return
    const c = cardRef.current
    const m = mediaRef.current
    if (c) c.style.transition = 'transform 0.12s ease-out'
    if (m) m.style.transition = 'transform 0.18s ease-out'
  }
  const onMove = (e) => {
    const c = cardRef.current
    if (!c || reduceMotion()) return
    const r = c.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    // Card tilts in 3D; the image parallaxes the opposite way inside its frame.
    c.style.transform = `perspective(1000px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-8px)`
    const m = mediaRef.current
    if (m) m.style.transform = `scale(1.08) translate(${(-px * 14).toFixed(1)}px, ${(-py * 14).toFixed(1)}px)`
  }
  const onLeave = () => {
    const c = cardRef.current
    const m = mediaRef.current
    if (c) {
      c.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      c.style.transform = ''
    }
    if (m) {
      m.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
      m.style.transform = ''
    }
  }

  return (
    <article
      ref={cardRef}
      className="card"
      data-theme-id={template.theme}
      style={cssVars(template.theme)}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link
        className="card__media"
        to={template.inviteHref}
        aria-label={`Open the ${template.title} invitation`}
      >
        <span className="card__badge">{template.religionLabel}</span>
        {hasVideo ? (
          <video
            ref={(el) => {
              videoRef.current = el
              mediaRef.current = el
            }}
            className="card__video"
            src={videoSrc}
            poster={template.poster}
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          <img
            ref={mediaRef}
            className="card__poster"
            src={template.poster}
            alt={`${template.title}, ${template.subtitle} wedding invitation`}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="card__scrim" aria-hidden="true" />
        <span className="card__play">
          <span className="card__play-icon" aria-hidden="true">✦</span> Open invitation
        </span>
        <span className="card__dur">{template.duration}</span>
        {ev && (
          <span className="card__date">
            {ev.day} {ev.month} {ev.year}
          </span>
        )}
      </Link>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{template.title}</h3>
          <span className="card__price">{price.display}</span>
        </div>
        <p className="card__sub">{template.subtitle}</p>
        <p className="card__meta">
          <span>♫ {template.music.title}</span>
          <span className="card__dot">•</span>
          <span>Cinematic film</span>
        </p>
        <div className="card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => onPreview(template)}>
            ▶ Open invitation
          </button>
          <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
            Order · {price.display}
          </a>
        </div>
      </div>
    </article>
  )
}
