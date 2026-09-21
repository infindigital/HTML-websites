import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { LanguageProvider } from '../context/LanguageContext.jsx'
import { AudioProvider } from '../context/AudioContext.jsx'
import { InvitationProvider } from '../context/InvitationContext.jsx'
import ImmersiveExperience from '../experience/ImmersiveExperience.jsx'
import ExperienceBoundary from '../experience/ExperienceBoundary.jsx'
import { configFor } from '../experience/configs/index.js'
import { getTemplate, templatePrice } from '../studio/templates.js'
import { templateOrderUrl } from '../studio/whatsapp.js'
import { cssVars } from '../studio/themes.js'

// Override the invitation engine's CSS variables so each template gets its own
// colour world (e.g. emerald vs midnight), then restore on unmount.
function useEngineSkin(skin) {
  useEffect(() => {
    if (!skin) return undefined
    const root = document.documentElement
    const prev = {}
    Object.entries(skin).forEach(([k, v]) => {
      prev[k] = root.style.getPropertyValue(k)
      root.style.setProperty(k, v)
    })
    return () => {
      Object.keys(skin).forEach((k) => {
        if (prev[k]) root.style.setProperty(k, prev[k])
        else root.style.removeProperty(k)
      })
    }
  }, [skin])
}

export default function InvitationRoute() {
  const { slug } = useParams()
  const template = getTemplate(slug)
  useEngineSkin(template?.engine === 'live' ? template.engineSkin : null)

  if (!template) return <Navigate to="/" replace />

  const back = (
    <Link to="/" className="invite-back" aria-label="Back to studio">← Back</Link>
  )

  // Designs that ship as their own build (e.g. the seal keepsake) are shown
  // full-screen in an embed, so the studio link style (/invite/<slug>) applies.
  if (template.embedUrl) {
    return (
      <div className="invite-embed">
        {back}
        <iframe
          className="invite-embed__frame"
          src={template.embedUrl}
          title={`${template.title} — wedding invitation`}
          allow="autoplay; fullscreen"
        />
      </div>
    )
  }

  // Each religion has its own track + start time (see the config `music`).
  const music = configFor(template.religion)?.music
  const musicSrc = typeof music === 'string' ? music : music?.src
  const musicStart = music && typeof music === 'object' ? music.start : undefined

  if (template.engine === 'live') {
    return (
      <ExperienceBoundary>
        <InvitationProvider template={template}>
          <ThemeProvider>
            <LanguageProvider>
              <AudioProvider src={musicSrc} startOffset={musicStart}>
                {back}
                <ImmersiveExperience template={template} />
              </AudioProvider>
            </LanguageProvider>
          </ThemeProvider>
        </InvitationProvider>
      </ExperienceBoundary>
    )
  }

  // Designs without a live engine yet - themed placeholder + order CTA.
  return (
    <div className="invite-soon" data-theme-id={template.theme} style={cssVars(template.theme)}>
      {back}
      <div className="invite-soon__inner">
        <span className="invite-soon__mark" aria-hidden="true">✦</span>
        <p className="invite-soon__eyebrow">{template.subtitle}</p>
        <h1 className="invite-soon__title">{template.title}</h1>
        <p className="invite-soon__desc">{template.description}</p>
        <p className="invite-soon__note">
          A full cinematic preview for this design is on its way. Reserve it now
          and we’ll personalise it with your names.
        </p>
        <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
          Order · {templatePrice(template).display}
        </a>
      </div>
    </div>
  )
}
