import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import MobileCTA from './MobileCTA.jsx'

// Shared marketplace shell: navbar + page + footer + sticky mobile CTA.
// `waHref` lets a page point the sticky CTA at a specific template.
export default function StudioLayout({ children, waHref }) {
  return (
    <div className="studio">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <MobileCTA href={waHref} />
    </div>
  )
}
