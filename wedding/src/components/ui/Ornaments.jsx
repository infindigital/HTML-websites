// Small decorative flourishes shared across sections.

// Ornate "&" divider: gold hairlines flanking a large italic ampersand.
export function AmpersandDivider({ className = '' }) {
  return (
    <div className={`amp-divider ${className}`} aria-hidden="true">
      <span className="amp-divider__line" />
      <span className="amp-divider__diamond" />
      <span className="amp-divider__amp">&amp;</span>
      <span className="amp-divider__diamond" />
      <span className="amp-divider__line" />
    </div>
  )
}

// A short centered gold rule with a diamond at its middle — used under eyebrows.
export function Flourish({ className = '' }) {
  return (
    <span className={`flourish ${className}`} aria-hidden="true">
      <span className="flourish__line" />
      <span className="flourish__diamond" />
      <span className="flourish__line" />
    </span>
  )
}

// A laurel-wreath ring enclosing children (used in the closing monogram).
export function Laurel({ children }) {
  return (
    <div className="laurel">
      <svg className="laurel__svg" viewBox="0 0 200 200" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          {/* left branch */}
          <path d="M100 182 C68 182 44 158 40 120" />
          {/* right branch */}
          <path d="M100 182 C132 182 156 158 160 120" />
          {leaves(false)}
          {leaves(true)}
        </g>
      </svg>
      <div className="laurel__inner">{children}</div>
    </div>
  )
}

// Generate a row of small laurel leaves along each branch.
function leaves(right) {
  const items = []
  const pts = [
    { x: 43, y: 118, r: -35 },
    { x: 41, y: 100, r: -20 },
    { x: 44, y: 82, r: -5 },
    { x: 51, y: 66, r: 12 },
    { x: 61, y: 53, r: 28 },
  ]
  pts.forEach((p, i) => {
    const x = right ? 200 - p.x : p.x
    const rot = right ? 180 - p.r : p.r
    items.push(
      <ellipse
        key={(right ? 'r' : 'l') + i}
        cx={x}
        cy={p.y}
        rx="7"
        ry="3.4"
        transform={`rotate(${rot} ${x} ${p.y})`}
      />,
    )
  })
  return items
}
