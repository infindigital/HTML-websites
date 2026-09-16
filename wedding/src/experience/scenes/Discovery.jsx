import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  DISCOVERY, a quiet interactive field (Muslim starfield / Christian
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
  // Remember the last opened row so the popup animates out in place on close.
  const lastY = useRef(50)
  if (!d) return null
  if (active > -1) lastY.current = SPOTS[active % SPOTS.length].y

  return (
    <section className="scene scene--discovery" aria-label={d.titleEn || d.title}>
      <Reveal as="h2" className="scene__title">{d.title}</Reveal>
      {d.titleEn && (
        <Reveal as="p" className="scene__title-en" delay={0.06}>{d.titleEn}</Reveal>
      )}
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
                label={`${M.meta.sparkLabel}, reveal a memory`}
                active={open}
                onActivate={() => setActive(open ? -1 : i)}
              >
                <Icon className="discovery__icon" />
              </InteractiveObject>
            </div>
          )
        })}

        {/* A single popup, centred within the field so a long ayah or memory
            can never run off-screen on any device; it drops just below the
            tapped object's row. Flex-centring leaves the transform free for
            the entrance animation. */}
        <div className="discovery__msglayer" style={{ top: `${lastY.current}%` }}>
          <AnimatePresence>
            {active > -1 && (
              <motion.p
                key={active}
                className="discovery__msg"
                initial={{ opacity: 0, y: 8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.92 }}
                transition={{ duration: 0.4 }}
              >
                {d.messages[active % d.messages.length]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
