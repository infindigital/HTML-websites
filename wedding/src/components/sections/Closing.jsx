import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Laurel } from '../ui/Ornaments.jsx'

// Section 8 — Closing.
export default function Closing() {
  const { t } = useLanguage()
  const { couple } = config

  return (
    <section className="section closing" aria-label="Closing">
      <Reveal>
        <Laurel>
          <span className="closing__monogram">{couple.monogram}</span>
        </Laurel>
      </Reveal>

      <Reveal as="p" delay={0.08} className="cormorant closing__names">
        {couple.combined}
      </Reveal>

      <Reveal as="p" delay={0.14} className="eyebrow closing__love">
        {t('createdWithLove')}
      </Reveal>
    </section>
  )
}
