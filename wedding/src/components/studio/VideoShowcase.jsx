import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PreviewModal from './PreviewModal.jsx'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// One immersive, full-width cinematic block: a large film plays (muted, looping)
// while it's in view, beside an editorial block of the couple, date and venue.
// Blocks alternate side (film left / right) down the page for a long, magazine
// style scroll. "Watch film" opens the fullscreen player.
function FilmBlock({ t, flip, onWatch }) {
  const price = templatePrice(t)
  const videoRef = useRef(null)
  const ev = t.event

  useEffect(() => {
    const v = videoRef.current
    if (!v || reduceMotion()) return undefined
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.4 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <motion.article
      className={`filmblock${flip ? ' filmblock--flip' : ''}`}
      data-theme-id={t.theme}
      style={cssVars(t.theme)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <button type="button" className="filmblock__media" onClick={onWatch} aria-label={`Watch the ${t.title} film`}>
        <video
          ref={videoRef}
          className="filmblock__video"
          src={t.previewVideo}
          poster={t.poster}
          muted
          loop
          playsInline
          preload="metadata"
        />
        <span className="filmblock__scrim" aria-hidden="true" />
        <span className="filmblock__badge">{t.religionLabel}</span>
        <span className="filmblock__play">
          <span className="filmblock__play-icon" aria-hidden="true">▶</span> Watch film
        </span>
        <span className="filmblock__dur">{t.duration}</span>
      </button>

      <div className="filmblock__body">
        <p className="filmblock__eyebrow">{t.subtitle}</p>
        <h3 className="filmblock__title">{t.title}</h3>
        <p className="filmblock__couple">{t.couple}</p>
        {ev && (
          <p className="filmblock__date">
            {ev.weekday}, {ev.day} {ev.month} {ev.year}
            <span className="filmblock__dot">·</span>
            {ev.venue}
          </p>
        )}
        <p className="filmblock__desc">{t.description}</p>
        <div className="filmblock__actions">
          <button type="button" className="btn btn--ghost" onClick={onWatch}>▶ Watch film</button>
          <a className="btn btn--gold" href={templateOrderUrl(t)} target="_blank" rel="noreferrer">
            Order · {price.display}
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// The video-templates row: a long, immersive stack of cinematic film blocks.
export default function VideoShowcase({ templates }) {
  const [preview, setPreview] = useState(null)
  const films = templates.filter((t) => t.previewVideo)

  return (
    <>
      <div className="showcase">
        {films.map((t, i) => (
          <FilmBlock key={t.id} t={t} flip={i % 2 === 1} onWatch={() => setPreview(t)} />
        ))}
      </div>
      {preview && <PreviewModal template={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
