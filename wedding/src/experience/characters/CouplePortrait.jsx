import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  CouplePortrait, the couple as a transparent cutout that floats on the
//  scene (the same rendered characters shown in the film / preview).
//  * plain mode: an elegant portrait that fades in as it scrolls into view
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

  // The cutout ships as a light WebP (~230KB) with a PNG fallback, so there is
  // no bandwidth reason to hold it back. Load it EAGERLY from first paint —
  // NOT gated behind a scroll observer, which is what made it slow: gating meant
  // the download only *started* once you reached the scene, so it always popped
  // in a beat late on every device. fetchPriority="low" keeps it from competing
  // with the opening film, but it still starts downloading at mount and is
  // decoded and ready by the time the couple scene scrolls into view — instant.
  // It is the same image in every scene, so the browser fetches it exactly once
  // and every later appearance is served from cache.
  const webp = src.replace(/\.(png|jpe?g)$/i, '.webp')
  const img = (
    <picture className="cportrait__pic">
      <source srcSet={webp} type="image/webp" />
      <img
        className="cportrait__img"
        src={src}
        alt={config.couple.combined}
        loading="eager"
        fetchPriority={priority ? 'high' : 'low'}
        decoding="async"
        draggable="false"
      />
    </picture>
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
      <button
        type="button"
        className={`cportrait__zone cportrait__zone--l${tapped.g ? ' is-on' : ''}`}
        aria-label={`${config.couple.groom}, reveal a note`}
        aria-pressed={tapped.g}
        onClick={() => hit('g')}
      />
      <button
        type="button"
        className={`cportrait__zone cportrait__zone--r${tapped.b ? ' is-on' : ''}`}
        aria-label={`${config.couple.bride}, reveal a note`}
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
