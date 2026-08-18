import { brand } from '../../data/content.js';

export default function Hero() {
  return (
    <header id="intro" className="hero" data-pose="intro">
      <p className="t-label hero__eyebrow reveal" data-reveal>Authentic Flavour</p>
      <h1 className="hero__wordmark reveal" data-reveal>
        RS Chef&rsquo;<em>z</em>
      </h1>
      <p className="t-body hero__sub t-muted reveal" data-reveal>Crafted to perfection.</p>

      <div className="hero__micro" aria-hidden="true">
        <div className="micro">
          <span className="t-label micro__k">01 / 02</span>
          <span className="t-label micro__v">Product Experience</span>
        </div>
        <div className="micro micro--r">
          <span className="t-label micro__k">Interactive</span>
          <span className="t-label micro__v">Drag to rotate</span>
        </div>
      </div>
    </header>
  );
}
