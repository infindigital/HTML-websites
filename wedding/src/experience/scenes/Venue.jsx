import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// A stylised venue silhouette — never a real building, just an evocative
// horizon that changes per religion.
function VenueArt({ religion }) {
  return (
    <svg viewBox="0 0 400 180" className="venue__art" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="venueGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--x-gold,#e6c879)" />
          <stop offset="100%" stopColor="var(--x-accent,#b8862c)" />
        </linearGradient>
      </defs>
      <line x1="0" y1="150" x2="400" y2="150" stroke="var(--x-line)" strokeWidth="1" />
      {religion === 'hindu' && (
        <g fill="url(#venueGold)" opacity="0.9">
          <path d="M120 150 V96 Q140 60 160 96 V150 Z" />
          <path d="M240 150 V96 Q260 60 280 96 V150 Z" />
          <path d="M170 150 V70 Q200 24 230 70 V150 Z" />
          <circle cx="200" cy="34" r="5" />
        </g>
      )}
      {religion === 'muslim' && (
        <g fill="url(#venueGold)" opacity="0.9">
          <rect x="128" y="70" width="8" height="80" />
          <rect x="264" y="70" width="8" height="80" />
          <path d="M132 70 a4 8 0 0 1 0 -14 a4 8 0 0 1 0 14" />
          <path d="M268 70 a4 8 0 0 1 0 -14 a4 8 0 0 1 0 14" />
          <path d="M164 150 V96 Q200 40 236 96 V150 Z" />
          <path d="M200 40 a10 10 0 1 0 5 18 a7.5 7.5 0 1 1 -5 -18 Z" transform="translate(0 -18)" />
        </g>
      )}
      {religion === 'christian' && (
        <g fill="url(#venueGold)" opacity="0.9">
          <path d="M150 150 V80 L200 44 L250 80 V150 Z" />
          <rect x="192" y="20" width="16" height="34" />
          <rect x="186" y="30" width="28" height="8" />
          <path d="M110 150 V110 Q120 96 130 110 V150 Z" />
          <path d="M270 150 V110 Q280 96 290 110 V150 Z" />
        </g>
      )}
    </svg>
  )
}

// =====================================================================
//  VENUE — an illustrated reveal, then the marker, then the address, then
//  Get Directions. The map appears only when asked; the directions button
//  is always available.
// =====================================================================
export default function Venue() {
  const { config } = useExperience()
  const v = config.venue
  const [showMap, setShowMap] = useState(false)

  return (
    <section className="scene scene--venue" aria-label="Venue and directions">
      <Reveal as="p" className="scene__eyebrow">Find us</Reveal>
      <Reveal as="h2" className="scene__title">{v.name}</Reveal>

      <Reveal className="venue__stage" delay={0.05}>
        <VenueArt religion={config.religion} />
        <InteractiveObject
          className={`venue__marker${showMap ? ' is-open' : ''}`}
          label="Reveal the map"
          active={showMap}
          onActivate={() => setShowMap(true)}
        >
          <span className="venue__pin" aria-hidden="true" />
          <span className="venue__pulse" aria-hidden="true" />
        </InteractiveObject>
      </Reveal>

      <Reveal as="p" className="venue__addr" delay={0.12}>{v.address}</Reveal>

      <AnimatePresence>
        {showMap && (
          <motion.div
            className="venue__map"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title={v.name}
              src={v.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Reveal delay={0.16}>
        <a className="x-btn" href={v.directionsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions →
        </a>
      </Reveal>
    </section>
  )
}
