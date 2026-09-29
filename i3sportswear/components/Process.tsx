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
 * 05: From idea to kit. Vertical scroll drives a horizontal, gently
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
      mm.add(MQ.motion, () => {
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
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="process"
      ref={root}
      aria-label="From idea to kit"
      className="relative bg-ink [--process-step:-1.5vh] lg:[--process-step:-5vh]"
    >
      {/* Desktop */}
      <div ref={track} className="relative h-[420vh] lg:h-[380vh] motion-reduce:hidden">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-16">
          <div className="shell flex items-end justify-between">
            <div>
              <Eyebrow index="05">Process</Eyebrow>
              <h2 className="display-md mt-6">
                From idea to kit<span className="text-gold-soft">.</span>
              </h2>
            </div>
            <p className="eyebrow text-faint">
              Stage <span className="text-bone">0{active + 1}</span> / 0{stages.length}
            </p>
          </div>

          <div className="shell mt-8 lg:mt-12">
            <div className="relative h-px bg-bone/10">
              <span data-process-fill className="absolute inset-0 origin-left bg-gold-soft" />
            </div>
          </div>

          <ol ref={row} className="mt-auto flex w-max items-start gap-[10vw] pr-[12vw] pl-[var(--gutter)] will-change-transform lg:gap-[6vw] lg:pr-[20vw]">
            {stages.map((s, i) => (
              <li
                key={s.title}
                className={`w-[78vw] max-w-[640px] transition-opacity duration-700 lg:w-[38vw] ${i === active ? "opacity-100" : "opacity-30"}`}
                style={{ transform: `translateY(calc(${i - 2} * var(--process-step)))` }}
              >
                <p aria-hidden className="font-display text-[34vw] leading-[0.8] lg:text-[12vw] font-semibold tracking-[-0.06em] text-bone/[0.07]">
                  0{i + 1}
                </p>
                <div className="-mt-[8vw] flex items-center gap-4 lg:-mt-[3vw]">
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
      <div className="shell hidden py-28 motion-reduce:block lg:py-40">
        <Eyebrow index="05">Process</Eyebrow>
        <h2 className="display-md mt-6">
          From idea to kit<span className="text-gold-soft">.</span>
        </h2>
        <ol className="relative mt-14 pl-8">
          <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-gold-soft/40" />
          {stages.map((s, i) => (
            <li key={s.title} className="relative pb-14 last:pb-0">
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
