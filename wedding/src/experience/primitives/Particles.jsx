import { useEffect, useRef } from 'react'
import { prefersReduced } from '../lib/motion.js'

// =====================================================================
//  Particles — the ambient atmosphere layer (full-screen canvas).
//  ---------------------------------------------------------------------
//  variant:
//    'petals'  → marigold petals drifting down          (Hindu)
//    'stars'   → a slow, twinkling night sky            (Muslim)
//    'blossom' → pale petals + light motes floating up   (Christian)
//  Sparse by design. Draws a single still frame under reduced-motion, and
//  pauses when the tab is hidden. Never blocks pointer events.
// =====================================================================
const rand = (a, b) => Math.random() * (b - a) + a

const PALETTES = {
  petals: ['#f0a13a', '#e6771f', '#f4c65a', '#d94f2a', '#f6d98a'],
  stars: ['#f4e39b', '#dfe6ff', '#bcd0ff', '#ffffff', '#f0d183'],
  blossom: ['#f7e2d8', '#f0c9b4', '#e9d3a6', '#ffffff', '#f4d9c0'],
  // Soft warm lantern-light motes (no stars) — used by the Muslim world.
  motes: ['#f0d183', '#f7e6b0', '#e9b64a', '#ffe9a8', '#f4e39b'],
}

export default function Particles({ variant = 'petals', density = 1, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const reduce = prefersReduced()
    const colors = PALETTES[variant] || PALETTES.petals
    const rising = variant === 'blossom' || variant === 'motes'
    const isStar = variant === 'stars'
    const isMote = variant === 'motes'

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let parts = []
    let raf = null

    const make = (spawnAnywhere) => {
      const size = isStar ? rand(0.8, 2.4) : isMote ? rand(1.6, 4.2) : rand(6, 16)
      return {
        x: rand(0, w),
        y: spawnAnywhere ? rand(0, h) : rising ? h + 20 : -20,
        size,
        speed: isStar ? rand(0.05, 0.22) : isMote ? rand(0.12, 0.4) : rand(0.4, 1.15),
        sway: rand(0.5, 1.7),
        swaySpeed: rand(0.006, 0.018),
        phase: rand(0, Math.PI * 2),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.02, 0.02),
        color: colors[(Math.random() * colors.length) | 0],
        opacity: isStar ? rand(0.25, 0.95) : isMote ? rand(0.12, 0.42) : rand(0.35, 0.85),
        twinkle: rand(0.01, 0.03),
      }
    }

    const build = () => {
      const area = w * h
      const base = isStar ? area / 9000 : isMote ? area / 120000 : area / 130000
      const cap = isStar ? 120 : isMote ? 22 : 20
      const min = isStar ? 26 : 6
      const n = Math.max(min, Math.min(cap, Math.round(base * density)))
      parts = Array.from({ length: n }, () => make(true))
    }

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const drawPetal = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacity
      const g = ctx.createLinearGradient(0, -p.size, 0, p.size)
      g.addColorStop(0, p.color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size * 0.42, p.size, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawStar = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      const a = p.opacity
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3)
      grad.addColorStop(0, p.color)
      grad.addColorStop(0.4, p.color)
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.globalAlpha = a * 0.5
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = a
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 0.7, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // Soft warm light mote (lantern glow) — no bright core, no star points.
    const drawMote = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.globalAlpha = p.opacity
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.6)
      g.addColorStop(0, p.color)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 2.6, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawOne = isStar ? drawStar : isMote ? drawMote : drawPetal

    const step = (p) => {
      p.phase += p.swaySpeed
      p.x += Math.sin(p.phase) * p.sway * 0.35
      p.y += rising ? -p.speed : p.speed
      p.rot += p.rotSpeed
      if (isStar) {
        p.opacity += p.twinkle
        if (p.opacity > 0.95 || p.opacity < 0.2) p.twinkle *= -1
      }
      const off = rising ? p.y + p.size < 0 : p.y - p.size > h
      if (off) {
        p.y = rising ? h + p.size : -p.size
        p.x = rand(0, w)
      }
      if (p.x < -30) p.x = w + 20
      else if (p.x > w + 30) p.x = -20
    }

    const paint = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) drawOne(p)
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        step(p)
        drawOne(p)
      }
      raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduce) {
      paint()
    } else {
      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf)
        raf = null
      } else if (!reduce && raf == null) {
        raf = requestAnimationFrame(frame)
      }
    }

    let t = null
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(resize, 160)
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [variant, density])

  return <canvas ref={ref} className={`particles ${className}`} aria-hidden="true" />
}
