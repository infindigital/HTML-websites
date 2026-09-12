import { useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Collection from './pages/Collection.jsx'
import Category from './pages/Category.jsx'
import TemplateDetail from './pages/TemplateDetail.jsx'
import InvitationRoute from './invitation/InvitationRoute.jsx'
import { CATEGORY_ORDER } from './studio/themes.js'

// Jump to the top of the page whenever the route changes.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Guard the /:category route so only real categories render.
function CategoryGuard() {
  const { pathname } = useLocation()
  const cat = pathname.replace(/^\//, '')
  if (!CATEGORY_ORDER.includes(cat)) return <Navigate to="/" replace />
  return <Category />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/templates/:category/:slug" element={<TemplateDetail />} />
        <Route path="/invite/:category/:slug" element={<InvitationRoute />} />
        <Route path="/:category" element={<CategoryGuard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MotionConfig>
  )
}
