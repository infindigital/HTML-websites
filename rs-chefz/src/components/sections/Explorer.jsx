export default function Explorer() {
  return (
    <section id="explore" className="section" data-pose="explore" aria-label="Explore the pack">
      <div className="explorer">
        <div className="explorer__spacer" aria-hidden="true" />
        <p className="t-label t-muted reveal" data-reveal>Inspect</p>
        <h2 className="t-heading reveal" data-reveal>Turn it in your hand.</h2>
        <p className="explorer__hint t-label" data-cursor="Drag">Drag to explore &mdash; front, side, back</p>
      </div>
    </section>
  );
}
