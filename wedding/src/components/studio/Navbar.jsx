import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import studio from '../../studio/config.js'
import { generalOrderUrl } from '../../studio/whatsapp.js'

const LINKS = [
  { to: '/collection', label: 'Collection' },
  { to: '/muslim', label: 'Muslim' },
  { to: '/hindu', label: 'Hindu' },
  { to: '/christian', label: 'Christian' },
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

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__brand-mark">✦</span>
          <span className="nav__brand-name">{studio.brandName}</span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
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
