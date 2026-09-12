import { Link } from 'react-router-dom'
import studio from '../../studio/config.js'
import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars, getTheme } from '../../studio/themes.js'

const BADGE_LABEL = { new: 'New', popular: 'Popular' }

export default function TemplateCard({ template, onPreview }) {
  const price = templatePrice(template)
  const theme = getTheme(template.category)

  return (
    <article
      className="card"
      data-religion={template.category}
      style={cssVars(template.category)}
    >
      <div className="card__media">
        <Link to={template.href} className="card__poster-link" aria-label={`View ${template.title}`}>
          <img
            className="card__poster"
            src={template.poster}
            alt={`${template.title} — ${theme.label} wedding invitation`}
            loading="lazy"
            decoding="async"
          />
        </Link>
        {template.badge && (
          <span className="card__badge">{BADGE_LABEL[template.badge] || template.badge}</span>
        )}
        <span className="card__cat">{theme.symbol} {theme.label}</span>
        <button type="button" className="card__play" aria-label={`Preview ${template.title}`} onClick={() => onPreview(template)}>
          <span className="card__play-icon" aria-hidden="true">▶</span>
          Watch invitation
        </button>
      </div>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{template.title}</h3>
          <span className="card__price">
            {studio.priceShowsStartingFrom ? 'From ' : ''}{price.display}
          </span>
        </div>
        <p className="card__sub">{template.subtitle}</p>
        <p className="card__meta">
          <span>♫ {template.music.title}</span>
          <span className="card__dot">•</span>
          <span>{template.duration}</span>
        </p>
        <div className="card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => onPreview(template)}>
            Preview
          </button>
          <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
            Order
          </a>
        </div>
      </div>
    </article>
  )
}
