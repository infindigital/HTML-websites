import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CinematicVideo from '../primitives/CinematicVideo.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  SCENE 01, OPENING
//  Full-viewport cinematic video + an HTML/SVG layer on top: two flanking
//  lamps (diya / lantern / candle) you can light, and a central openable
//  portal (doorway / arch / church door) that IS the button. Tapping it
//  starts the music, opens the portal, and glides into the invitation.
//  The lamps/portal are HTML+SVG, never baked into the video (see brief §5).
// =====================================================================
export default function Opening({ onBegin }) {
  const { config, M } = useExperience()
  const { SideLamp, Portal, meta } = M
  const [began, setBegan] = useState(false)
  const [litL, setLitL] = useState(false)
  const [litR, setLitR] = useState(false)

  const begin = () => {
    if (began) return
    setBegan(true)
    setLitL(true)
    setLitR(true)
    // Let the portal open, then hand off to the shell (music + scroll).
    window.setTimeout(() => onBegin?.(), 1150)
  }

  return (
    <section className="scene scene--opening" aria-label={`${config.concept}, opening`}>
      <CinematicVideo
        className="scene__bg"
        src={config.assets.video}
        poster={config.assets.poster}
        priority
        dim={0.36}
      />
      <div className="opening__vignette" aria-hidden="true" />

      <motion.div
        className="opening__content"
        animate={began ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: began ? 0.55 : 0, ease: EASE.soft }}
      >
        <motion.p
          className="opening__invocation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE.out }}
        >
          {config.invocation}
        </motion.p>

        <div className="opening__stage">
          <InteractiveObject
            className="opening__lamp opening__lamp--l"
            label={meta.lampLabel}
            active={litL}
            onActivate={() => setLitL((v) => !v)}
          >
            <SideLamp bright={litL} className="lamp-svg" />
          </InteractiveObject>

          <InteractiveObject
            className="opening__portal"
            label={meta.openLabel}
            active={began}
            hoverScale={1.02}
            tapScale={0.99}
            onActivate={begin}
          >
            <Portal open={began} />
          </InteractiveObject>

          <InteractiveObject
            className="opening__lamp opening__lamp--r"
            label={meta.lampLabel}
            active={litR}
            onActivate={() => setLitR((v) => !v)}
          >
            <SideLamp bright={litR} className="lamp-svg" />
          </InteractiveObject>
        </div>

        <motion.p
          className="opening__monogram"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {config.couple.monogram}
        </motion.p>

        <AnimatePresence>
          {!began && (
            <motion.button
              type="button"
              className="opening__hint"
              onClick={begin}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              aria-label={meta.openLabel}
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: EASE.soft }}
              >
                {meta.openLabel}
              </motion.span>
              <span className="opening__hint-arrow" aria-hidden="true">︾</span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
