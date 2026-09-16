import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import CinematicVideo from '../primitives/CinematicVideo.jsx'
import { Reveal } from '../primitives/Reveal.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  CEREMONY — the mandap / nikah arch / church interior reveal.
//  The religion's cinematic video returns as a background; the motif's
//  lights (diyas / lanterns / candles) illuminate one by one as you
//  scroll. The final frame of the footage and the site's motif share a
//  palette, so there is no visible seam (brief §6).
// =====================================================================
export default function Ceremony() {
  const { config, M } = useExperience()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [lit, setLit] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const r = Math.round(v * 10) / 10
    setLit((p) => (p === r ? p : r))
  })
  const artScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.08])
  const c = config.ceremony

  return (
    <section className="scene scene--ceremony" ref={ref} aria-label={c.title}>
      <div className="ceremony__sticky">
        <CinematicVideo className="scene__bg" src={config.assets.video} poster={config.assets.poster} dim={0.52} />
        <motion.div className="ceremony__art" style={{ scale: artScale }}>
          <M.Ceremony lit={lit} className="ceremony__svg" />
        </motion.div>
        <div className="ceremony__text">
          <Reveal as="p" className="scene__eyebrow">The ceremony</Reveal>
          <Reveal as="h2" className="ceremony__title" delay={0.06}>{c.title}</Reveal>
          <Reveal as="p" className="ceremony__meta" delay={0.14}>
            {c.date}<span className="dot">·</span>{c.time}
          </Reveal>
          <Reveal as="p" className="ceremony__venue" delay={0.2}>{c.venue}</Reveal>
          <Reveal as="p" className="ceremony__note" delay={0.28}>{c.note}</Reveal>
        </div>
      </div>
    </section>
  )
}
