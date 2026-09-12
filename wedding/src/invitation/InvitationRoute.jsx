import { Link, Navigate, useParams } from 'react-router-dom'
import { ThemeProvider } from '../context/ThemeContext.jsx'
import { LanguageProvider } from '../context/LanguageContext.jsx'
import { AudioProvider } from '../context/AudioContext.jsx'
import { InvitationProvider } from '../context/InvitationContext.jsx'
import InvitationExperience from './InvitationExperience.jsx'
import { getTemplate } from '../studio/templates.js'
import { templateOrderUrl } from '../studio/whatsapp.js'
import { cssVars, getTheme } from '../studio/themes.js'

// Renders the live cinematic invitation for a template. Only Muslim templates
// currently drive the engine (its visual language is Islamic — see spec: never
// mix religious symbols). Other categories show a "coming soon" preview until
// their own videos/engines are supplied.
export default function InvitationRoute() {
  const { category, slug } = useParams()
  const template = getTemplate(category, slug)

  if (!template) return <Navigate to="/" replace />

  const back = (
    <Link to={template.href} className="invite-back" aria-label="Back to template">
      ← Back
    </Link>
  )

  if (template.engine === 'muslim') {
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

  // Non-engine categories: themed placeholder until a preview video is added.
  const theme = getTheme(template.category)
  return (
    <div className="invite-soon" data-religion={template.category} style={cssVars(template.category)}>
      {back}
      <div className="invite-soon__inner">
        <span className="invite-soon__symbol" aria-hidden="true">{theme.symbol}</span>
        <p className="invite-soon__eyebrow">{theme.label} · {template.subtitle}</p>
        <h1 className="invite-soon__title">{template.title}</h1>
        <p className="invite-soon__desc">{template.description}</p>
        <p className="invite-soon__note">
          A full cinematic preview for this design is on its way. Meanwhile, you
          can reserve it and we’ll personalise it with your names.
        </p>
        <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
          Order on WhatsApp
        </a>
      </div>
    </div>
  )
}
