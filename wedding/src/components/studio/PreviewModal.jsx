import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

// Premium preview overlay. Shows the invitation video if uploaded, otherwise
// the poster + a note. Audio never autoplays - the visitor presses play.
export default function PreviewModal({ template, onClose }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!template) return null
  const price = templatePrice(template)
  const hasVideo = !!template.previewVideo
  const hasAudio = !!template.music.audioUrl
  const isLive = template.engine === 'live'

  const toggleAudio = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else { el.pause(); setPlaying(false) }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${template.title} preview`} onClick={onClose}>
      <div className="modal__panel" data-theme-id={template.theme} style={cssVars(template.theme)} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label="Close preview" onClick={onClose}>×</button>

        <div className="modal__media">
          {hasVideo ? (
            <video className="modal__video" src={template.previewVideo} poster={template.poster} controls playsInline preload="metadata" />
          ) : (
            <div className="modal__poster-wrap">
              <img className="modal__poster" src={template.poster} alt={`${template.title} preview`} />
              <div className="modal__soon">
                <p className="modal__soon-title">
                  {isLive ? 'A live, interactive invitation' : 'Cinematic video preview coming soon'}
                </p>
                {isLive && (
                  <Link className="btn btn--gold" to={template.inviteHref}>Open the live invitation →</Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal__info">
          <div className="modal__title-row">
            <div>
              <p className="modal__eyebrow">{template.subtitle}</p>
              <h2 className="modal__title">{template.title}</h2>
            </div>
            <span className="modal__price">{price.display}</span>
          </div>
          <p className="modal__desc">{template.description}</p>
          <p className="modal__meta">
            <span>♫ {template.music.title}</span>
            <span className="card__dot">•</span>
            <span>{template.duration}</span>
            <span className="card__dot">•</span>
            <span>Personalised names</span>
          </p>

          <div className="modal__actions">
            {hasAudio && (
              <button type="button" className="btn btn--ghost" onClick={toggleAudio}>
                {playing ? '❚❚ Pause music' : '▶ Play music'}
              </button>
            )}
            {isLive && <Link className="btn btn--ghost" to={template.inviteHref}>Open full experience</Link>}
            <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
              Order · {price.display}
            </a>
          </div>
        </div>

        {hasAudio && <audio ref={audioRef} src={template.music.audioUrl} loop />}
      </div>
    </div>
  )
}
