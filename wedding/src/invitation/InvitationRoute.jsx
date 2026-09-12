import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { LanguageProvider } from '../context/LanguageContext.jsx'
import { AudioProvider } from '../context/AudioContext.jsx'
import { InvitationProvider } from '../context/InvitationContext.jsx'
import InvitationExperience from './InvitationExperience.jsx'
import { getTemplate } from '../studio/templates.js'
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

  if (template.engine === 'live') {
    return (
      <InvitationProvider template={template}>
        <ThemeProvider>
          <LanguageProvider>
            <AudioProvider>
              {back}
              <InvitationExperience />
            </AudioProvider>
          </LanguageProvider>
        </ThemeProvider>
      </InvitationProvider>
    )
  }

  // Designs without a live engine yet — themed placeholder + order CTA.
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
          Order · ₹499
        </a>
      </div>
    </div>
  )
}
