import { motion, useReducedMotion } from 'framer-motion'

// The complete cinematic invitation that plays OVER the film: an opening line,
// the couple, "Save the Date", a drawing gold rule, the date, then the venue -
// each beat rises in slowly, in sequence, then holds so it reads as one
// finished wedding film. Text is white/ivory with a gold accent (--t-gold) for
// legibility over dark footage; the accent still carries the template's colour.
export default function DateReveal({ event, couple, intro = 'Together with their families' }) {
  const reduce = useReducedMotion()
  if (!event) return null
  const { weekday, day, month, year, venue, time } = event

  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.4, delayChildren: reduce ? 0 : 0.45 } },
  }
  const rise = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }
  const draw = {
    hidden: reduce ? { scaleX: 1 } : { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div className="invfilm" variants={parent} initial="hidden" animate="show">
      {intro && <motion.p className="invfilm__intro" variants={rise}>{intro}</motion.p>}
      {couple && <motion.p className="invfilm__couple" variants={rise}>{couple}</motion.p>}
      <motion.p className="invfilm__eyebrow" variants={rise}>Save the Date</motion.p>
      <motion.span className="invfilm__line" variants={draw} aria-hidden="true" />
      <div className="invfilm__date">
        <motion.span className="invfilm__day" variants={rise}>{day}</motion.span>
        <div className="invfilm__mid">
          {weekday && <motion.span className="invfilm__weekday" variants={rise}>{weekday}</motion.span>}
          <motion.span className="invfilm__month" variants={rise}>{month}</motion.span>
          <motion.span className="invfilm__year" variants={rise}>{year}</motion.span>
        </div>
      </div>
      {(venue || time) && (
        <motion.p className="invfilm__venue" variants={rise}>
          {venue}{venue && time ? ' · ' : ''}{time}
        </motion.p>
      )}
    </motion.div>
  )
}
