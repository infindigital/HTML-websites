// Reusable arched "mihrab" frame: a tall pointed ogee crown (SVG) that rises
// to a diamond finial, sitting on straight double-lined gold walls with a
// second finial at the base. Wrap most sections.

export default function ArchFrame({ children, className = '', tag = 'div', ...rest }) {
  const Tag = tag
  return (
    <Tag className={`arch ${className}`} {...rest}>
      {/* pointed ogee crown — scales with the frame's width */}
      <svg className="arch__crown" viewBox="0 0 100 20" aria-hidden="true">
        <path
          className="arch__crown-line"
          d="M0,20 C2,7 40,7 50,0 C60,7 98,7 100,20"
        />
      </svg>
      <span className="arch__finial arch__finial--top" aria-hidden="true" />

      {/* straight walls + base, double-lined */}
      <div className="arch__body">
        <span className="arch__body-inner" aria-hidden="true" />
        <div className="arch__content">{children}</div>
      </div>
      <span className="arch__finial arch__finial--bottom" aria-hidden="true" />
    </Tag>
  )
}
