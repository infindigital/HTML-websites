import { useEffect, useRef, useState } from 'react';
import { nav } from '../data/content.js';

const NAV_TO_ID = { intro: 'intro', products: 'products', process: 'ritual', story: 'story', shop: 'shop' };

export default function Navigation({ onNavigate }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) ref.current.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    onNavigate(NAV_TO_ID[id] || id);
  };

  return (
    <nav ref={ref} className="nav" aria-label="Primary">
      <a href="#intro" className="nav__brand" onClick={(e) => go(e, 'intro')}>
        RS Chef&rsquo;z
      </a>
      <div className="nav__links">
        {nav.map((n) => (
          <a key={n.id} href={`#${NAV_TO_ID[n.id]}`} className="nav__link" data-cursor onClick={(e) => go(e, n.id)}>
            {n.label}
          </a>
        ))}
      </div>
      <button className="nav__toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        Menu
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, top: 60, zIndex: 19, background: 'rgba(16,9,4,0.96)', display: 'flex', flexDirection: 'column', gap: 18, padding: '30px var(--pad-edge)' }}>
          {nav.map((n) => (
            <a key={n.id} className="nav__link" style={{ fontSize: 24 }} href={`#${NAV_TO_ID[n.id]}`} onClick={(e) => go(e, n.id)}>
              {n.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
