// Reusable arched "mihrab" frame: a thin gold double-line border with a
// small diamond finial at top-center and bottom-center. Wrap most sections.

export default function ArchFrame({ children, className = '', tag = 'div', ...rest }) {
  const Tag = tag
  return (
    <Tag className={`arch ${className}`} {...rest}>
      <span className="arch__border arch__border--outer" aria-hidden="true" />
      <span className="arch__border arch__border--inner" aria-hidden="true" />
      <span className="arch__finial arch__finial--top" aria-hidden="true" />
      <span className="arch__finial arch__finial--bottom" aria-hidden="true" />
      <div className="arch__content">{children}</div>
    </Tag>
  )
}
