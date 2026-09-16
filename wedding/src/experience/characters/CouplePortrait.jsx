import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  CouplePortrait — the couple as a framed still from their film (the
//  same beautiful, rendered characters shown in the preview), replacing
//  the earlier line-art figures.
//  * plain mode: an elegant framed portrait
//  * interactive mode: invisible left/right tap zones (groom / bride) so
//    the "tap each of us" interaction still works
// =====================================================================
export default function CouplePortrait({
  className = '',
  interactive = false,
  onGroom,
  onBride,
  priority = false,
}) {
  const { config } = useExperience()
  const src = config.assets.couple || config.assets.poster
  const [tapped, setTapped] = useState({ g: false, b: false })

  const img = (
    <img
      className="cportrait__img"
      src={src}
      alt={config.couple.combined}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
    />
  )

  if (!interactive) {
    return (
      <motion.div
        className={`cportrait ${className}`}
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {img}
        <span className="cportrait__frame" aria-hidden="true" />
      </motion.div>
    )
  }

  const hit = (which) => {
    setTapped((t) => ({ ...t, [which]: true }))
    if (which === 'g') onGroom?.()
    else onBride?.()
  }

  return (
    <div className={`cportrait cportrait--interactive ${className}`}>
      {img}
      <span className="cportrait__frame" aria-hidden="true" />
      <button
        type="button"
        className={`cportrait__zone cportrait__zone--l${tapped.g ? ' is-on' : ''}`}
        aria-label={`${config.couple.groom} — reveal a note`}
        aria-pressed={tapped.g}
        onClick={() => hit('g')}
      />
      <button
        type="button"
        className={`cportrait__zone cportrait__zone--r${tapped.b ? ' is-on' : ''}`}
        aria-label={`${config.couple.bride} — reveal a note`}
        aria-pressed={tapped.b}
        onClick={() => hit('b')}
      />
      <AnimatePresence>
        {(tapped.g || tapped.b) && (
          <motion.span
            className="cportrait__tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-hidden="true"
          >
            {tapped.g && <span className="cportrait__tag cportrait__tag--l">{config.couple.groom}</span>}
            {tapped.b && <span className="cportrait__tag cportrait__tag--r">{config.couple.bride}</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
