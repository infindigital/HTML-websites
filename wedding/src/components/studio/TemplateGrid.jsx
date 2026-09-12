import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import TemplateCard from './TemplateCard.jsx'
import PreviewModal from './PreviewModal.jsx'
import { RELIGIONS } from '../../studio/templates.js'

// Stagger the cards in as they enter view (0ms / 120ms / 240ms...).
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 26, scale: 0.97, filter: 'blur(5px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Grid of template cards with religion tabs. Switching tabs re-mounts the grid
// (keyed on the filter) so the new set fades/scales/blurs back in; the grid owns
// the shared fullscreen player.
export default function TemplateGrid({ templates }) {
  const [preview, setPreview] = useState(null)
  const [filter, setFilter] = useState('all')

  const shown = useMemo(
    () => (filter === 'all' ? templates : templates.filter((t) => t.religion === filter)),
    [templates, filter],
  )

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
              <TemplateCard template={t} onPreview={setPreview} />
            </motion.div>
          ))
        ) : (
          <p className="grid__empty">No designs in this category just yet.</p>
        )}
      </motion.div>

      {preview && <PreviewModal template={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
