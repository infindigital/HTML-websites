import { useEffect, useRef } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'

// Continuous falling-botanical layer: green leaves + tiny gold specks drift
// down and sway forever on a full-screen canvas. Paused when the user
// prefers reduced motion.

const LEAF_GREENS = ['#6f8f5a', '#5c7a48', '#87a56b', '#4e6b3e', '#9ab27f']

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function FallingLeaves() {
  const canvasRef = useRef(null)
  const { isDark } = useTheme()
  const isDarkRef = useRef(isDark)
  isDarkRef.current = isDark

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const reduceMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles = []
    let rafId = null

    function makeParticle(kind, startAbove) {
      const isSpeck = kind === 'speck'
      return {
        kind,
        x: rand(0, width),
        y: startAbove ? rand(-height, 0) : rand(0, height),
        size: isSpeck ? rand(1.2, 2.8) : rand(9, 20),
        speed: isSpeck ? rand(0.25, 0.7) : rand(0.5, 1.3),
        sway: rand(0.6, 1.8),
        swaySpeed: rand(0.008, 0.02),
        phase: rand(0, Math.PI * 2),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.02, 0.02),
        color: isSpeck ? null : LEAF_GREENS[(Math.random() * LEAF_GREENS.length) | 0],
        opacity: isSpeck ? rand(0.4, 0.9) : rand(0.35, 0.8),
      }
    }

    function build() {
      const area = width * height
      // Sparse, calm drift — a few leaves and a handful of specks.
      const leafCount = Math.round(Math.min(12, Math.max(5, area / 100000)))
      const speckCount = Math.round(Math.min(9, Math.max(3, area / 150000)))
      particles = []
      for (let i = 0; i < leafCount; i++) particles.push(makeParticle('leaf', true))
      for (let i = 0; i < speckCount; i++) particles.push(makeParticle('speck', true))
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    function drawLeaf(p) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacity * (isDarkRef.current ? 0.85 : 1)
      ctx.fillStyle = p.color
      // leaf body
      ctx.beginPath()
      ctx.ellipse(0, 0, p.size * 0.42, p.size * 0.9, 0, 0, Math.PI * 2)
      ctx.fill()
      // centre vein
      ctx.globalAlpha = p.opacity * 0.5
      ctx.strokeStyle = isDarkRef.current ? '#2c3a26' : '#3f5330'
      ctx.lineWidth = Math.max(0.6, p.size * 0.05)
      ctx.beginPath()
      ctx.moveTo(0, -p.size * 0.85)
      ctx.lineTo(0, p.size * 0.85)
      ctx.stroke()
      ctx.restore()
    }

    function drawSpeck(p) {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.globalAlpha = p.opacity
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.4)
      grad.addColorStop(0, isDarkRef.current ? '#f4e4a6' : '#e8d48a')
      grad.addColorStop(0.5, 'rgba(184,145,47,0.55)')
      grad.addColorStop(1, 'rgba(184,145,47,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 2.4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = isDarkRef.current ? '#fbf1cf' : '#c8a544'
      ctx.beginPath()
      ctx.arc(0, 0, p.size * 0.55, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    function frame() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        p.phase += p.swaySpeed
        p.x += Math.sin(p.phase) * p.sway * 0.35
        p.y += p.speed
        p.rot += p.rotSpeed
        if (p.y - p.size > height) {
          p.y = -p.size
          p.x = rand(0, width)
        }
        if (p.x < -30) p.x = width + 20
        else if (p.x > width + 30) p.x = -20
        if (p.kind === 'speck') drawSpeck(p)
        else drawLeaf(p)
      }
      rafId = requestAnimationFrame(frame)
    }

    resize()

    if (reduceMotion) {
      // Draw one calm static frame, then leave it be.
      for (const p of particles) {
        if (p.kind === 'speck') drawSpeck(p)
        else drawLeaf(p)
      }
    } else {
      rafId = requestAnimationFrame(frame)
    }

    let resizeTimer = null
    function onResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 180)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="falling-leaves" aria-hidden="true" />
}
