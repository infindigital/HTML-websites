import studio from '../../studio/config.js'
import logo from '../../assets/infin-logo.png'

// The IN/FIN Invite wordmark. The "IN/FIN" mark is now the supplied brand
// logo image; the remaining word ("Invite") stays as a text sub-word beside
// it. Data-driven from studio.brandName for the sub-word.
export default function Wordmark({ className = '' }) {
  const [, ...restArr] = studio.brandName.split(' ')
  const sub = restArr.join(' ')
  return (
    <span className={`wordmark ${className}`}>
      <img className="wordmark__img" src={logo} alt="in/fin" draggable="false" />
      {sub && <span className="wordmark__sub">{sub}</span>}
    </span>
  )
}
