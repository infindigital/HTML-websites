import { templatePrice } from '../../studio/templates.js'
import { templateOrderUrl } from '../../studio/whatsapp.js'
import { cssVars } from '../../studio/themes.js'

export default function TemplateCard({ template, onPreview }) {
  const price = templatePrice(template)
  return (
    <article className="card" data-theme-id={template.theme} style={cssVars(template.theme)}>
      <button type="button" className="card__media" onClick={() => onPreview(template)} aria-label={`Preview ${template.title}`}>
        <img
          className="card__poster"
          src={template.poster}
          alt={`${template.title}, ${template.subtitle} wedding invitation`}
          loading="lazy"
          decoding="async"
        />
        <span className="card__play"><span className="card__play-icon" aria-hidden="true">▶</span> Watch invitation</span>
      </button>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{template.title}</h3>
          <span className="card__price">{price.display}</span>
        </div>
        <p className="card__sub">{template.subtitle}</p>
        <p className="card__meta">
          <span>♫ {template.music.title}</span>
          <span className="card__dot">•</span>
          <span>{template.duration}</span>
        </p>
        <div className="card__actions">
          <button type="button" className="btn btn--ghost" onClick={() => onPreview(template)}>Preview</button>
          <a className="btn btn--gold" href={templateOrderUrl(template)} target="_blank" rel="noreferrer">
            Order · {price.display}
          </a>
        </div>
      </div>
    </article>
  )
}
