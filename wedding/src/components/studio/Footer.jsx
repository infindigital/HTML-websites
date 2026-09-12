import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'
import { scrollToId } from '../../studio/scroll.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="foot">
      <div className="wrap foot__grid">
        <div className="foot__brand">
          <div className="foot__name"><span className="foot__mark">✦</span> {studio.brandName}</div>
          <p className="foot__tag">{studio.positioning}</p>
          <a className="btn btn--gold" href={generalOrderUrl()} target="_blank" rel="noreferrer">
            Start on WhatsApp
          </a>
        </div>

        <div className="foot__col">
          <h4>Explore</h4>
          <button type="button" onClick={() => scrollToId('templates')}>Invitations</button>
          <button type="button" onClick={() => scrollToId('how')}>How it works</button>
          <button type="button" onClick={() => scrollToId('faq')}>FAQ</button>
        </div>

        <div className="foot__col">
          <h4>Contact</h4>
          {studio.email && <a href={`mailto:${studio.email}`}>{studio.email}</a>}
          {studio.instagram && <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          <a href={generalOrderUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>

      <div className="wrap foot__base">
        <span>© {year} {studio.brandFull}. All rights reserved.</span>
        <span className="foot__made">Cinematic wedding invitations</span>
      </div>
    </footer>
  )
}
