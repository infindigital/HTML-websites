export default function Lineup() {
  return (
    <section id="products" className="section" data-pose="products" aria-label="The lineup">
      <div className="trio">
        <div className="trio__col reveal" data-reveal>
          <p className="t-label t-muted">The Lineup</p>
          <h2 className="t-heading">Two packs.<br />Every favourite.</h2>
        </div>
        <div className="trio__center" aria-hidden="true" />
        <div className="trio__col trio__col--r reveal" data-reveal>
          <p className="t-body t-muted">
            Two signature blends designed to bring restaurant-style flavour into everyday cooking.
          </p>
          <div className="labels" style={{ width: '100%' }}>
            <div className="labels__row"><span className="t-label labels__i">01</span><span className="labels__n">Gobi Manchurian Masala</span></div>
            <div className="labels__row"><span className="t-label labels__i">02</span><span className="labels__n">3 in 1 Masala</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
