import { useEffect, useRef } from 'react';
import { promises, certs } from '../../data/content.js';

export default function Promise() {
  const root = useRef();
  useEffect(() => {
    const lines = root.current.querySelectorAll('.promise__line');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-in')),
      { threshold: 0.6 }
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);
  return (
    <section id="promise" className="section veil--solid" data-pose="promise" aria-label="The promise" ref={root}>
      <p className="t-label t-muted" style={{ marginBottom: 30 }}>The Promise &mdash; Printed on every pack, kept in every batch</p>
      {promises.map((p) => (
        <h2 className="promise__line" key={p}>{p}</h2>
      ))}
      <div className="promise__certs">
        {certs.map((c) => <span className="t-label" key={c}>{c}</span>)}
      </div>
    </section>
  );
}
