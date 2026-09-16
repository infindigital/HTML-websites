import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  EVENTS, interactive celebrations. Each event is an object in the
//  scene; tapping it expands, cinematically (inline, not a modal), to
//  reveal date / time / venue / description / dress code. One at a time.
// =====================================================================
export default function Events() {
  const { config } = useExperience()
  const [open, setOpen] = useState(config.events?.[0]?.id ?? null)

  return (
    <section className="scene scene--events" aria-label="Wedding events">
      <Reveal as="p" className="scene__eyebrow">The celebrations</Reveal>
      <Reveal as="h2" className="scene__title">Our wedding events</Reveal>

      <ul className="events__list">
        {config.events.map((e) => {
          const isOpen = open === e.id
          return (
            <li className={`events__item${isOpen ? ' is-open' : ''}`} key={e.id}>
              <InteractiveObject
                className="events__head"
                label={`${e.name}, ${isOpen ? 'hide' : 'show'} details`}
                active={isOpen}
                hoverScale={1.01}
                tapScale={0.995}
                onActivate={() => setOpen(isOpen ? null : e.id)}
              >
                <span className="events__glyph" aria-hidden="true">{e.glyph}</span>
                <span className="events__name">{e.name}</span>
                <span className="events__date">{e.date}</span>
                <span className="events__toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </InteractiveObject>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="events__body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE.out }}
                  >
                    <div className="events__body-inner">
                      <p className="events__row"><span>When</span>{e.date} · {e.time}</p>
                      <p className="events__row"><span>Where</span>{e.venue}</p>
                      <p className="events__desc">{e.description}</p>
                      {e.dress && <p className="events__row"><span>Dress</span>{e.dress}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
