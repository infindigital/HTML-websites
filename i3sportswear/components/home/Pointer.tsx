"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Desktop pointer only (fine pointer, motion allowed): a small ink dot that
 * grows into a label over [data-cursor] elements ("View", "Shop"…), and
 * buttons marked [data-magnetic] that lean toward the pointer. Never on
 * touch devices or under reduced motion.
 */
export default function Pointer() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });
    let visible = false;
    let magnet: HTMLElement | null = null;

    const release = () => {
      if (magnet) gsap.to(magnet, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
      magnet = null;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        visible = true;
      }
      x(e.clientX);
      y(e.clientY);
      const t = e.target as HTMLElement;
      setLabel(t.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "");

      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        gsap.to(m, { x: (e.clientX - (r.left + r.width / 2)) * 0.18, y: (e.clientY - (r.top + r.height / 2)) * 0.25, duration: 0.4, ease: "power3.out" });
      }
    };
    const leave = () => {
      visible = false;
      release();
      gsap.to(el, { autoAlpha: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      release();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[100] opacity-0" style={{ visibility: "hidden" }}>
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color] duration-500 ease-[var(--ease-out-expo)] ${
          label ? "h-[76px] w-[76px] bg-ink" : "h-2 w-2 bg-ink"
        }`}
      >
        <span className={`label text-[0.62rem] text-white transition-opacity duration-300 ${label ? "opacity-100 delay-150" : "opacity-0"}`}>{label}</span>
      </div>
    </div>
  );
}
