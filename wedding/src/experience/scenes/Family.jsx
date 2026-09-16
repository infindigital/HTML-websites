import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  FAMILY — an elegant composition, not profile cards. A central monogram
//  medallion with the two families to either side (radial on desktop,
//  stacked on mobile). Tap a family to reveal the names.
// =====================================================================
function Side({ id, data, name, open, onToggle }) {
  return (
    <div className={`family__side family__side--${id}`}>
      <InteractiveObject
        className={`family__node${open ? ' is-open' : ''}`}
        label={`${data.label} — tap to reveal`}
        active={open}
        onActivate={onToggle}
      >
        <span className="family__node-kicker">{id === 'groom' ? 'Groom’s family' : 'Bride’s family'}</span>
        <span className="family__node-name">{name}</span>
        <span className="family__node-hint" aria-hidden="true">{open ? '—' : '+'}</span>
      </InteractiveObject>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            className="family__names"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45 }}
          >
            <li className="family__lead">{data.label}</li>
            {data.names.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Family() {
  const { config } = useExperience()
  const { family, couple } = config
  const [open, setOpen] = useState(null)

  return (
    <section className="scene scene--family" aria-label="Our families">
      <Reveal as="p" className="scene__eyebrow">Two families, one celebration</Reveal>
      <Reveal as="h2" className="scene__title">With the blessings of our families</Reveal>

      <div className="family__composition">
        <Side
          id="groom"
          data={family.groomSide}
          name={couple.groom}
          open={open === 'groom'}
          onToggle={() => setOpen(open === 'groom' ? null : 'groom')}
        />
        <div className="family__center" aria-hidden="true">
          <span className="family__ring" />
          <span className="family__mono">{couple.monogram}</span>
        </div>
        <Side
          id="bride"
          data={family.brideSide}
          name={couple.bride}
          open={open === 'bride'}
          onToggle={() => setOpen(open === 'bride' ? null : 'bride')}
        />
      </div>
    </section>
  )
}
