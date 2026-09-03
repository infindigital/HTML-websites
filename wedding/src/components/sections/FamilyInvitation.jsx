import { useLanguage } from '../../context/LanguageContext.jsx'
import ArchFrame from '../ui/ArchFrame.jsx'
import Reveal from '../ui/Reveal.jsx'
import { AmpersandDivider, Flourish } from '../ui/Ornaments.jsx'

// Section 3 — Family Invitation.
export default function FamilyInvitation() {
  const { t } = useLanguage()

  return (
    <section className="section family-invite" aria-label="Family invitation">
      <ArchFrame>
        <Reveal as="p" className="cormorant-italic family-invite__lead">
          {t('familyInviteLead')}
        </Reveal>

        <Reveal>
          <Flourish />
        </Reveal>

        <Reveal as="p" delay={0.05} className="eyebrow family-invite__occasion">
          {t('onOccasionSon')}
        </Reveal>

        <div className="party">
          <Reveal className="party__member">
            <h2 className="cormorant party__name">{t('nameGroomFull')}</h2>
            <p className="party__parentage">{t('nameGroomParentage')}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <AmpersandDivider />
          </Reveal>

          <Reveal delay={0.12} className="party__member">
            <h2 className="cormorant party__name">{t('nameBrideFull')}</h2>
            <p className="party__parentage">{t('nameBrideParentage')}</p>
          </Reveal>
        </div>

        <Reveal as="p" delay={0.16} className="cormorant-italic family-invite__note">
          {t('loveNote')}
        </Reveal>
      </ArchFrame>
    </section>
  )
}
