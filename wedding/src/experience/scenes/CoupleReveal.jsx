import { motion, useTransform } from 'framer-motion'
import CouplePortrait from '../characters/CouplePortrait.jsx'
import { Reveal, LineReveal } from '../primitives/Reveal.jsx'
import usePointerParallax from '../hooks/usePointerParallax.js'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  SCENE 02 — COUPLE REVEAL
//  The environment settles, then the couple appears with subtle life;
//  the names rise line by line and the date follows. Not a hero card.
// =====================================================================
export default function CoupleReveal() {
  const { config } = useExperience()
  const { px, py } = usePointerParallax()
  const fx = useTransform(px, (v) => v * 26)
  const fy = useTransform(py, (v) => v * 16)
  const { couple, hero, date } = config

  return (
    <section className="scene scene--couple" aria-label="The couple">
      <div className="couplereveal">
        <motion.div className="couplereveal__figs" style={{ x: fx, y: fy }}>
          <CouplePortrait priority />
        </motion.div>

        <div className="couplereveal__text">
          <Reveal as="p" className="scene__eyebrow">{hero.eyebrow}</Reveal>
          <h2 className="couplereveal__names">
            <LineReveal as="span" className="couplereveal__nm" lines={[couple.groom]} />
            <span className="couplereveal__amp">&amp;</span>
            <LineReveal as="span" className="couplereveal__nm" lines={[couple.bride]} />
          </h2>
          <Reveal as="p" className="couplereveal__marry" delay={0.15}>{hero.marrying}</Reveal>
          <Reveal as="p" className="couplereveal__date" delay={0.28}>
            {date.dateLabel}<span className="dot">·</span>{date.timeLabel}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
