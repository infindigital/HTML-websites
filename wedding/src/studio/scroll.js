// Smooth in-page scroll. Used instead of href="#id" because HashRouter
// reserves the URL hash for routing.
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
