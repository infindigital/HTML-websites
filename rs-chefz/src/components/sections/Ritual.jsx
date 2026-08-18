import { useEffect, useRef } from 'react';
import { process } from '../../data/content.js';

/** Scroll-pinned three-step sequence: 01 Blend / 02 Rest / 03 Fry. */
export default function Ritual() {
  const root = useRef();

  useEffect(() => {
    const steps = root.current.querySelectorAll('.ritual__step');
    const dots = root.current.querySelectorAll('.ritual__dot');
    const onScroll = () => {
      const rect = root.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(Math.max(-rect.top / total, 0), 0.999);
      const active = Math.floor(p * steps.length);
      steps.forEach((s, i) => s.classList.toggle('is-active', i === active));
      dots.forEach((d, i) => d.classList.toggle('is-on', i === active));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="ritual" className="ritual veil--solid" data-pose="ritual" aria-label="The ritual" ref={root}>
      <div className="ritual__pin">
        <p className="t-label t-muted" style={{ marginBottom: 30 }}>The Ritual &mdash; Three steps, zero guesswork</p>
        <div className="ritual__steps">
          {process.map((s) => (
            <div className="ritual__step" key={s.index}>
              <span className="ritual__num">{s.index}</span>
              <h2 className="ritual__word">{s.title}</h2>
              <p className="t-body ritual__body t-muted">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="ritual__rail" aria-hidden="true">
          {process.map((s) => <span className="ritual__dot" key={s.index} />)}
        </div>
      </div>
    </section>
  );
}
