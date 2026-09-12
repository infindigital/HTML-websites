import { useEffect, useRef, useState } from 'react'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

// A video-first template card. Poster shows first; on desktop hover the
// (muted, looping) film plays; on tap/click the fullscreen player opens.
// The film is only fetched when the visitor hovers - the grid stays light.
export default function TemplateCard({ template, onPreview }) {
  const price = templatePrice(template)
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [inView, setInView] = useState(false)
  const hasVideo = !!template.previewVideo

  // Subtle in-view scale for mobile (no hover there).
  useEffect(() => {
    const el = cardRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const play = () => {
    const v = videoRef.current
    if (v) v.play().catch(() => {})
  }
  const stop = () => {
    const v = videoRef.current
    if (v) {
      v.pause()
      v.currentTime = 0
    }
  }

  return (
    <article
      ref={cardRef}
      className={`card${inView ? ' is-inview' : ''}`}
      data-theme-id={template.theme}
      style={cssVars(template.theme)}
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      <button
        type="button"
        className="card__media"
        onClick={() => onPreview(template)}
        aria-label={`Preview ${template.title}, ${template.religionLabel} wedding invitation`}
      >
        <span className="card__badge">{template.religionLabel}</span>
        {hasVideo ? (
          <video
            ref={videoRef}
            className="card__video"
            src={template.previewVideo}
            poster={template.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            className="card__poster"
            src={template.poster}
            alt={`${template.title}, ${template.subtitle} wedding invitation`}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="card__scrim" aria-hidden="true" />
        <span className="card__play">
          <span className="card__play-icon" aria-hidden="true">▶</span> Watch film
        </span>
        <span className="card__dur">{template.duration}</span>
      </button>

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
            View invitation →
          </button>
          <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
            Order · {price.display}
          </a>
        </div>
      </div>
    </article>
  )
}
