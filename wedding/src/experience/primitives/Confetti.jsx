import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion.js'

// =====================================================================
//  Confetti — a short, celebratory burst (canvas). Fires once on mount
//  then settles. Colours come from the active theme tokens. Never blocks
//  pointer events; skipped under reduced-motion.
// =====================================================================
const rand = (a, b) => Math.random() * (b - a) + a

export default function Confetti({ className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReduced()) return undefined
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const W = () => canvas.clientWidth || window.innerWidth
    const H = () => canvas.clientHeight || window.innerHeight

    const resize = () => {
      canvas.width = Math.floor(W() * dpr)
      canvas.height = Math.floor(H() * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const cs = getComputedStyle(canvas)
    const tok = (name, fallback) => {
      const v = cs.getPropertyValue(name).trim()
      return v || fallback
    }
    const colors = [
      tok('--x-gold', '#f0d183'),
      tok('--x-gold2', '#f7e6b0'),
      tok('--x-accent', '#c98a5e'),
      tok('--x-ink', '#f6ecd8'),
      '#ffffff',
    ]

    // Two "poppers" firing inward from the lower corners + a soft centre puff.
    const origins = [
      { x: W() * 0.16, y: H() * 0.82, dir: -Math.PI * 0.32 },
      { x: W() * 0.84, y: H() * 0.82, dir: -Math.PI * 0.68 },
      { x: W() * 0.5, y: H() * 0.44, dir: -Math.PI * 0.5 },
    ]
    const parts = []
    origins.forEach((o, oi) => {
      const n = oi === 2 ? 60 : 70
      for (let i = 0; i < n; i++) {
        const spread = oi === 2 ? Math.PI : Math.PI * 0.5
        const a = o.dir + rand(-spread / 2, spread / 2)
        const sp = rand(6, 16)
        parts.push({
          x: o.x, y: o.y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          size: rand(5, 11),
          rot: rand(0, Math.PI * 2),
          vr: rand(-0.3, 0.3),
          color: colors[(Math.random() * colors.length) | 0],
          life: 0,
          ttl: rand(90, 160),
          shape: Math.random() < 0.5 ? 'rect' : 'circle',
        })
      }
    })

    let raf = null
    let running = true
    const frame = () => {
      ctx.clearRect(0, 0, W(), H())
      let alive = 0
      for (const p of parts) {
        p.life += 1
        if (p.life > p.ttl) continue
        alive++
        p.vy += 0.26 // gravity
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rot += p.vr
        ctx.save()
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.ttl)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66)
        else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }
      if (alive > 0 && running) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      running = false
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} className={`confetti ${className}`} aria-hidden="true" />
}
