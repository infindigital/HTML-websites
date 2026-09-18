import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import studio from '../../studio/config.js'
import { scrollToId } from '../../studio/scroll.js'
import { MagneticButton } from './Reveal.jsx'
import { OrderButton } from './OrderButton.jsx'
import Wordmark from './Wordmark.jsx'

const LINKS = [
  { id: 'templates', label: 'Collections' },
  { id: 'how', label: 'How It Works' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const ORDER_LABEL = `Order ${studio.currency}${studio.price}`

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Solid past the fold; hide when scrolling down, reveal when scrolling up.
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const update = () => {
      const y = window.scrollY
      setSolid(y > 24)
      if (y > 160 && y > last + 4) setHidden(true)
      else if (y < last - 4 || y < 160) setHidden(false)
      last = y
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (id) => {
    setOpen(false)
    document.body.style.overflow = ''
    setTimeout(() => scrollToId(id), 60)
  }

  return (
    <header className={`nav ${solid ? 'is-solid' : ''} ${hidden && !open ? 'is-hidden' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)} aria-label={studio.brandName}>
          <Wordmark />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} type="button" className="nav__link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <MagneticButton>
            <OrderButton className="nav__cta" label={ORDER_LABEL} />
          </MagneticButton>
        </nav>

        <button
          type="button"
          className={`nav__burger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__overlay ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="nav__overlay-links">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              type="button"
              className="nav__overlay-link"
              style={{ '--i': i }}
              onClick={() => go(l.id)}
            >
              <span className="idx">0{i + 1}</span>{l.label}
            </button>
          ))}
        </div>
        <OrderButton
          className="nav__overlay-cta"
          large
          label={ORDER_LABEL}
          onClick={() => setOpen(false)}
        />
        <div className="nav__overlay-foot">
          <span>{studio.brandName}</span>
          <span>{studio.currency}{studio.price} · Personalised</span>
        </div>
      </div>
    </header>
  )
}
