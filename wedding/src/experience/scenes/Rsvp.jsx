import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '../primitives/Reveal.jsx'
import InteractiveObject from '../primitives/InteractiveObject.jsx'
import { useExperience } from '../ExperienceContext.js'
import { EASE } from '../lib/motion.js'

// =====================================================================
//  RSVP — a physical invitation that opens into a form. Tap the card, the
//  envelope opens and the form emerges. Validated, then a warm confirmation
//  with a soft bloom. (Front-end only — wire to a form service / WhatsApp
//  number at go-live; see the note in the config.)
// =====================================================================
export default function Rsvp() {
  const { config } = useExperience()
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', guests: '2', attending: '', message: '' })
  const [errors, setErrors] = useState({})
  const set = (k, val) => setForm((f) => ({ ...f, [k]: val }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name'
    const n = Number(form.guests)
    if (!Number.isFinite(n) || n < 1) e.guests = 'At least one guest'
    if (!form.attending) e.attending = 'Please let us know'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) setSent(true)
  }

  const firstName = form.name.trim().split(' ')[0] || 'friend'

  return (
    <section className="scene scene--rsvp" aria-label="RSVP">
      <Reveal as="p" className="scene__eyebrow">Will you join us?</Reveal>
      <Reveal as="h2" className="scene__title">RSVP</Reveal>

      <div className="rsvp__stage">
        <AnimatePresence mode="wait">
          {!open && !sent && (
            <motion.div key="card" exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4 }}>
              <InteractiveObject className="rsvp__card" label="Open the invitation to reply" onActivate={() => setOpen(true)}>
                <span className="rsvp__flap" aria-hidden="true" />
                <span className="rsvp__seal" aria-hidden="true">{config.couple.monogram}</span>
                <span className="rsvp__card-hint">Tap to open</span>
              </InteractiveObject>
            </motion.div>
          )}

          {open && !sent && (
            <motion.form
              key="form"
              className="rsvp__form"
              onSubmit={submit}
              noValidate
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE.out }}
            >
              <label className="rsvp__field">
                <span>Your name</span>
                <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                  aria-invalid={!!errors.name} autoComplete="name" />
                {errors.name && <em className="rsvp__err">{errors.name}</em>}
              </label>

              <label className="rsvp__field">
                <span>Number of guests</span>
                <input type="number" min="1" max="20" value={form.guests}
                  onChange={(e) => set('guests', e.target.value)} aria-invalid={!!errors.guests} />
                {errors.guests && <em className="rsvp__err">{errors.guests}</em>}
              </label>

              <fieldset className="rsvp__field rsvp__field--choice" aria-invalid={!!errors.attending}>
                <span>Will you attend?</span>
                <div className="rsvp__choices">
                  {[['yes', 'Joyfully yes'], ['no', 'Sadly no']].map(([val, lbl]) => (
                    <button
                      type="button"
                      key={val}
                      className={`rsvp__choice${form.attending === val ? ' is-on' : ''}`}
                      aria-pressed={form.attending === val}
                      onClick={() => set('attending', val)}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
                {errors.attending && <em className="rsvp__err">{errors.attending}</em>}
              </fieldset>

              <label className="rsvp__field">
                <span>A message for the couple <i>(optional)</i></span>
                <textarea rows="3" value={form.message} onChange={(e) => set('message', e.target.value)} />
              </label>

              <button type="submit" className="x-btn rsvp__submit">Send our reply →</button>
            </motion.form>
          )}

          {sent && (
            <motion.div
              key="done"
              className="rsvp__done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE.out }}
            >
              <span className="rsvp__done-mark" aria-hidden="true">✿</span>
              <p className="rsvp__done-title">Thank you, {firstName}.</p>
              <p className="rsvp__done-msg">
                {form.attending === 'yes'
                  ? 'We can’t wait to celebrate with you.'
                  : 'We’ll miss you — thank you for letting us know.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
