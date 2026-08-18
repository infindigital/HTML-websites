import { AMAZON_URL } from '../../data/content.js';

export default function Shop() {
  return (
    <section id="shop" className="section" data-pose="shop" aria-label="Shop">
      <div className="shop">
        <p className="t-label t-muted reveal" data-reveal>Bring the restaurant home</p>
        <h2 className="t-display reveal" data-reveal>Two packs.<br />Every favourite.</h2>
        <div className="shop__actions reveal" data-reveal>
          <a className="btn btn--solid" href={AMAZON_URL} target="_blank" rel="noopener noreferrer" data-cursor="Shop">Shop on Amazon</a>
          <a className="btn" href="#products" data-cursor="View">Explore Products</a>
        </div>
      </div>
    </section>
  );
}
