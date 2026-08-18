import { story } from '../../data/content.js';

export default function Story() {
  return (
    <section id="story" className="section veil--solid" data-pose="story" aria-label="Brand story">
      <div className="story">
        <div className="reveal" data-reveal>
          <p className="t-label t-muted" style={{ marginBottom: 24 }}>{story.label}</p>
          <h2 className="story__big">{story.heading}</h2>
          <div className="story__note">
            {story.body.map((b) => <p className="t-body t-muted" key={b}>{b}</p>)}
          </div>
        </div>
        <aside className="story__aside reveal" data-reveal>
          <p className="t-label t-muted">Origin</p>
          <p className="t-heading-sm">Mangaluru, India</p>
          <hr className="divider divider--dashed" />
          <p className="t-label t-muted">Craft</p>
          <p className="t-heading-sm">Blended the way chefs blend</p>
        </aside>
      </div>
    </section>
  );
}
