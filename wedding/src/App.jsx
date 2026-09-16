import { useLayoutEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import InvitationRoute from './invitation/InvitationRoute.jsx'

// Reset the page on every route change, BEFORE the new route paints.
//
// useLayoutEffect (not useEffect) matters here: a preview modal / mobile menu
// locks scrolling with `body { overflow: hidden }` and only releases it in an
// async cleanup. Opening the live invitation from that modal on desktop could
// therefore paint the new route while the body was still locked AND still
// scrolled down the (now unmounted) landing page — which showed up as an
// "empty" invitation that only appeared after a manual reload. Releasing the
// lock and jumping to the top synchronously, before paint, closes that gap.
function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      try { window.history.scrollRestoration = 'manual' } catch { /* noop */ }
    }
    try { document.body.style.overflow = '' } catch { /* noop */ }
    window.scrollTo(0, 0)
    if (document.documentElement) document.documentElement.scrollTop = 0
  }, [pathname])
  return null
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/invite/:slug" element={<InvitationRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  )
}
