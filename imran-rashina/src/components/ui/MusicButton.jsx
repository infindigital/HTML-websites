import { motion } from 'framer-motion'
import { useAudio } from '../../context/AudioContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'
import { MusicNoteIcon, MusicMuteIcon } from './Icons.jsx'

// Fixed circular gold button (bottom-left) controlling the looping audio.
// Gently pulses while playing.
export default function MusicButton() {
  const { isPlaying, toggle } = useAudio()
  const { t } = useLanguage()

  return (
    <motion.button
      type="button"
      className={`music-btn ctrl-btn ${isPlaying ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-label={isPlaying ? t('musicPause') : t('musicPlay')}
      aria-pressed={isPlaying}
      whileTap={{ scale: 0.9 }}
      animate={
        isPlaying
          ? { boxShadow: ['0 0 0 0 rgba(184,145,47,0.45)', '0 0 0 12px rgba(184,145,47,0)'] }
          : { boxShadow: '0 0 0 0 rgba(184,145,47,0)' }
      }
      transition={
        isPlaying
          ? { duration: 1.8, repeat: Infinity, ease: 'easeOut' }
          : { duration: 0.3 }
      }
    >
      <span className="ctrl-btn__icon">
        {isPlaying ? <MusicNoteIcon /> : <MusicMuteIcon />}
      </span>
      {isPlaying && (
        <motion.span
          className="music-btn__wave"
          aria-hidden="true"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
    </motion.button>
  )
}
