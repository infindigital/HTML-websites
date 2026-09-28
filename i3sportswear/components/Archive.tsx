"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Lines } from "./ui";
import { jerseySrc, jerseys } from "@/lib/products";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

/**
 * 08: The iTHREE archive. Every supplied kit as an editorial plate in a
 * horizontal gallery: native scroll (touch, trackpad, keyboard) plus mouse
 * drag and step buttons on desktop.
 */
export default function Archive() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => setProgress(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth));
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-archive-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: "[data-archive-title]", start: "top 85%" } },
        );
        gsap.from("[data-plate]", {
          x: 80,
          autoAlpha: 0,
          stagger: 0.07,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: rail.current, start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const plate = el.querySelector<HTMLElement>("[data-plate]");
    el.scrollBy({ left: dir * ((plate?.offsetWidth ?? 400) + 24) * 2, behavior: "smooth" });
  };

  return (
    <section id="archive" ref={root} aria-labelledby="archive-title" className="relative bg-coal py-28 lg:py-40">
      <div className="shell flex flex-wrap items-end justify-between gap-8">
        <div>
          <Eyebrow index="08">Work</Eyebrow>
          <h2 id="archive-title" data-archive-title className="display-lg mt-8">
            <Lines lines={["iTHREE", <>Archive<span className="text-gold-soft">.</span></>]} outer="js-hidden-line" />
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="eyebrow text-faint">
            <span className="text-bone">{String(jerseys.length).padStart(3, "0")}</span> kits
          </p>
          <div className="hidden gap-2 sm:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => step(dir)}
                aria-label={dir < 0 ? "Previous kits" : "Next kits"}
                disabled={dir < 0 ? progress <= 0.001 : progress >= 0.999}
                className="flex h-12 w-12 items-center justify-center ring-1 ring-bone/20 transition hover:bg-bone hover:text-ink disabled:pointer-events-none disabled:opacity-30"
              >
                <svg viewBox="0 0 16 16" aria-hidden className={`h-4 w-4 ${dir < 0 ? "rotate-180" : ""}`} fill="none">
                  <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        ref={rail}
        tabIndex={0}
        aria-label="Kit archive, scroll horizontally"
        data-cursor="drag"
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter)] select-none lg:mt-20 lg:snap-none lg:gap-6"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { down: true, x: e.clientX, left: rail.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          rail.current!.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current.down = false)}
        onPointerLeave={() => (drag.current.down = false)}
        onDragStart={(e) => e.preventDefault()}
      >
        {jerseys.map((j, i) => (
          <li
            key={j.slug}
            data-plate
            className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[clamp(300px,27vw,440px)]"
          >
            <figure>
              <div
                className={`relative aspect-[4/5] overflow-hidden ${
                  j.backdrop ? "bg-[#6f6f6f]" : "bg-[radial-gradient(70%_60%_at_50%_45%,#232322,#121212_70%)]"
                }`}
              >
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] group-hover:-translate-y-1.5">
                  <Image
                    src={jerseySrc(j.slug)}
                    alt={`iTHREE ${j.sport.toLowerCase()} kit, ${j.colourway.toLowerCase()}, front and back, archive ${String(i + 1).padStart(3, "0")}`}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 44vw, 78vw"
                    draggable={false}
                    className={j.backdrop ? "object-cover" : "object-contain p-[9%] drop-shadow-[0_24px_24px_rgba(0,0,0,0.55)]"}
                  />
                </div>
                <span aria-hidden className="absolute top-4 left-4 font-display text-xs tracking-[0.2em] text-bone/60 mix-blend-difference">
                  {String(i + 1).padStart(3, "0")}
                </span>
              </div>
              <figcaption className="mt-4 border-t border-bone/10 pt-4">
                <p className="eyebrow flex justify-between text-faint">
                  <span>
                    Archive <span className="text-bone transition-colors duration-500 group-hover:text-gold-soft">{String(i + 1).padStart(3, "0")}</span>
                  </span>
                  <span className="text-bone">{j.sport}</span>
                </p>
                <p className="mt-2 grid text-sm text-mute transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                  <span className="overflow-hidden">{j.colourway}, front &amp; back</span>
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="shell mt-10">
        <div className="relative h-px bg-bone/10">
          <span
            className="absolute inset-y-0 left-0 w-full origin-left bg-gold-soft transition-transform duration-300"
            style={{ transform: `scaleX(${0.08 + progress * 0.92})` }}
          />
        </div>
      </div>
    </section>
  );
}
