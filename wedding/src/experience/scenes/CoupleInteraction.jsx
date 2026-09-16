import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import AnimatedCouple from '../characters/AnimatedCouple.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  COUPLE INTERACTION — the couple stands together. Tap the bride or the
//  groom for a small note; tap both and "Our day" appears. Fully optional.
// =====================================================================
export default function CoupleInteraction() {
  const { config } = useExperience()
  const [bride, setBride] = useState(false)
  const [groom, setGroom] = useState(false)
  const both = bride && groom
  const d = config.discovery

  return (
    <section className="scene scene--couple2" aria-label="Meet the couple">
      <Reveal as="p" className="scene__eyebrow">
        {both ? d.together : 'Meet the couple — tap each of us'}
      </Reveal>

      <AnimatedCouple
        religion={config.religion}
        interactive
        onGroom={() => setGroom(true)}
        onBride={() => setBride(true)}
        className="couple2__figs"
      />

      <div className="couple2__panels">
        <AnimatePresence>
          {groom && (
            <motion.p key="g" className="couple2__panel"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <span className="couple2__who">{config.couple.groom}</span>{d.groom}
            </motion.p>
          )}
          {bride && (
            <motion.p key="b" className="couple2__panel"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}>
              <span className="couple2__who">{config.couple.bride}</span>{d.bride}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {both && (
          <motion.p className="couple2__both"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}>
            {d.together}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
