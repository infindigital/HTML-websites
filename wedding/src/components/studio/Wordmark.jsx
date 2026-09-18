import studio from '../../studio/config.js'

// The IN/FIN Invite wordmark. The slash is the heart of the identity, so it is
// given its own muted accent tone. Data-driven from studio.brandName: the first
// token ("IN/FIN") is the mark, the remainder ("Invite") the lighter sub-word.
export default function Wordmark({ className = '' }) {
  const [markRaw, ...restArr] = studio.brandName.split(' ')
  const sub = restArr.join(' ')
  const parts = markRaw.split('/')
  return (
    <span className={`wordmark ${className}`}>
      <span className="wordmark__mark">
        {parts.map((p, i) => (
          <span key={i}>
            {p}
            {i < parts.length - 1 && <span className="wordmark__slash" aria-hidden="true">/</span>}
          </span>
        ))}
      </span>
      {sub && <span className="wordmark__sub">{sub}</span>}
    </span>
  )
}
