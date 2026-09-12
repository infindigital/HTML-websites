import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'
import { scrollToId } from '../../studio/scroll.js'

const LINKS = [
  { id: 'templates', label: 'Invitations' },
  { id: 'how', label: 'How it works' },
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

  const go = (id) => { scrollToId(id); setOpen(false) }

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__brand-mark">✦</span>
          <span className="nav__brand-name">{studio.brandName}</span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <button key={l.id} type="button" className="nav__link" onClick={() => go(l.id)}>
              {l.label}
            </button>
          ))}
          <a
            className="btn btn--gold nav__cta"
            href={generalOrderUrl()}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Order on WhatsApp
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
    </header>
  )
}
