import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import PreviewModal from './PreviewModal.jsx'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'
import { stagger, fadeUp } from '../../studio/motion.js'

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// One immersive, full-width cinematic block. The film plays (muted, looping)
// while in view. On scroll, the film crops within its frame (the image drifts
// at its own rate) while the editorial column counter-parallaxes — independent
// layers for depth. The frame unmasks with a clip-path reveal; the text rises
// line by line. Blocks alternate side down the page for a magazine rhythm.
function FilmBlock({ t, flip, onWatch }) {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const reduced = useReducedMotion()
  const ev = t.event
  const price = templatePrice(t)
  // Reveal the framed film from the block's own scroll progress.
  // (An IntersectionObserver on the video deadlocks: the frame starts at
  // clip-path: inset(100%), and Chromium counts that ancestor clip as zero
  // visible area, so the video never "intersects" and never unmasks. Driving
  // the reveal off useScroll — the same signal the parallax already uses —
  // sidesteps that entirely and stays in one motion system.)
  const [revealed, setRevealed] = useState(() => reduceMotion())

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Image moves inside its crop; text moves the opposite way, more gently.
  const imgY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-8%', '8%'])
  const bodyY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 42, reduced ? 0 : -42])

  // Unmask once the block is ~1/6 into view; play only while it's on screen.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.16) setRevealed(true)
    const vid = videoRef.current
    if (!vid || reduceMotion()) return
    const onScreen = v > 0.06 && v < 0.94
    if (onScreen && vid.paused) vid.play().catch(() => {})
    else if (!onScreen && !vid.paused) vid.pause()
  })

  // Cover the case where a block is already in view on first paint (the
  // change event only fires on subsequent scroll).
  useEffect(() => {
    if (scrollYProgress.get() > 0.16) setRevealed(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <article className={`filmblock${flip ? ' filmblock--flip' : ''}`} ref={ref} data-theme-id={t.theme} style={cssVars(t.theme)}>
      <button
        type="button"
        className={`filmblock__media${revealed ? ' is-in' : ''}`}
        onClick={onWatch}
        aria-label={`Watch the ${t.title} film`}
      >
        <motion.span className="filmblock__crop" style={{ y: imgY }}>
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
        </motion.span>
        <span className="filmblock__scrim" aria-hidden="true" />
        <span className="filmblock__badge">{t.religionLabel}</span>
        <span className="filmblock__play">
          <span className="filmblock__play-icon" aria-hidden="true">▶</span> Watch film
        </span>
        <span className="filmblock__dur">{t.duration}</span>
      </button>

      <motion.div
        className="filmblock__body"
        style={{ y: bodyY }}
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="filmblock__eyebrow" variants={fadeUp}>{t.subtitle}</motion.p>
        <motion.h3 className="filmblock__title" variants={fadeUp}>{t.title}</motion.h3>
        <motion.p className="filmblock__couple" variants={fadeUp}>{t.couple}</motion.p>
        {ev && (
          <motion.p className="filmblock__date" variants={fadeUp}>
            {ev.weekday}, {ev.day} {ev.month} {ev.year}
            <span className="filmblock__dot">·</span>
            {ev.venue}
          </motion.p>
        )}
        <motion.p className="filmblock__desc" variants={fadeUp}>{t.description}</motion.p>
        <motion.div className="filmblock__actions" variants={fadeUp}>
          <button type="button" className="btn btn--ghost" onClick={onWatch}>▶ Watch film</button>
          <a className="btn btn--gold" href={templateOrderUrl(t)} target="_blank" rel="noreferrer">
            Order · {price.display}
          </a>
        </motion.div>
      </motion.div>
    </article>
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
