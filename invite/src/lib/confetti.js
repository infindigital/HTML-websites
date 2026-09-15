// One-shot confetti burst — a "birthday popper" that pops from a point,
// shoots up and out, tumbles, then rains down and fades. It paints itself
// on a throwaway full-screen canvas and removes everything once the pieces
// have settled, so callers just fire and forget:
//
//   fireConfetti(x, y)   // x,y = viewport coords of the burst origin
//
// Honours prefers-reduced-motion by doing nothing.

const COLORS = [
  '#b8912f', // deep gold
  '#e8d48a', // light gold
  '#d4af37', // metallic gold
  '#f4e4a6', // pale champagne
  '#c8a544', // antique gold
  '#6f8f5a', // leaf green
  '#87a56b', // sage
  '#fbf1cf', // cream sparkle
]

const rand = (min, max) => Math.random() * (max - min) + min

export function fireConfetti(originX, originY, opts = {}) {
  if (typeof window === 'undefined') return
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const count = opts.count ?? 150
  const power = opts.power ?? 1 // burst strength multiplier

  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, {
    position: 'fixed',
    inset: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '60',
  })
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let vw = window.innerWidth
  let vh = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  function size() {
    vw = window.innerWidth
    vh = window.innerHeight
    canvas.width = Math.floor(vw * dpr)
    canvas.height = Math.floor(vh * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  size()

  const gravity = 0.34
  const drag = 0.988

  function makePiece() {
    // Cone pointing up (−90°) with a wide spread so the burst fans across
    // the screen like a popper, plus a few strips shot nearly sideways.
    const angle = -Math.PI / 2 + rand(-1.15, 1.15)
    const speed = rand(9, 20) * power
    const strip = Math.random() < 0.5
    return {
      x: originX + rand(-8, 8),
      y: originY + rand(-8, 8),
      vx: Math.cos(angle) * speed + rand(-1.5, 1.5),
      vy: Math.sin(angle) * speed,
      w: strip ? rand(4, 7) : rand(7, 12),
      h: strip ? rand(10, 18) : rand(7, 12),
      color: COLORS[(Math.random() * COLORS.length) | 0],
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.28, 0.28),
      tilt: rand(0, Math.PI * 2),
      tiltSpeed: rand(0.12, 0.34),
      life: 0,
      ttl: rand(110, 190),
    }
  }

  let pieces = Array.from({ length: count }, makePiece)

  let rafId = null
  let alive = true

  function frame() {
    ctx.clearRect(0, 0, vw, vh)
    let remaining = 0
    for (const p of pieces) {
      if (p.dead) continue
      p.vy += gravity
      p.vx *= drag
      p.vy *= drag
      p.x += p.vx
      p.y += p.vy
      p.rot += p.rotSpeed
      p.tilt += p.tiltSpeed
      p.life++
      if (p.life > p.ttl || p.y > vh + 40) {
        p.dead = true
        continue
      }
      remaining++
      // fade over the final stretch of life
      const fade = Math.min(1, (p.ttl - p.life) / 40)
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      // horizontal squash from `tilt` fakes a 3D tumble/flip
      const sx = Math.max(0.15, Math.abs(Math.cos(p.tilt)))
      ctx.scale(sx, 1)
      ctx.globalAlpha = fade
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    if (remaining === 0) {
      cleanup()
      return
    }
    rafId = requestAnimationFrame(frame)
  }

  function onResize() {
    size()
  }
  window.addEventListener('resize', onResize)

  function cleanup() {
    if (!alive) return
    alive = false
    if (rafId) cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
    canvas.remove()
  }

  rafId = requestAnimationFrame(frame)
  // hard safety stop in case something wedges the loop
  setTimeout(cleanup, 6000)

  return cleanup
}
