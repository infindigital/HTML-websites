import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { EASE, DUR, SPRING, stagger, lineChild, fadeUp, VIEW } from '../../studio/motion.js'

// =====================================================================
//  Shared reveal primitives. Everything here is motion-safe by default
//  (Framer's MotionConfig reducedMotion="user" flattens transforms for
//  users who ask for less motion) and degrades cleanly on touch.
// =====================================================================

// True only on desktop fine-pointer devices, resolved after mount so SSR
// and first paint stay stable.
export function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    setFine(window.matchMedia('(pointer: fine)').matches)
  }, [])
  return fine
}

// -----------------------------------------------------------------------
//  LineReveal — editorial typography that rises line-by-line out of a mask.
//  `lines` is an array of strings or nodes; each becomes one masked line
//  (so an <em> swash can live inside a line). `trigger`:
//    'view' (default) reveals when scrolled into view,
//    'load' reveals immediately on mount (used for the hero masthead).
// -----------------------------------------------------------------------
export function LineReveal({
  lines,
  as = 'h2',
  className = '',
  trigger = 'view',
  delay = 0,
  each = 0.12,
  amount = 0.55,
}) {
  const Tag = motion[as] || motion.h2
  const anim =
    trigger === 'load'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount } }
  return (
    <Tag className={className} variants={stagger(each, delay)} {...anim}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span className="line-inner" variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// -----------------------------------------------------------------------
//  Reveal — a generic scroll-triggered reveal for any single element.
// -----------------------------------------------------------------------
export function Reveal({
  children,
  variant = fadeUp,
  as = 'div',
  className = '',
  delay = 0,
  amount = 0.3,
  once = true,
  style,
}) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      style={style}
      variants={variant}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}

// -----------------------------------------------------------------------
//  Stagger + Item — a container whose children reveal in sequence.
//  Children should be <Stagger.Item> (or any motion element using the
//  provided item variant).
// -----------------------------------------------------------------------
export function Stagger({
  children,
  as = 'div',
  className = '',
  each = 0.09,
  delay = 0,
  amount = 0.2,
  once = true,
}) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      className={className}
      variants={stagger(each, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Tag>
  )
}

export function StaggerItem({ children, variant = fadeUp, as = 'div', className = '', style }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag className={className} variants={variant} style={style}>
      {children}
    </Tag>
  )
}

// -----------------------------------------------------------------------
//  MagneticButton — a subtle magnetic pull toward the pointer on desktop.
//  Wraps its child (the real <a>/<button>); on touch or reduced-motion it
//  renders the child untouched. Keeps the interactive element intact for
//  accessibility — the wrapper is purely presentational.
// -----------------------------------------------------------------------
export function MagneticButton({ children, strength = 0.34, className = '' }) {
  const fine = useFinePointer()
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING.snappy)
  const sy = useSpring(y, SPRING.snappy)

  if (!fine) return <span className={`magnetic ${className}`}>{children}</span>

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy, display: 'inline-flex' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.span>
  )
}

// A tiny presentational helper: a thin animated rule that draws in on view.
export function DrawRule({ className = '' }) {
  return (
    <motion.span
      className={`draw-rule ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: DUR.slow, ease: EASE.editorial }}
      aria-hidden="true"
    />
  )
}
