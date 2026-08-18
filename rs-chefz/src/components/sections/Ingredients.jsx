import { ingredients } from '../../data/content.js';

export default function Ingredients() {
  return (
    <section id="ingredients" className="section veil--solid" data-pose="ingredients" aria-label="Ingredients">
      <div className="ingredients__head">
        <div className="reveal" data-reveal>
          <p className="t-label t-muted">Behind the Flavour</p>
          <h2 className="t-heading">Real spice.<br />Nothing hidden.</h2>
        </div>
        <p className="t-body t-muted reveal" data-reveal style={{ maxWidth: '34ch' }}>
          Chilli, turmeric, ginger and natural spices &mdash; blended the way chefs blend, with no artificial colour in the pack or on the plate.
        </p>
      </div>
      <div className="ingredients__grid">
        {ingredients.map((ing) => (
          <figure className="ing reveal" data-reveal key={ing.id}>
            <img src={ing.img} alt={`${ing.name} used in RS Chef'z masala`} loading="lazy" decoding="async" />
            <figcaption className="t-label ing__cap">{ing.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
