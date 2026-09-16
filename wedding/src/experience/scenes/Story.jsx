import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, LineReveal } from '../primitives/Reveal.jsx'
import AnimatedCouple from '../characters/AnimatedCouple.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  SCENE 04 — OUR STORY
//  Vertical scroll storytelling. A pinned stage (the couple, subtly
//  visible, with a shifting aura) sits behind beats that reveal one by
//  one. Not a timeline of cards — one continuous, changing scene.
// =====================================================================
export default function Story() {
  const { config } = useExperience()
  const beats = config.story
  const [active, setActive] = useState(0)

  return (
    <section className="scene scene--story" aria-label="Our story">
      <div className="story__stage" aria-hidden="true">
        <div className={`story__aura story__aura--${active % 5}`} />
        <div className="story__fig">
          <AnimatedCouple religion={config.religion} />
        </div>
        <span className="story__count">
          {String(active + 1).padStart(2, '0')}<span>/</span>{String(beats.length).padStart(2, '0')}
        </span>
      </div>

      <div className="story__track">
        {beats.map((b, i) => (
          <motion.div
            className="story__beat"
            key={b.key}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.55 }}
          >
            <div className="story__beat-inner">
              <span className="story__beat-idx">{String(i + 1).padStart(2, '0')}</span>
              <LineReveal as="h3" className="story__beat-title" lines={[b.title]} />
              <Reveal as="p" className="story__beat-cap" delay={0.12}>{b.caption}</Reveal>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
