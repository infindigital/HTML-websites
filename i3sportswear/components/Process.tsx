"use client";

import { useRef, useState } from "react";
import { Eyebrow } from "./ui";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

const stages = [
  { title: "Discover", text: "We start with your team: the sport, the squad, your colours, your crest and the story the kit should tell." },
  { title: "Design", text: "Our designers turn that brief into a kit concept, with names, numbers and sponsor placements mapped out." },
  { title: "Approve", text: "You review the mockups and refine them with us before anything goes into production." },
  { title: "Produce", text: "Your approved design goes into production, kit by kit, player by player." },
  { title: "Play", text: "The kits arrive. Your team walks out wearing its identity." },
];

/**
 * 06 — From idea to kit. Vertical scroll drives a horizontal, gently
 * descending run of five stages; a gold rule fills as the active stage moves.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const distance = () => row.current!.scrollWidth - window.innerWidth;
        gsap.to(row.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: track.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(stages.length - 1, Math.round(self.progress * (stages.length - 1)));
              setActive((p) => (p === i ? p : i));
            },
          },
        });
        gsap.fromTo(
          "[data-process-fill]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: track.current, start: "top top", end: "bottom bottom", scrub: 0.6 } },
        );
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-process-vfill]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-process-list]", start: "top 70%", end: "bottom 70%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-process-item]").forEach((el) =>
          gsap.from(el, { x: 24, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%" } }),
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="process" ref={root} aria-label="From idea to kit" className="relative bg-ink">
      {/* Desktop */}
      <div ref={track} className="relative hidden h-[380vh] lg:block lg:motion-reduce:hidden">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-32 pb-16">
          <div className="shell flex items-end justify-between">
            <div>
              <Eyebrow index="06">Process</Eyebrow>
              <h2 className="display-md mt-6">
                From idea to kit<span className="text-gold-soft">.</span>
              </h2>
            </div>
            <p className="eyebrow text-faint">
              Stage <span className="text-bone">0{active + 1}</span> / 0{stages.length}
            </p>
          </div>

          <div className="shell mt-12">
            <div className="relative h-px bg-bone/10">
              <span data-process-fill className="absolute inset-0 origin-left bg-gold-soft" />
            </div>
          </div>

          <ol ref={row} className="mt-auto flex w-max items-start gap-[6vw] pr-[20vw] pl-[var(--gutter)] will-change-transform">
            {stages.map((s, i) => (
              <li
                key={s.title}
                className={`w-[38vw] max-w-[640px] transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-30"}`}
                style={{ transform: `translateY(${(i - 2) * -5}vh)` }}
              >
                <p aria-hidden className="font-display text-[12vw] leading-[0.8] font-semibold tracking-[-0.06em] text-bone/[0.07]">
                  0{i + 1}
                </p>
                <div className="-mt-[3vw] flex items-center gap-4">
                  <span
                    aria-hidden
                    className={`block h-px bg-gold-soft transition-[width] duration-700 ease-[var(--ease-out-expo)] ${i === active ? "w-12" : "w-0"}`}
                  />
                  <h3 className="display-md">{s.title}</h3>
                </div>
                <p className="lede mt-5 max-w-md">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Mobile, tablet, reduced motion */}
      <div className="shell py-28 lg:hidden lg:motion-reduce:block lg:motion-reduce:py-40">
        <Eyebrow index="06">Process</Eyebrow>
        <h2 className="display-md mt-6">
          From idea to kit<span className="text-gold-soft">.</span>
        </h2>
        <ol data-process-list className="relative mt-14 pl-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-bone/10">
            <span data-process-vfill className="absolute inset-0 origin-top bg-gold-soft" />
          </span>
          {stages.map((s, i) => (
            <li key={s.title} data-process-item className="relative pb-14 last:pb-0">
              <span aria-hidden className="absolute top-3 -left-8 h-px w-4 bg-gold-soft" />
              <p className="eyebrow text-gold-soft">0{i + 1}</p>
              <h3 className="display-md mt-2">{s.title}</h3>
              <p className="lede mt-3">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
