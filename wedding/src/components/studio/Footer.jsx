import { Link } from 'react-router-dom'
import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div className="foot__brand">
          <div className="foot__name">
            <span className="foot__mark">✦</span> {studio.brandName}
          </div>
          <p className="foot__tag">{studio.positioning}</p>
          <a className="btn btn--gold" href={generalOrderUrl()} target="_blank" rel="noreferrer">
            Start on WhatsApp
          </a>
        </div>

        <div className="foot__col">
          <h4>Collections</h4>
          <Link to="/muslim">Muslim Invitations</Link>
          <Link to="/hindu">Hindu Invitations</Link>
          <Link to="/christian">Christian Invitations</Link>
          <Link to="/collection">View all</Link>
        </div>

        <div className="foot__col">
          <h4>Studio</h4>
          <Link to="/">Home</Link>
          <Link to="/collection">How it works</Link>
          {studio.email && <a href={`mailto:${studio.email}`}>{studio.email}</a>}
          {studio.instagram && (
            <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>
          )}
        </div>
      </div>

      <div className="wrap foot__base">
        <span>© {year} {studio.brandFull}. All rights reserved.</span>
        <span className="foot__made">Cinematic wedding invitations</span>
      </div>
    </footer>
  )
}
