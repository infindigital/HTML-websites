import { AMAZON_URL } from '../../data/content.js';

export default function Final() {
  return (
    <section id="final" className="section" data-pose="final" aria-label="Authentic flavour">
      <div className="final">
        <h2 className="final__title reveal" data-reveal>Authentic Flavour.<br />Crafted to Perfection.</h2>
        <a className="btn btn--solid reveal" data-reveal href={AMAZON_URL} target="_blank" rel="noopener noreferrer" data-cursor="Shop">Shop on Amazon</a>
      </div>
    </section>
  );
}
