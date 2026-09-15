import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'
import { scrollToId, scrollToTop } from '../../studio/scroll.js'
import { LineReveal, Reveal, MagneticButton } from './Reveal.jsx'

// The last page of the magazine: a large closing statement rises out of its
// mask, then brand / navigation / contact and a smooth back-to-top.
export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => scrollToTop()

  return (
    <footer className="foot">
      <div className="wrap">
        <LineReveal
          as="p"
          className="foot__closer"
          each={0.13}
          amount={0.4}
          lines={['Let your story', <em key="e">take the screen.</em>]}
        />
      </div>

      <Reveal className="wrap foot__grid" amount={0.2}>
        <div className="foot__brand">
          <div className="foot__name"><span className="foot__mark">✦</span> {studio.brandName}</div>
          <p className="foot__tag">{studio.positioning}</p>
          <MagneticButton>
            <a className="btn btn--gold" href={generalOrderUrl()} target="_blank" rel="noreferrer">
              Start on WhatsApp
            </a>
          </MagneticButton>
        </div>

        <div className="foot__col">
          <h4>Explore</h4>
          <button type="button" onClick={() => scrollToId('templates')}>Collection</button>
          <button type="button" onClick={() => scrollToId('films')}>Films</button>
          <button type="button" onClick={() => scrollToId('how')}>Process</button>
          <button type="button" onClick={() => scrollToId('faq')}>FAQ</button>
        </div>

        <div className="foot__col">
          <h4>Contact</h4>
          {studio.email && <a href={`mailto:${studio.email}`}>{studio.email}</a>}
          {studio.instagram && <a href={studio.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          <a href={generalOrderUrl()} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </Reveal>

      <div className="wrap foot__base">
        <span>© {year} {studio.brandFull}. All rights reserved.</span>
        <button type="button" className="foot__totop" onClick={toTop}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  )
}
