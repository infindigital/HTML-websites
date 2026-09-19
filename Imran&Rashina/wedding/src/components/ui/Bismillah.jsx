import { motion } from 'framer-motion'
import { useCallback, useLayoutEffect, useRef } from 'react'
import config from '../../config.js'

// The Bismillah is a single, very wide Unicode ligature (U+FDFD) rendered in
// Amiri. Its rendered width varies with the device and the loaded font, so a
// fixed font-size clips it ("half cut") on some screens. Instead we measure the
// real glyph in the browser and scale the font-size so it always fits its frame
// exactly — never clipped or cut on any device. It re-fits on resize /
// orientation change and once the Amiri web font has actually loaded.
const MAX_PX = 48 // don't let it grow larger than this on wide screens
const SAFE = 0.94 // leave a little breathing room inside the frame walls

export default function Bismillah({ delay = 0 }) {
  const wrapRef = useRef(null)
  const glyphRef = useRef(null)

  const fit = useCallback(() => {
    const wrap = wrapRef.current
    const glyph = glyphRef.current
    if (!wrap || !glyph) return

    const avail = wrap.clientWidth
    if (!avail) return

    // Measure the glyph's natural width at a known size, out of flow so the
    // probe never reflows its ancestors or flashes a scrollbar.
    const prevSize = glyph.style.fontSize
    const prevPos = glyph.style.position
    glyph.style.position = 'absolute'
    glyph.style.fontSize = '100px'
    const glyphWidth = glyph.getBoundingClientRect().width
    glyph.style.position = prevPos
    glyph.style.fontSize = prevSize
    if (!glyphWidth) return

    const emWidth = glyphWidth / 100 // width of the glyph per 1px of font-size
    const size = Math.min(MAX_PX, (avail * SAFE) / emWidth)
    glyph.style.fontSize = `${size}px`
  }, [])

  useLayoutEffect(() => {
    fit()

    const ro = new ResizeObserver(() => fit())
    if (wrapRef.current) ro.observe(wrapRef.current)

    // The first measure may land on the fallback font; re-fit once Amiri loads.
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fit).catch(() => {})
    }
    window.addEventListener('orientationchange', fit)

    return () => {
      ro.disconnect()
      window.removeEventListener('orientationchange', fit)
    }
  }, [fit])

  return (
    <motion.p
      ref={wrapRef}
      className="amiri bismillah"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span ref={glyphRef} className="bismillah__glyph">
        {config.bismillah}
      </span>
    </motion.p>
  )
}
