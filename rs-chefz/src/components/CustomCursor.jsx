import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef();
  const label = useRef();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const cur = { x: pos.x, y: pos.y };
    let raf;

    const move = (e) => {
      pos.x = e.clientX; pos.y = e.clientY;
      const t = e.target.closest('[data-cursor], a, button');
      const active = !!t;
      dot.current?.classList.toggle('is-active', active);
      const l = t?.getAttribute?.('data-cursor');
      if (label.current) {
        label.current.textContent = l && l !== 'true' ? l : '';
        label.current.classList.toggle('is-active', !!(l && l !== 'true'));
      }
    };
    const loop = () => {
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      if (dot.current) dot.current.style.transform = `translate(${cur.x}px, ${cur.y}px) translate(-50%,-50%)`;
      if (label.current) label.current.style.transform = `translate(${cur.x}px, ${cur.y + 40}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    loop();
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" aria-hidden="true" />
      <div ref={label} className="cursor__label" aria-hidden="true" />
    </>
  );
}
