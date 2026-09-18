import { motion } from 'framer-motion'

// Scroll-reveal wrapper: fades + slides up once when it enters the viewport.
// Honors reduced motion via CSS (see .no-motion handling) and Framer defaults.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  amount = 0.25,
  className = '',
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
