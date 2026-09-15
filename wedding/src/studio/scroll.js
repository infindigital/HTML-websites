// Smooth in-page scroll. Used instead of href="#id" because HashRouter
// reserves the URL hash for routing.
//
// Before scrolling we park the weighted smooth-scroll lerp (if any) via a
// `smoothscroll:stop` event, so the custom scroll and this native smooth
// scroll don't fight. Honours reduced-motion by jumping instantly.

const wantsSmooth = () =>
  typeof window === 'undefined' ||
  !window.matchMedia ||
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function park() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('smoothscroll:stop'))
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  park()
  el.scrollIntoView({ behavior: wantsSmooth() ? 'smooth' : 'auto', block: 'start' })
}

export function scrollToTop() {
  park()
  window.scrollTo({ top: 0, behavior: wantsSmooth() ? 'smooth' : 'auto' })
}
