import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars, getTheme } from '../../studio/themes.js'

// Premium preview overlay. Shows the invitation video if one has been uploaded,
// otherwise the poster + a note. Music toggles only if an audio file exists.
// Audio never autoplays — the visitor presses play.
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
  const theme = getTheme(template.category)
  const price = templatePrice(template)
  const hasVideo = !!template.previewVideo
  const hasAudio = !!template.music.audioUrl

  const toggleAudio = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${template.title} preview`} onClick={onClose}>
      <div
        className="modal__panel"
        data-religion={template.category}
        style={cssVars(template.category)}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" aria-label="Close preview" onClick={onClose}>×</button>

        <div className="modal__media">
          {hasVideo ? (
            <video
              className="modal__video"
              src={template.previewVideo}
              poster={template.poster}
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="modal__poster-wrap">
              <img className="modal__poster" src={template.poster} alt={`${template.title} preview`} />
              <div className="modal__soon">
                <span className="modal__soon-symbol" aria-hidden="true">{theme.symbol}</span>
                <p>Cinematic video preview coming soon</p>
                {template.engine === 'muslim' && (
                  <Link className="btn btn--ghost" to={template.inviteHref}>
                    Open the live invitation →
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal__info">
          <div className="modal__title-row">
            <div>
              <p className="modal__eyebrow">{theme.symbol} {theme.label} · {template.subtitle}</p>
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
            {template.engine === 'muslim' && (
              <Link className="btn btn--ghost" to={template.inviteHref}>
                Open full experience
              </Link>
            )}
            <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
              Order this invitation
            </a>
          </div>
        </div>

        {hasAudio && <audio ref={audioRef} src={template.music.audioUrl} loop />}
      </div>
    </div>
  )
}
