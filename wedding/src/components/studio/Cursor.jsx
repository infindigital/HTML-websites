import { useEffect, useRef, useState } from 'react'

// A subtle editorial cursor: an inverting dot + trailing ring on desktop that
// grows over interactive elements and turns into a labelled disc ("Open" /
// "Watch" / "View") over media. Never mounts on touch devices or for
// reduced-motion users, so the native cursor is untouched there.
const MEDIA = '.card__media, .filmblock__media, .deckcard'
const HOVER = 'a, button, summary, input, [role="tab"], .card__media, .filmblock__media, .deckcard'

export default function Cursor() {
  const ref = useRef(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    const el = ref.current
    const studioEl = document.querySelector('.studio')
    studioEl?.classList.add('has-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let raf = 0

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      if (el) el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onMove = (e) => { x = e.clientX; y = e.clientY }
    const onOver = (e) => {
      if (!el || !e.target.closest) return
      const media = e.target.closest(MEDIA)
      if (media) {
        el.classList.add('is-media'); el.classList.remove('is-hover')
        setLabel(media.classList.contains('deckcard') ? 'View' : media.classList.contains('filmblock__media') ? 'Watch' : 'Open')
        return
      }
      if (e.target.closest(HOVER)) { el.classList.add('is-hover'); el.classList.remove('is-media'); setLabel('') }
      else { el.classList.remove('is-hover', 'is-media'); setLabel('') }
    }
    const onLeaveWin = () => { if (el) el.style.opacity = '0' }
    const onEnterWin = () => { if (el) el.style.opacity = '1' }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeaveWin)
    document.addEventListener('mouseenter', onEnterWin)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeaveWin)
      document.removeEventListener('mouseenter', onEnterWin)
      studioEl?.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  )
}
