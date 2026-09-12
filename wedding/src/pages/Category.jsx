import { useParams } from 'react-router-dom'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import { byCategory } from '../studio/templates.js'
import { getTheme, cssVars } from '../studio/themes.js'
import { generalOrderUrl } from '../studio/whatsapp.js'

export default function Category() {
  const { category } = useParams()
  const theme = getTheme(category)
  const items = byCategory(category)

  return (
    <StudioLayout>
      <div data-religion={category} style={cssVars(category)}>
        <section className="cathero">
          <div className="cathero__bg" aria-hidden="true" />
          <div className="wrap cathero__content">
            <span className="cathero__symbol" aria-hidden="true">{theme.symbol}</span>
            <p className="cathero__eyebrow">{theme.label} Collection · {items.length} designs</p>
            <h1 className="cathero__title">{theme.label} Wedding Invitations</h1>
            <p className="cathero__lead">{theme.blurb}</p>
            <a className="btn btn--gold" href={generalOrderUrl()} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <TemplateGrid templates={items} />
          </div>
        </section>
      </div>
    </StudioLayout>
  )
}
