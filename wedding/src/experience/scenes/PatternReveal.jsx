import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  SCENE 03 — PATTERN REVEAL  (rangoli / Islamic geometry / rings)
//  A pinned motif draws itself with scroll (stroke-dashoffset). At the end
//  the couple's names settle into the centre. This is the bridge into the
//  story. Genuinely different per religion via M.PatternDraw.
// =====================================================================
export default function PatternReveal() {
  const { config, M } = useExperience()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const centerOpacity = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])
  const centerScale = useTransform(scrollYProgress, [0.55, 0.95], [0.86, 1])
  const svgScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.06])

  return (
    <section className="scene scene--pattern" ref={ref} aria-label="Ornament">
      <div className="pattern__sticky">
        <motion.div className="pattern__art" style={{ scale: svgScale }}>
          <M.PatternDraw progress={scrollYProgress} className="pattern__svg" />
        </motion.div>
        <motion.div className="pattern__center" style={{ opacity: centerOpacity, scale: centerScale }}>
          <span className="pattern__mono">{config.couple.monogram}</span>
        </motion.div>
      </div>
    </section>
  )
}
