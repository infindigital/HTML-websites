import { Link } from 'react-router-dom'
import { CATEGORY_ORDER, getTheme, cssVars } from '../../studio/themes.js'
import { countByCategory } from '../../studio/templates.js'

export default function CategoryTiles() {
  return (
    <div className="tiles">
      {CATEGORY_ORDER.map((key) => {
        const theme = getTheme(key)
        return (
          <Link
            key={key}
            to={`/${key}`}
            className="tile"
            data-religion={key}
            style={cssVars(key)}
          >
            <span className="tile__symbol" aria-hidden="true">{theme.symbol}</span>
            <span className="tile__count">{countByCategory(key)} designs</span>
            <h3 className="tile__name">{theme.label}</h3>
            <p className="tile__desc">{theme.blurb}</p>
            <span className="tile__cta">Explore collection →</span>
          </Link>
        )
      })}
    </div>
  )
}
