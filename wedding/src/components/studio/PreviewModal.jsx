import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

// Fullscreen cinematic preview. Plays the film if uploaded (vertical source on
// phones when available), otherwise the poster + a note. For live designs it
// links into the interactive invitation. Audio never autoplays with sound -
// the film starts muted and the visitor can unmute.
export default function PreviewModal({ template, onClose }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(max-width: 640px)')
    const on = () => setIsMobile(mq.matches)
    on()
    mq.addEventListener?.('change', on)
    return () => mq.removeEventListener?.('change', on)
  }, [])

  if (!template) return null
  const price = templatePrice(template)
  const hasVideo = !!template.previewVideo
  const hasAudio = !!template.music.audioUrl
  const isLive = template.engine === 'live'
  const vertical = isMobile && template.previewVideoVertical
  const videoSrc = vertical ? template.previewVideoVertical : template.previewVideo

  const toggleAudio = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="modal modal--player" role="dialog" aria-modal="true" aria-label={`${template.title} preview`} onClick={onClose}>
      <div className="modal__panel" data-theme-id={template.theme} style={cssVars(template.theme)} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label="Close preview" onClick={onClose}>×</button>

        <div className={`modal__stage${vertical ? ' modal__stage--vertical' : ''}`}>
          {hasVideo ? (
            <video
              className="modal__video"
              src={videoSrc}
              poster={template.poster}
              autoPlay
              muted
              loop
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="modal__poster-wrap">
              <img className="modal__poster" src={template.poster} alt={`${template.title} preview`} />
              <div className="modal__soon">
                <p className="modal__soon-title">
                  {isLive ? 'A live, interactive invitation' : 'Cinematic film coming soon'}
                </p>
                {isLive && (
                  <Link className="btn btn--gold" to={template.inviteHref}>Open the live invitation →</Link>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="modal__bar">
          <div className="modal__bar-main">
            <span className="modal__badge">{template.religionLabel}</span>
            <div className="modal__bar-titles">
              <h2 className="modal__title">{template.title}</h2>
              <p className="modal__sub">{template.subtitle} · {template.duration}</p>
            </div>
          </div>

          <div className="modal__bar-actions">
            {hasAudio && (
              <button type="button" className="btn btn--ghost" onClick={toggleAudio}>
                {playing ? '❚❚ Pause music' : '▶ Play music'}
              </button>
            )}
            {isLive && <Link className="btn btn--ghost" to={template.inviteHref}>Open full experience</Link>}
            <span className="modal__price">{price.display}</span>
            <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>
        </div>

        {hasAudio && <audio ref={audioRef} src={template.music.audioUrl} loop />}
      </div>
    </div>
  )
}
