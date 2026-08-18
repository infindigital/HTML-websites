import { useProgress } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ ready }) {
  const { progress } = useProgress();
  const [done, setDone] = useState(false);
  const fill = useRef();

  useEffect(() => {
    if (fill.current) fill.current.style.width = `${Math.max(progress, ready ? 100 : 0)}%`;
  }, [progress, ready]);

  useEffect(() => {
    if (ready && progress >= 100) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
  }, [ready, progress]);

  return (
    <div className={`loader${done ? ' is-done' : ''}`} aria-hidden={done}>
      <div className="loader__brand">RS Chef&rsquo;<span>z</span></div>
      <div className="loader__track"><div ref={fill} className="loader__fill" /></div>
      <div className="loader__meta">Loading Experience</div>
    </div>
  );
}
