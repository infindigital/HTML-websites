import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import PreviewModal from '../components/studio/PreviewModal.jsx'
import { getTemplate, byCategory, templatePrice } from '../studio/templates.js'
import { getTheme, cssVars } from '../studio/themes.js'
import { templateOrderUrl } from '../studio/whatsapp.js'

const FEATURES = [
  'Cinematic motion & lighting',
  'Original music included',
  'Personalised names, date & venue',
  'Beautiful on mobile & desktop',
  'Shareable link — send on WhatsApp',
]

export default function TemplateDetail() {
  const { category, slug } = useParams()
  const template = getTemplate(category, slug)
  const [preview, setPreview] = useState(false)

  if (!template) return <Navigate to="/" replace />

  const theme = getTheme(category)
  const price = templatePrice(template)
  const related = byCategory(category).filter((t) => t.id !== template.id).slice(0, 3)

  return (
    <StudioLayout waHref={templateOrderUrl(template)}>
      <div data-religion={category} style={cssVars(category)}>
        <section className="detail">
          <div className="wrap detail__grid">
            <div className="detail__media">
              <img className="detail__poster" src={template.poster} alt={`${template.title} — ${theme.label} wedding invitation`} />
              <button type="button" className="detail__play" onClick={() => setPreview(true)}>
                <span aria-hidden="true">▶</span> Watch invitation
              </button>
            </div>

            <div className="detail__info">
              <p className="detail__eyebrow">
                <Link to={`/${category}`}>{theme.symbol} {theme.label}</Link> · {template.subtitle}
              </p>
              <h1 className="detail__title">{template.title}</h1>
              <p className="detail__desc">{template.description}</p>

              <div className="detail__price">
                <span className="detail__price-amt">{price.display}</span>
                <span className="detail__price-tier">{price.label} design</span>
              </div>

              <p className="detail__meta">
                <span>♫ {template.music.title}</span>
                <span className="card__dot">•</span>
                <span>{template.duration}</span>
              </p>

              <ul className="detail__features">
                {FEATURES.map((f) => (
                  <li key={f}><span aria-hidden="true">✦</span> {f}</li>
                ))}
              </ul>

              <div className="detail__actions">
                <a className="btn btn--gold btn--lg" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
                  Order this invitation
                </a>
                {template.engine === 'muslim' ? (
                  <Link className="btn btn--ghost btn--lg" to={template.inviteHref}>
                    Open live experience
                  </Link>
                ) : (
                  <button type="button" className="btn btn--ghost btn--lg" onClick={() => setPreview(true)}>
                    Preview
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="sec">
            <div className="wrap">
              <div className="sec__head sec__head--row">
                <h2 className="sec__title">More {theme.label} designs</h2>
                <Link to={`/${category}`} className="sec__more">View all →</Link>
              </div>
              <TemplateGrid templates={related} />
            </div>
          </section>
        )}
      </div>

      {preview && <PreviewModal template={template} onClose={() => setPreview(false)} />}
    </StudioLayout>
  )
}
