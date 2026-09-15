import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'
import { scrollToId } from '../../studio/scroll.js'

const LINKS = [
  { id: 'templates', label: 'Collection' },
  { id: 'films', label: 'Films' },
  { id: 'how', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
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
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__brand-mark spark">✦</span>
          <span className="nav__brand-name">{studio.brandName}</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} type="button" className="nav__link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a className="btn btn--ink nav__cta" href={generalOrderUrl()} target="_blank" rel="noreferrer">
            Order
          </a>
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
        {LINKS.map((l, i) => (
          <button key={l.id} type="button" className="nav__overlay-link" onClick={() => go(l.id)}>
            <span className="idx">0{i + 1}</span>{l.label}
          </button>
        ))}
        <a
          className="btn btn--ink btn--lg nav__overlay-cta"
          href={generalOrderUrl()}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Order on WhatsApp
        </a>
        <div className="nav__overlay-foot">
          <span>{studio.brandName}</span>
          <span>{studio.currency}{studio.price} · Personalised</span>
        </div>
      </div>
    </header>
  )
}
