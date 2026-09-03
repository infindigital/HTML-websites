import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import ArchFrame from '../ui/ArchFrame.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

// Section 6 — Venue + Map.
export default function Venue() {
  const { t } = useLanguage()
  const { venue } = config

  return (
    <section className="section venue" aria-label="Venue and directions">
      <Reveal as="h2" className="cinzel section-title">
        {t('findUs')}
      </Reveal>
      <Reveal>
        <Flourish />
      </Reveal>

      <Reveal delay={0.05}>
        <ArchFrame className="venue__arch">
          <div className="venue__map">
            <iframe
              title={venue.name}
              src={venue.googleMapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </ArchFrame>
      </Reveal>

      <Reveal as="h3" delay={0.08} className="cormorant venue__name">
        {venue.name}
      </Reveal>
      <Reveal as="p" delay={0.12} className="venue__address">
        {venue.address}
      </Reveal>

      <Reveal delay={0.16}>
        <a
          className="btn-gold venue__directions"
          href={venue.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('getDirections')}
        </a>
      </Reveal>
    </section>
  )
}
