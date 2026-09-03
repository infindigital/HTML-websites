import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { SunIcon, MoonIcon } from './Icons.jsx'

// Fixed circular sun/moon button (top-right) that flips the palette.
export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  const { t } = useLanguage()

  return (
    <motion.button
      type="button"
      className="theme-toggle ctrl-btn"
      onClick={toggle}
      aria-label={isDark ? t('themeToLight') : t('themeToDark')}
      aria-pressed={isDark}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          className="ctrl-btn__icon"
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
