import { useMemo, useState } from 'react'
import StudioLayout from '../components/studio/StudioLayout.jsx'
import TemplateGrid from '../components/studio/TemplateGrid.jsx'
import { TEMPLATES, STYLE_TAGS } from '../studio/templates.js'
import { CATEGORY_ORDER, getTheme } from '../studio/themes.js'

const CAT_FILTERS = ['all', ...CATEGORY_ORDER]

export default function Collection() {
  const [category, setCategory] = useState('all')
  const [tag, setTag] = useState('all')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const okCat = category === 'all' || t.category === category
      const okTag = tag === 'all' || t.tags.includes(tag)
      const hay = [
        t.title, t.subtitle, t.category, t.description,
        ...t.tags, t.demoCouple.groom, t.demoCouple.bride,
      ].join(' ').toLowerCase()
      const okQ = !q || hay.includes(q)
      return okCat && okTag && okQ
    })
  }, [category, tag, query])

  return (
    <StudioLayout>
      <section className="collhero">
        <div className="wrap">
          <p className="sec__eyebrow">The full collection</p>
          <h1 className="collhero__title">Find your invitation</h1>
          <p className="sec__lead">Filter by tradition and style, or search a mood — “emerald”, “minimal”, “floral”, “luxury”.</p>

          <div className="search">
            <span className="search__icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              className="search__input"
              placeholder="Find your invitation…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search invitations"
            />
          </div>

          <div className="filters">
            <div className="filters__group" role="group" aria-label="Filter by tradition">
              {CAT_FILTERS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${category === c ? 'is-active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c === 'all' ? 'All' : getTheme(c).label}
                </button>
              ))}
            </div>
            <div className="filters__group" role="group" aria-label="Filter by style">
              <button
                type="button"
                className={`chip chip--tag ${tag === 'all' ? 'is-active' : ''}`}
                onClick={() => setTag('all')}
              >
                All styles
              </button>
              {STYLE_TAGS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`chip chip--tag ${tag === s ? 'is-active' : ''}`}
                  onClick={() => setTag(s)}
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <p className="collhero__count">{results.length} {results.length === 1 ? 'design' : 'designs'}</p>
        </div>
      </section>

      <section className="sec sec--tight">
        <div className="wrap">
          <TemplateGrid templates={results} />
        </div>
      </section>
    </StudioLayout>
  )
}
