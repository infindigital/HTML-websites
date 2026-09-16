import { useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Desktop pointer parallax. Returns spring-smoothed, normalised pointer
// position in the range -0.5..0.5 on each axis. No-ops on touch devices and
// when the visitor prefers reduced motion, so callers can multiply freely.
export default function usePointerParallax({ stiffness = 55, damping = 18 } = {}) {
  const reduced = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness, damping, mass: 0.4 })
  const sy = useSpring(py, { stiffness, damping, mass: 0.4 })

  useEffect(() => {
    if (reduced) return undefined
    const fine = window.matchMedia?.('(pointer: fine)').matches
    if (!fine) return undefined
    const onMove = (e) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, px, py])

  return { px: sx, py: sy, active: !reduced }
}
