import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

// The wax seal face (gold body + rings + monogram). Rendered whole before the
// tap, then twice more — clipped left/right — as the two halves that break away.
function SealFace() {
  return (
    <div className="seal__face" aria-hidden="true">
      <span className="seal__ring" />
      <span className="seal__ring seal__ring--inner" />
      <span className="seal__crack" />
      <span className="seal__monogram">{config.couple.monogram}</span>
      <span className="seal__year">{config.couple.year}</span>
    </div>
  )
}

// Section 1 — Wax-Seal Intro (full viewport).
// Tapping the seal cracks it into two halves that fall away to either side,
// starts the music and reveals the invitation.
export default function SealIntro({ onOpen }) {
  const { t } = useLanguage()
  const [breaking, setBreaking] = useState(false)

  function handleOpen() {
    if (breaking) return
    setBreaking(true)
    onOpen?.()
  }

  // Gravity-like acceleration for the falling halves.
  const fall = { duration: 1.05, ease: 'easeIn' }

  return (
    <section className="seal-intro" aria-label="Invitation cover">
      <motion.div
        className="seal-intro__inner"
        animate={breaking ? { opacity: 0 } : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: breaking ? 0.85 : 0,
          ease: 'easeInOut',
        }}
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
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={breaking ? {} : { scale: 1.04 }}
            whileTap={breaking ? {} : { scale: 0.96 }}
          >
            {/* Whole seal until tapped */}
            {!breaking && <SealFace />}

            {/* On tap: two halves crack apart and fall to either side */}
            {breaking && (
              <>
                <motion.div
                  className="seal__half seal__half--left"
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: -74, y: 200, rotate: -48, opacity: 0 }}
                  transition={fall}
                >
                  <SealFace />
                </motion.div>
                <motion.div
                  className="seal__half seal__half--right"
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: 74, y: 200, rotate: 48, opacity: 0 }}
                  transition={fall}
                >
                  <SealFace />
                </motion.div>

                {/* gold dust burst at the crack */}
                {Array.from({ length: 12 }).map((_, i) => (
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
                    transition={{ duration: 0.7, delay: 0.04, ease: 'easeOut' }}
                  />
                ))}
              </>
            )}
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
