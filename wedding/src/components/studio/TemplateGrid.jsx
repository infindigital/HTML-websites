import { useState } from 'react'
import { motion } from 'framer-motion'
import TemplateCard from './TemplateCard.jsx'
import PreviewModal from './PreviewModal.jsx'
import { stagger, cardIn } from '../../studio/motion.js'

// Stagger the cards in with a whisper of 3D as they enter view.
const container = stagger(0.13)
const item = cardIn

// The collection grid. Collections are style-led, never categorised, so there
// are no filters. Selecting "View Invitation" opens a premium fullscreen
// preview, the same experience a guest sees when they open the link.
export default function TemplateGrid({ templates }) {
  const [preview, setPreview] = useState(null)

  return (
    <>
      <motion.div
        className="grid grid--templates"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {templates.map((t, i) => (
          <motion.div key={t.id} variants={item}>
            <TemplateCard template={t} index={i} onView={setPreview} />
          </motion.div>
        ))}
      </motion.div>

      {preview && <PreviewModal template={preview} onClose={() => setPreview(null)} />}
    </>
  )
}
