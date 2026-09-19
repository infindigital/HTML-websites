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
    // Start the music + films synchronously, INSIDE the tap gesture, so the
    // audio begins the instant the visitor taps. Handing this off after a
    // timeout (outside the gesture) is what made the music lag before it
    // played. The portal-open beat before the downward glide is preserved by
    // the shell, which delays only the scroll — not the sound.
    onBegin?.()
  }

  return (
    <section className="scene scene--opening" aria-label={`${config.concept}, opening`}>
      <CinematicVideo
        className="scene__bg"
        src={config.assets.video}
        srcMobile={config.assets.videoMobile}
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

          <div className="opening__door">
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

            {/* highlight — makes the door stand out and shows it is tappable */}
            <AnimatePresence>
              {!began && (
                <motion.span
                  className="opening__door-cue"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span className="opening__door-glow" />
                  <span className="opening__tap">
                    <span className="opening__tap-ring" />
                    <span className="opening__tap-ring opening__tap-ring--2" />
                    <span className="opening__tap-dot" />
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

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
              <span className="opening__hint-arrow" aria-hidden="true">︿</span>
              <span className="opening__hint-text">
                <span className="opening__hint-finger" aria-hidden="true">☝</span>
                Tap the door to open
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
