import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TemplateCard from './TemplateCard.jsx'
import { RELIGIONS } from '../../studio/templates.js'
import { stagger, cardIn } from '../../studio/motion.js'

// Stagger the cards in with a whisper of 3D as they enter view.
const container = stagger(0.13)
const item = cardIn

// Grid of template cards with religion tabs. Switching tabs re-mounts the grid
// (keyed on the filter) so the new set fades/scales/blurs back in. Selecting a
// card opens the newly built immersive invitation directly (the old preview
// popup has been replaced by the full experience).
export default function TemplateGrid({ templates }) {
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const shown = useMemo(
    () => (filter === 'all' ? templates : templates.filter((t) => t.religion === filter)),
    [templates, filter],
  )

  // Open the full interactive invitation for a template.
  const openInvitation = (t) => {
    if (t?.inviteHref) navigate(t.inviteHref)
  }

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Filter designs by celebration">
        {RELIGIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            role="tab"
            aria-selected={filter === r.id}
            className={`tab${filter === r.id ? ' is-active' : ''}`}
            onClick={() => setFilter(r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        className="grid grid--templates"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {shown.length ? (
          shown.map((t) => (
            <motion.div key={t.id} variants={item}>
              <TemplateCard template={t} onPreview={openInvitation} />
            </motion.div>
          ))
        ) : (
          <p className="grid__empty">No designs in this category just yet.</p>
        )}
      </motion.div>
    </>
  )
}
