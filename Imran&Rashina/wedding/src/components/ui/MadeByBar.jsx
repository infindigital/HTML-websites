import logoUrl from '../../assets/infin-logo.png'

// Small persistent credit badge shown on every device, pinned bottom-right.
// "Powered by" + the IN/FIN wordmark; the whole badge links to IN/FIN Invite.
export default function MadeByBar() {
  return (
    <a
      className="madeby-bar"
      href="https://invite.infindigital.net/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Powered by IN/FIN Invite"
    >
      <span className="madeby-bar__label">Powered by</span>
      <img className="madeby-bar__logo" src={logoUrl} alt="IN/FIN" width="376" height="160" />
    </a>
  )
}
