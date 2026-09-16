import { motion } from 'framer-motion'
import { EASE, DUR } from '../lib/motion.js'

// Element rises out of a soft mask when scrolled into view. Reduced motion
// (via MotionConfig reducedMotion="user") keeps the fade, drops the movement.
export function Reveal({
  as = 'div',
  children,
  className = '',
  delay = 0,
  y = 26,
  amount = 0.3,
  once = true,
  ...rest
}) {
  const Comp = motion[as] || motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: DUR.md, ease: EASE.out, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

// Line-by-line mask reveal — each line slides up from behind a clip.
// IMPORTANT: the observed element is the UNCLIPPED container (.linereveal__lines),
// never the inner span. The inner starts translated 112% below its
// `overflow:hidden` line, so its own intersection ratio is ~0 and a
// viewport `amount` threshold on it would deadlock (it can never be "in view").
// Observing the container and animating children via variants avoids that.
export function LineReveal({
  lines = [],
  as = 'span',
  className = '',
  each = 0.12,
  amount = 0.35,
  once = true,
  duration = 0.9,
}) {
  const Wrap = as
  const container = { hidden: {}, show: { transition: { staggerChildren: each } } }
  const line = { hidden: { y: '112%' }, show: { y: '0%', transition: { duration, ease: EASE.out } } }
  return (
    <Wrap className={`linereveal ${className}`}>
      <motion.span
        className="linereveal__lines"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        {lines.map((ln, i) => (
          <span className="linereveal__line" key={i}>
            <motion.span className="linereveal__inner" variants={line}>{ln}</motion.span>
          </span>
        ))}
      </motion.span>
    </Wrap>
  )
}
