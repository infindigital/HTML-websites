import { useState } from 'react'
import { Reveal, LineReveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'

// Break a passage into short lines (~6 words) for the mask reveal.
function toLines(text, per = 6) {
  const words = text.split(' ')
  const lines = []
  for (let i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(' '))
  return lines
}

// =====================================================================
//  VERSE — a dedicated scripture / blessing scene. Editorial typography,
//  revealed line by line. Text is rendered as HTML (never baked into the
//  video), and is fully configurable. Tapping the ornament illuminates it.
// =====================================================================
export default function Verse() {
  const { config } = useExperience()
  const v = config.verse
  const [glow, setGlow] = useState(false)
  if (!v) return null

  return (
    <section className={`scene scene--verse${glow ? ' is-glow' : ''}`} aria-label="A blessing">
      <InteractiveObject
        className="verse__mark"
        label="Illuminate the blessing"
        active={glow}
        onActivate={() => setGlow((g) => !g)}
      >
        <span aria-hidden="true">{config.verseMark || config.invocation}</span>
      </InteractiveObject>

      {v.arabic && (
        <Reveal as="p" className="verse__arabic" amount={0.4}>{v.arabic}</Reveal>
      )}

      <LineReveal as="blockquote" className="verse__text" lines={toLines(v.text, 8)} each={0.12} />

      <Reveal as="cite" className="verse__ref" delay={0.25}>{v.ref}</Reveal>
    </section>
  )
}
