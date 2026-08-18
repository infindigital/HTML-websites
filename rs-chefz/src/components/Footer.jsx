import { AMAZON_URL, certs } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">RS Chef&rsquo;z</div>
      <hr className="divider" />
      <div className="footer__grid">
        <div className="footer__col">
          <span className="t-muted">Products</span>
          <a href="#gobi">Gobi Manchurian</a>
          <a href="#threeInOne">3 in 1</a>
        </div>
        <div className="footer__col">
          <span className="t-muted">Shop</span>
          <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer">Amazon</a>
        </div>
        <div className="footer__col">
          <span className="t-muted">Certification</span>
          {certs.map((c) => <span key={c}>{c}</span>)}
        </div>
      </div>
      <div className="footer__legal">
        <span className="t-label t-muted">&copy; {new Date().getFullYear()} RS Chef&rsquo;z</span>
        <span className="t-label t-muted">Authentic Flavour. Crafted to Perfection.</span>
      </div>
    </footer>
  );
}
