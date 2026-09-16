import CinematicVideo from '../primitives/CinematicVideo.jsx'
import CouplePortrait from '../characters/CouplePortrait.jsx'
import { Reveal } from '../primitives/Reveal.jsx'
import { useExperience } from '../ExperienceContext.js'

// =====================================================================
//  CLOSING — return to the opening world. The couple stands together,
//  petals fall (ambient layer), and the final words settle. A quiet
//  "Replay invitation" control returns to the beginning.
// =====================================================================
export default function Closing() {
  const { config, replay } = useExperience()

  return (
    <section className="scene scene--closing" aria-label="Closing">
      <CinematicVideo className="scene__bg" src={config.assets.video} poster={config.assets.poster} dim={0.58} />
      <div className="closing__vignette" aria-hidden="true" />

      <div className="closing__content">
        <div className="closing__figs">
          <CouplePortrait />
        </div>
        <Reveal as="p" className="closing__msg">{config.closing.message}</Reveal>
        <Reveal as="p" className="closing__names" delay={0.15}>{config.couple.combined}</Reveal>
        <Reveal as="p" className="closing__date" delay={0.24}>{config.date.dateLabel}</Reveal>
        <Reveal delay={0.34}>
          <button type="button" className="x-btn x-btn--ghost closing__replay" onClick={replay}>
            ↺ Replay invitation
          </button>
        </Reveal>
      </div>
    </section>
  )
}
