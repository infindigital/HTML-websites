import { motion } from 'framer-motion'
import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import ArchFrame from '../ui/ArchFrame.jsx'
import Reveal from '../ui/Reveal.jsx'
import { AmpersandDivider } from '../ui/Ornaments.jsx'
import { ChevronDownIcon } from '../ui/Icons.jsx'

// Section 2 — Main Invitation.
export default function MainInvitation({ id }) {
  const { t } = useLanguage()

  return (
    <section className="section main-invite" id={id} aria-label="Wedding invitation">
      <ArchFrame className="main-invite__arch">
        <Reveal as="p" className="amiri bismillah">
          {config.bismillah}
        </Reveal>

        <Reveal delay={0.05}>
          <span className="pill">{t('weddingPill')}</span>
        </Reveal>

        <Reveal as="p" delay={0.1} className="cormorant-italic main-invite__lead">
          {t('togetherFamilies')}
        </Reveal>

        <div className="names">
          <Reveal as="h1" delay={0.12} className="cormorant name">
            {t('nameGroomFirst')}
          </Reveal>
          <Reveal delay={0.18}>
            <AmpersandDivider />
          </Reveal>
          <Reveal as="h1" delay={0.24} className="cormorant name">
            {t('nameBrideFirst')}
          </Reveal>
        </div>

        <Reveal as="p" delay={0.28} className="cinzel main-invite__date">
          {t('dateUpper')}
        </Reveal>
        <Reveal as="p" delay={0.34} className="cormorant-italic main-invite__place">
          {t('venueShort')}
        </Reveal>
      </ArchFrame>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <span className="cinzel scroll-hint__label">{t('scroll')}</span>
        <motion.span
          className="scroll-hint__arrow"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon />
        </motion.span>
      </motion.div>
    </section>
  )
}
