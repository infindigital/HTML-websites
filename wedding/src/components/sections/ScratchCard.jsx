import { useEffect, useRef, useState, useCallback } from 'react'
import config from '../../config.js'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { fireConfetti } from '../../lib/confetti.js'
import ArchFrame from '../ui/ArchFrame.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Flourish } from '../ui/Ornaments.jsx'

// Section 4 — Scratch-to-Reveal Card.
// Fraction of the gold cover that must be cleared before it auto-reveals.
// Kept low so a light scratch is enough — the rest fades away on its own.
const REVEAL_AT = 0.12

export default function ScratchCard() {
  const { t, lang } = useLanguage()
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const stateRef = useRef({ drawing: false, moves: 0, last: null, revealed: false })

  // Paint the gold cover with the "SCRATCH TO REVEAL" label.
  const paintCover = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap || stateRef.current.revealed) return
    const rect = wrap.getBoundingClientRect()
    if (rect.width === 0) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = Math.floor(rect.width * dpr)
    canvas.height = Math.floor(rect.height * dpr)
    canvas.style.width = rect.width + 'px'
    canvas.style.height = rect.height + 'px'
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const w = rect.width
    const h = rect.height

    // gold gradient base
    const g = ctx.createLinearGradient(0, 0, w, h)
    g.addColorStop(0, '#b8912f')
    g.addColorStop(0.5, '#e8d48a')
    g.addColorStop(1, '#b8912f')
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    // subtle brushed shimmer
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.lineWidth = 1
    for (let i = -h; i < w; i += 10) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + h, h)
      ctx.stroke()
    }

    // inner hairline frame
    ctx.strokeStyle = 'rgba(74,59,40,0.45)'
    ctx.lineWidth = 1.5
    ctx.strokeRect(10, 10, w - 20, h - 20)

    // label
    ctx.fillStyle = 'rgba(74,59,40,0.82)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const label = t('scratchToReveal')
    const fontSize = Math.max(13, Math.min(20, w * 0.05))
    ctx.font = `600 ${fontSize}px 'Cinzel', Georgia, serif`
    // manual letter-spacing
    const tracked = label.split('').join(' ')
    ctx.fillText(tracked, w / 2, h / 2 + 2)

    // little scratch hint above label
    ctx.font = `${fontSize * 1.4}px Georgia, serif`
    ctx.fillText('✦', w / 2, h / 2 - fontSize * 1.8)
  }, [t])

  const doReveal = useCallback(() => {
    if (stateRef.current.revealed) return
    stateRef.current.revealed = true
    setRevealed(true)
    // Birthday-style confetti pop bursting from the card's centre.
    const wrap = wrapRef.current
    if (wrap) {
      const r = wrap.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      fireConfetti(cx, cy)
      // a second, softer puff a beat later for a fuller pop
      setTimeout(() => fireConfetti(cx, cy - 12, { count: 70, power: 0.85 }), 180)
    }
  }, [])

  // Percentage of the cover that has been scratched away.
  const sampleCleared = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return 0
    const ctx = canvas.getContext('2d')
    const { width: cw, height: ch } = canvas
    if (cw === 0) return 0
    let cleared = 0
    let total = 0
    const step = 8
    const data = ctx.getImageData(0, 0, cw, ch).data
    for (let y = 0; y < ch; y += step) {
      for (let x = 0; x < cw; x += step) {
        total++
        if (data[(y * cw + x) * 4 + 3] < 40) cleared++
      }
    }
    return total ? cleared / total : 0
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    paintCover()
    // repaint once webfonts are ready so the label uses Cinzel
    if (document.fonts?.ready) document.fonts.ready.then(paintCover)

    const ctx = canvas.getContext('2d')

    function pos(e) {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function scratchTo(p) {
      ctx.globalCompositeOperation = 'destination-out'
      const r = 30
      const last = stateRef.current.last
      if (last) {
        ctx.lineWidth = r * 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(last.x, last.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
      ctx.fill()
      stateRef.current.last = p
    }

    function onDown(e) {
      if (stateRef.current.revealed) return
      stateRef.current.drawing = true
      stateRef.current.last = null
      canvas.setPointerCapture?.(e.pointerId)
      scratchTo(pos(e))
      e.preventDefault()
    }
    function onMove(e) {
      if (!stateRef.current.drawing || stateRef.current.revealed) return
      e.preventDefault()
      scratchTo(pos(e))
      stateRef.current.moves++
      if (stateRef.current.moves % 4 === 0) {
        if (sampleCleared() > REVEAL_AT) doReveal()
      }
    }
    function onUp() {
      stateRef.current.drawing = false
      stateRef.current.last = null
      if (!stateRef.current.revealed && sampleCleared() > REVEAL_AT) doReveal()
    }

    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    const ro = new ResizeObserver(() => {
      if (!stateRef.current.revealed) paintCover()
    })
    ro.observe(wrap)

    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      ro.disconnect()
    }
  }, [paintCover, sampleCleared, doReveal])

  return (
    <section className="section scratch" aria-label="Nikah ceremony">
      <Reveal as="h2" className="cinzel section-title">
        {t('nikahCeremony')}
      </Reveal>
      <Reveal>
        <Flourish />
      </Reveal>

      <Reveal delay={0.05}>
        <ArchFrame className="scratch__arch">
          <div
            className={`scratch__wrap ${revealed ? 'is-revealed' : ''}`}
            ref={wrapRef}
          >
            {/* Hidden reward beneath the gold cover */}
            <div className="scratch__reward" lang={lang}>
              <span className="scratch__reward-eyebrow eyebrow">
                {t('nikahCeremony')}
              </span>
              <span className="cormorant scratch__reward-date">
                {t('ceremonyDate')}
              </span>
              <span className="scratch__reward-time cinzel">{t('ceremonyTime')}</span>
            </div>
            <canvas
              ref={canvasRef}
              className="scratch__canvas"
              role="img"
              aria-label={t('scratchToReveal')}
            />
          </div>
        </ArchFrame>
      </Reveal>

      <Reveal as="p" delay={0.1} className="eyebrow scratch__caption">
        {t('revealTheDate')}
      </Reveal>
    </section>
  )
}
