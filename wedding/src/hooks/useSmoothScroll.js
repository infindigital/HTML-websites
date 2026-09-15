import { useEffect } from 'react'

// A lightweight, dependency-free "weighted" smooth scroll (Lenis-style lerp).
// Deliberately conservative: only on desktop fine-pointer devices, never for
// reduced-motion users, never while a modal has locked the body, and it always
// yields to inner scrollable elements (the fullscreen player, etc.). Touch and
// keyboard scrolling stay fully native.
//
// It also yields to programmatic navigation: nav clicks and "back to top"
// dispatch a `smoothscroll:stop` event (see studio/scroll.js) that parks the
// lerp so a native smooth scroll can take over without a tug-of-war.
export default function useSmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return undefined

    let target = window.scrollY
    let current = window.scrollY
    let raf = 0
    let running = false
    const EASE = 0.11

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
      target = current = window.scrollY
    }

    const loop = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.5) {
        current = target
        window.scrollTo(0, Math.round(current))
        running = false
        return
      }
      current += diff * EASE
      window.scrollTo(0, current)
      raf = requestAnimationFrame(loop)
    }

    // If an ancestor of the wheel target scrolls on its own, don't hijack.
    const inScrollable = (node) => {
      let el = node
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.nodeType === 1) {
          const oy = getComputedStyle(el).overflowY
          if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 2) return true
        }
        el = el.parentElement
      }
      return false
    }

    const onWheel = (e) => {
      if (e.ctrlKey) return // pinch-zoom
      if (document.body.style.overflow === 'hidden') return // modal / menu open
      if (inScrollable(e.target)) return
      e.preventDefault()
      if (!running) { target = window.scrollY; current = window.scrollY }
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY))
      if (!running) { running = true; raf = requestAnimationFrame(loop) }
    }

    // Resync when the page is scrolled by other means (keyboard, native smooth).
    const onSync = () => { if (!running) { target = window.scrollY; current = window.scrollY } }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onSync, { passive: true })
    window.addEventListener('resize', onSync)
    window.addEventListener('smoothscroll:stop', stop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onSync)
      window.removeEventListener('resize', onSync)
      window.removeEventListener('smoothscroll:stop', stop)
    }
  }, [])
}
