import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import MobileCTA from './MobileCTA.jsx'
import Cursor from './Cursor.jsx'
import useSmoothScroll from '../../hooks/useSmoothScroll.js'

// Shared marketplace shell: custom cursor + weighted smooth scroll (both
// desktop / motion-safe only), navbar + page + footer + sticky mobile CTA.
// `waHref` lets a page point the sticky CTA at a specific template.
export default function StudioLayout({ children, waHref }) {
  useSmoothScroll()
  return (
    <div className="studio">
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCTA href={waHref} />
    </div>
  )
}
