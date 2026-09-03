import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

// Section 1 — Wax-Seal Intro (full viewport).
// Tapping the seal breaks it open, starts the music and reveals the card.
export default function SealIntro({ onOpen }) {
  const { t } = useLanguage()
  const [breaking, setBreaking] = useState(false)

  function handleOpen() {
    if (breaking) return
    setBreaking(true)
    onOpen?.()
  }

  return (
    <section className="seal-intro" aria-label="Invitation cover">
      <motion.div
        className="seal-intro__inner"
        animate={breaking ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: breaking ? 0.55 : 0, ease: 'easeInOut' }}
      >
        <motion.p
          className="eyebrow seal-intro__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('youAreInvited')}
        </motion.p>

        <Flourish className="seal-intro__flourish" />

        <div className="seal-wrap">
          {/* ribbon tails behind the seal */}
          <div className="seal-ribbons" aria-hidden="true">
            <span className="seal-ribbon seal-ribbon--left" />
            <span className="seal-ribbon seal-ribbon--right" />
          </div>

          <motion.button
            type="button"
            className="seal"
            onClick={handleOpen}
            aria-label={t('tapToOpen')}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              breaking
                ? { scale: [1, 0.9, 1.22], opacity: [1, 1, 0] }
                : { scale: 1, opacity: 1 }
            }
            transition={
              breaking
                ? { duration: 0.9, times: [0, 0.28, 1], ease: 'easeIn' }
                : { duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }
            }
            whileHover={breaking ? {} : { scale: 1.04 }}
            whileTap={breaking ? {} : { scale: 0.96 }}
          >
            <span className="seal__ring" aria-hidden="true" />
            <span className="seal__ring seal__ring--inner" aria-hidden="true" />
            <span className="seal__crack" aria-hidden="true" />
            <span className="seal__monogram">{config.couple.monogram}</span>
            <span className="seal__year">{config.couple.year}</span>
            {/* radiating gold specks on break */}
            {breaking &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="seal__spark"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: Math.cos((i / 12) * Math.PI * 2) * 90,
                    y: Math.sin((i / 12) * Math.PI * 2) * 90,
                    scale: [0.4, 1, 0.6],
                  }}
                  transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
                />
              ))}
          </motion.button>
        </div>

        <AnimatePresence>
          {!breaking && (
            <motion.p
              className="seal-intro__hint cormorant-italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.span
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {t('tapToOpen')}
              </motion.span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
