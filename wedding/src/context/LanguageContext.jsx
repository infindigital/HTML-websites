import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react'
import config from '../config.js'
import { translations, LANGUAGE_META } from '../i18n.js'
import { InvitationContext } from './InvitationContext.jsx'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'an-lang'

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && config.languages.includes(saved)) return saved
  } catch {
    /* ignore */
  }
  return config.defaultLanguage
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)
  // Per-template / per-customer name overrides (null when standalone).
  const invitation = useContext(InvitationContext)

  const dir = LANGUAGE_META[lang]?.dir ?? 'ltr'

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    document.documentElement.setAttribute('dir', dir)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  // Translate a key. Invitation overrides win (so a blank '' still counts),
  // then the active language, then English, then the key itself.
  const t = useCallback(
    (key) => {
      const override = invitation?.labels?.[key]
      if (override !== undefined) return override
      return translations[lang]?.[key] ?? translations.en?.[key] ?? key
    },
    [lang, invitation],
  )

  const changeLanguage = useCallback((next) => {
    if (config.languages.includes(next)) setLang(next)
  }, [])

  const value = useMemo(
    () => ({
      lang,
      dir,
      isRTL: dir === 'rtl',
      t,
      setLang: changeLanguage,
      languages: config.languages,
      meta: LANGUAGE_META,
    }),
    [lang, dir, t, changeLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
