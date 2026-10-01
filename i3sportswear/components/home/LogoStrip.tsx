"use client";

import { useEffect, useRef } from "react";
import { Arrow, Img } from "./ui";
import { clients } from "@/config/content";

const SPEED = 40; // px per second while gliding
const IDLE = 2500; // ms after a manual scroll before gliding resumes

/**
 * Client logos on an endless strip that glides on its own and can also be
 * scrolled by hand everywhere: swipe on touch screens, drag or trackpad on
 * desktop, or the arrow buttons. Any manual scroll pauses the glide for a
 * moment; hovering pauses it too. Under reduced motion it never glides.
 */
export default function LogoStrip() {
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setWidth = () => el.scrollWidth / 3; // three identical sets
    let pos = 0;
    let last = 0;
    let raf = 0;
    let hover = false;
    let onScreen = true;
    let resumeAt = 0;

    const wrap = () => {
      const w = setWidth();
      if (pos >= 2 * w) pos -= w;
      else if (pos < w * 0.5) pos += w;
    };
    const place = () => {
      el.scrollLeft = pos;
    };
    const start = () => {
      pos = setWidth();
      place();
    };

    const frame = (t: number) => {
      const dt = last ? Math.min(64, t - last) / 1000 : 0;
      last = t;
      if (!hover && onScreen && !reduce.matches && t >= resumeAt) {
        pos += SPEED * dt;
        wrap();
        place();
      }
      raf = requestAnimationFrame(frame);
    };

    // Manual scrolling (swipe, wheel, trackpad, keyboard, arrow buttons).
    const onScroll = () => {
      // Our own glide lands within a pixel of `pos`; anything else is the visitor.
      if (Math.abs(el.scrollLeft - pos) < 1.5) return;
      pos = el.scrollLeft;
      const before = pos;
      wrap();
      if (pos !== before) place();
      resumeAt = performance.now() + IDLE;
    };
    const holdOn = () => (resumeAt = performance.now() + IDLE);

    // Mouse drag on desktop.
    let dragX: number | null = null;
    let dragFrom = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragX = e.clientX;
      dragFrom = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (dragX === null) return;
      el.scrollLeft = dragFrom - (e.clientX - dragX);
    };
    const up = () => {
      dragX = null;
      el.style.cursor = "";
      holdOn();
    };

    const io = new IntersectionObserver(([e]) => (onScreen = e.isIntersecting));
    io.observe(el);
    const enter = (e: PointerEvent) => e.pointerType === "mouse" && (hover = true);
    const leave = () => (hover = false);

    start();
    raf = requestAnimationFrame(frame);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", holdOn, { passive: true });
    el.addEventListener("wheel", holdOn, { passive: true });
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("resize", start);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", holdOn);
      el.removeEventListener("wheel", holdOn);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", start);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = strip.current;
    if (el) el.scrollBy({ left: dir * Math.max(220, el.clientWidth * 0.5), behavior: "smooth" });
  };

  const set = (copy: number) => (
    <ul key={copy} aria-hidden={copy !== 1 || undefined} className="flex shrink-0 items-center gap-14 pr-14 lg:gap-24 lg:pr-24">
      {clients.map((c) => (
        <li key={c.name} className="shrink-0">
          <Img
            src={c.src}
            alt={copy === 1 ? c.name : ""}
            width={520}
            height={164}
            draggable={false}
            className="h-12 w-auto object-contain transition-transform duration-500 select-none hover:scale-105 lg:h-16"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative mt-10">
      <div
        ref={strip}
        role="region"
        aria-label="Client logos, scroll sideways"
        tabIndex={0}
        className="no-scrollbar flex cursor-grab overflow-x-auto overscroll-x-contain [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
      >
        {[0, 1, 2].map(set)}
      </div>
      <div className="shell mt-6 flex justify-end gap-2">
        <button type="button" onClick={() => nudge(-1)} aria-label="Scroll logos back" className="flex h-11 w-11 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
          <Arrow className="rotate-180" />
        </button>
        <button type="button" onClick={() => nudge(1)} aria-label="Scroll logos forward" className="flex h-11 w-11 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
          <Arrow />
        </button>
      </div>
    </div>
  );
}
