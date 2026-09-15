import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { GlobeIcon, ChevronDownIcon } from './Icons.jsx'

// Fixed gold pill (top-left) with a globe + dropdown. Each option shows the
// language in its native script with a small English label beside it.
export default function LanguageSwitcher() {
  const { lang, setLang, languages, meta, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = meta[lang]

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        type="button"
        className="lang-switch__pill"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('langAria')}
      >
        <span className="lang-switch__globe">
          <GlobeIcon />
        </span>
        <span className="lang-switch__current">{current?.native}</span>
        <motion.span
          className="lang-switch__chev"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDownIcon size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="lang-switch__menu"
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {languages.map((code) => {
              const m = meta[code]
              const active = code === lang
              return (
                <li key={code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    className={`lang-switch__opt ${active ? 'is-active' : ''}`}
                    onClick={() => {
                      setLang(code)
                      setOpen(false)
                    }}
                    lang={code}
                    dir="ltr"
                  >
                    <span className="lang-switch__native">{m.native}</span>
                    {m.english && (
                      <span className="lang-switch__eng">/ {m.english}</span>
                    )}
                    {active && <span className="lang-switch__check" aria-hidden="true">✦</span>}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
