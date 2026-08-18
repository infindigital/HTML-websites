/** Reused for both single-product reveal sections. */
export default function ProductFocus({ id, pose, side = 'left', index, title, sub, body, labels }) {
  return (
    <section id={id} className="section" data-pose={pose} aria-label={title}>
      <div className={`focus${side === 'right' ? ' focus--right' : ''}`}>
        <div className="focus__meta reveal" data-reveal>
          <span className="t-label focus__index">{index}</span>
          <h2 className="t-display">{title}</h2>
          <p className="t-heading-sm t-ember">{sub}</p>
          <p className="t-body t-muted">{body}</p>
          <div className="labels" style={{ width: '100%' }}>
            {labels.map((l, i) => (
              <div className="labels__row" key={l}>
                <span className="t-label labels__i">{String(i + 1).padStart(2, '0')}</span>
                <span className="labels__n">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="focus__spacer" aria-hidden="true" />
      </div>
    </section>
  );
}
