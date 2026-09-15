import { useLanguage } from '../../context/LanguageContext.jsx'
import ArchFrame from '../ui/ArchFrame.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

// Section 7 — Quranic Verse (Surah Ar-Rum 30:21), localized.
export default function Verse() {
  const { t, lang } = useLanguage()
  const isArabic = lang === 'ar'

  return (
    <section className="section verse" aria-label="Quranic verse">
      <ArchFrame className="verse__arch">
        <Reveal className="verse__mark" aria-hidden="true">
          ﴾ ﴿
        </Reveal>
        <Reveal
          as="p"
          delay={0.05}
          className={`verse__text ${isArabic ? 'amiri' : 'cormorant-italic'}`}
        >
          {t('verseText')}
        </Reveal>
        <Reveal delay={0.1}>
          <Flourish />
        </Reveal>
        <Reveal as="p" delay={0.14} className="eyebrow verse__ref">
          {t('verseRef')}
        </Reveal>
      </ArchFrame>
    </section>
  )
}
