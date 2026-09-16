import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  DISCOVERY — a quiet interactive field (Muslim starfield / Christian
//  garden). Tap an object to uncover a small memory. Optional by design:
//  never needed to understand the wedding, only to reward curiosity.
// =====================================================================
const SPOTS = [
  { x: 18, y: 32 },
  { x: 76, y: 26 },
  { x: 34, y: 68 },
  { x: 82, y: 60 },
  { x: 54, y: 44 },
]

export default function Discovery() {
  const { config, M } = useExperience()
  const d = config.discoveryScene
  const [active, setActive] = useState(-1)
  if (!d) return null

  return (
    <section className="scene scene--discovery" aria-label={d.title}>
      <Reveal as="h2" className="scene__title">{d.title}</Reveal>
      <Reveal as="p" className="scene__lede" delay={0.1}>{d.caption}</Reveal>

      <div className="discovery__field">
        {d.messages.map((m, i) => {
          const s = SPOTS[i % SPOTS.length]
          const isFly = config.religion === 'christian' && i === 1 && M.Butterfly
          const Icon = isFly ? M.Butterfly : M.Spark
          const open = active === i
          return (
            <div className="discovery__spot" key={i} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
              <InteractiveObject
                className={`discovery__obj${open ? ' is-open' : ''}${isFly ? ' discovery__obj--fly' : ''}`}
                label={`${M.meta.sparkLabel} — reveal a memory`}
                active={open}
                onActivate={() => setActive(open ? -1 : i)}
              >
                <Icon className="discovery__icon" />
              </InteractiveObject>
              <AnimatePresence>
                {open && (
                  <motion.p
                    className="discovery__msg"
                    initial={{ opacity: 0, y: 8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                  >
                    {m}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
