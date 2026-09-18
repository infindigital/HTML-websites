import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'
import { scrollToId, scrollToTop } from '../../studio/scroll.js'
import { LineReveal, Reveal, MagneticButton } from './Reveal.jsx'
import { OrderButton } from './OrderButton.jsx'
import Wordmark from './Wordmark.jsx'

// The last page of the magazine: a large closing statement rises out of its
// mask, then brand / navigation / contact and a smooth back-to-top.
export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => scrollToTop()
  const orderLabel = `Order ${studio.currency}${studio.price}`

  return (
    <footer id="contact" className="foot">
      <div className="wrap">
        <LineReveal
          as="p"
          className="foot__closer"
          each={0.13}
          amount={0.4}
          lines={['Open the link.', <em key="e">Enter the celebration.</em>]}
        />
      </div>

      <Reveal className="wrap foot__grid" amount={0.2}>
        <div className="foot__brand">
          <div className="foot__name"><Wordmark /></div>
          <p className="foot__tag">{studio.positioning}</p>
          <MagneticButton>
            <OrderButton label={orderLabel} />
          </MagneticButton>
        </div>

        <div className="foot__col">
          <h4>Explore</h4>
          <button type="button" onClick={() => scrollToId('templates')}>Collections</button>
          <button type="button" onClick={() => scrollToId('how')}>How It Works</button>
          <button type="button" onClick={() => scrollToId('about')}>About</button>
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
