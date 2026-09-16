import { useCallback, useEffect, useMemo } from 'react'
import { useAudio } from '../context/AudioContext.jsx'
import { ExperienceContext } from './ExperienceContext.js'
import { configFor, mergeTemplate } from './configs/index.js'
import { motifsFor } from './motifs/index.js'
import { paletteVars } from './configs/_shared.js'
import { SCENES } from './scenes/index.js'
import Particles from './primitives/Particles.jsx'
import ScrollProgress from './primitives/ScrollProgress.jsx'
import SceneTransition from './primitives/SceneTransition.jsx'
import { MusicNoteIcon, MusicMuteIcon } from '../components/ui/Icons.jsx'

// A theme-specific seam is inserted before these scenes.
const TRANSITION_BEFORE = new Set(['ceremony', 'venue', 'closing'])

// (Re)start every film. Called on the first user gesture and on the opening tap,
// so the films still play on browsers/devices that block muted autoplay.
function playAllVideos() {
  try {
    document.querySelectorAll('video').forEach((v) => {
      try {
        v.muted = true
        v.play?.().catch(() => {})
      } catch { /* ignore */ }
    })
  } catch { /* ignore */ }
}

// Subtle, safe-area-aware music control (starts only after the opening tap).
function MusicToggle() {
  const { isPlaying, toggle } = useAudio()
  return (
    <button
      type="button"
      className={`x-music${isPlaying ? ' is-playing' : ''}`}
      onClick={toggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
      aria-pressed={isPlaying}
    >
      <span className="x-music__icon">{isPlaying ? <MusicNoteIcon /> : <MusicMuteIcon />}</span>
      {isPlaying && <span className="x-music__wave" aria-hidden="true" />}
    </button>
  )
}

// =====================================================================
//  ImmersiveExperience — the config-driven scene engine. One component set
//  renders all three religions; the config supplies the arc, the content
//  and the palette, and the motif set supplies the visual language.
// =====================================================================
export default function ImmersiveExperience({ template }) {
  const religion = template?.religion || 'hindu'
  const config = useMemo(() => mergeTemplate(configFor(religion), template), [religion, template])
  const M = useMemo(() => motifsFor(religion), [religion])
  const { play } = useAudio()

  // Some browsers/devices block muted autoplay until the first interaction.
  // On the first gesture anywhere, (re)start every film so the videos play.
  useEffect(() => {
    const evs = ['pointerdown', 'touchend', 'click', 'keydown']
    let done = false
    const kick = () => {
      if (done) return
      done = true
      playAllVideos()
      evs.forEach((t) => window.removeEventListener(t, kick))
    }
    evs.forEach((t) => window.addEventListener(t, kick, { passive: true }))
    return () => evs.forEach((t) => window.removeEventListener(t, kick))
  }, [])

  // Opening hand-off: start the music + films (first gesture) then glide down.
  const onBegin = useCallback(() => {
    // Sound + films start immediately (called straight from the opening tap, so
    // this runs inside the user gesture — the music is instant). Only the
    // downward glide waits, letting the portal finish opening first.
    try { play() } catch { /* autoplay may be blocked; the button stays */ }
    playAllVideos()
    window.setTimeout(
      () => window.scrollTo({ top: Math.round(window.innerHeight * 0.96), behavior: 'smooth' }),
      1000,
    )
  }, [play])

  const replay = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  const ctx = useMemo(() => ({ config, M, replay }), [config, M, replay])

  return (
    <ExperienceContext.Provider value={ctx}>
      <div className="xp" data-religion={religion} style={paletteVars(config.palette)}>
        <Particles variant={M.meta.particle} className="xp__particles" />
        <ScrollProgress variant={M.meta.progress} />
        <MusicToggle />

        <main className="xp__scenes">
          {config.scenes.map((s, i) => {
            const Comp = SCENES[s.type]
            if (!Comp) return null
            const node = <Comp onBegin={s.type === 'opening' ? onBegin : undefined} />
            if (TRANSITION_BEFORE.has(s.type)) {
              return (
                <div className="xp__seq" key={`${s.type}-${i}`}>
                  <SceneTransition variant={M.meta.transition} />
                  {node}
                </div>
              )
            }
            return <div className="xp__seq" key={`${s.type}-${i}`}>{node}</div>
          })}
        </main>
      </div>
    </ExperienceContext.Provider>
  )
}
