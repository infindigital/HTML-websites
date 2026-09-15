import { motion } from 'framer-motion'

// An elegant animated reveal of the wedding date: the numerals and month rise
// in, a gold line draws itself, then the venue settles. Colours come from the
// active template theme (--t-deep / --t-ink) via the parent's data-theme-id.
const parent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
}
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const draw = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function DateReveal({ event, couple }) {
  if (!event) return null
  const { weekday, day, month, year, venue, time } = event
  return (
    <motion.div className="datereveal" variants={parent} initial="hidden" animate="show">
      {couple && <motion.p className="datereveal__couple" variants={rise}>{couple}</motion.p>}
      <motion.p className="datereveal__eyebrow" variants={rise}>Save the Date</motion.p>
      <div className="datereveal__grid">
        <motion.span className="datereveal__day" variants={rise}>{day}</motion.span>
        <div className="datereveal__mid">
          {weekday && <motion.span className="datereveal__weekday" variants={rise}>{weekday}</motion.span>}
          <motion.span className="datereveal__month" variants={rise}>{month}</motion.span>
          <motion.span className="datereveal__year" variants={rise}>{year}</motion.span>
        </div>
      </div>
      <motion.span className="datereveal__line" variants={draw} aria-hidden="true" />
      {(venue || time) && (
        <motion.p className="datereveal__venue" variants={rise}>
          {venue}{venue && time ? ' · ' : ''}{time}
        </motion.p>
      )}
    </motion.div>
  )
}
