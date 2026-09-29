"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eyebrow, Lines } from "./ui";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

const beats = ["It’s colours.", "It’s a crest.", "It’s a number.", "It’s a name.", "It’s the feeling before kickoff."];

/**
 * 06: Team identity (Our story). A close-up frame from the master film,
 * slowly pushing in, while each line of the manifesto lights up in turn.
 * Light theme: a line-drawn pitch where the eleven shirts fill in as the
 * section scrolls; hover or tap a shirt to lift it and read its position.
 */
export default function Identity() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-identity-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.1, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: "[data-identity-title]", start: "top 80%" } },
        );
        gsap.fromTo(
          "[data-identity-media]",
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // Light theme: the team assembles, one shirt at a time.
        gsap.fromTo(
          "[data-shirt-fill]",
          { opacity: 0 },
          { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: "[data-squad]", start: "top 85%", end: "bottom 45%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-beat]").forEach((beat) => {
          gsap.fromTo(
            beat,
            { opacity: 0.16 },
            { opacity: 1, ease: "none", scrollTrigger: { trigger: beat, start: "top 78%", end: "top 52%", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="identity" ref={root} aria-labelledby="identity-title" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 light:hidden">
        <div data-identity-media className="absolute inset-0 will-change-transform">
          <Image src="/images/stills/identity" alt="" fill sizes="100vw" className="object-cover object-[70%_40%] opacity-60" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_8%,color-mix(in_srgb,var(--color-ink)_75%,transparent)_45%,color-mix(in_srgb,var(--color-ink)_25%,transparent)_100%),linear-gradient(to_bottom,var(--color-ink),transparent_20%,transparent_80%,var(--color-ink))]"
        />
      </div>

      <div className="shell relative grid gap-16 py-32 lg:grid-cols-12 lg:py-48">
        <div className="lg:col-span-7">
          <Eyebrow index="06">Our story</Eyebrow>
          <h2 id="identity-title" data-identity-title className="display-lg mt-8">
            <Lines
              lines={["A team is", "more than", <>11 players<span className="text-gold-soft">.</span></>]}
              outer="js-hidden-line"
            />
          </h2>
          <div className="hidden light:block">
            <Squad />
          </div>
        </div>
        <ul className="flex flex-col gap-3 self-end lg:col-span-5 lg:col-start-8 lg:pt-[30vh]">
          {beats.map((b, i) => (
            <li
              key={b}
              data-beat
              className={`font-display tracking-tight ${i === beats.length - 1 ? "mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold" : "text-[clamp(1.375rem,2.2vw,2rem)]"}`}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// A 4-4-2 line-up on a landscape pitch (viewBox 400 × 260), attacking right.
const squad = [
  { n: 1, role: "Goalkeeper", x: 40, y: 130 },
  { n: 3, role: "Left back", x: 105, y: 50 },
  { n: 4, role: "Centre back", x: 100, y: 103 },
  { n: 5, role: "Centre back", x: 100, y: 157 },
  { n: 2, role: "Right back", x: 105, y: 210 },
  { n: 11, role: "Left midfield", x: 195, y: 50 },
  { n: 8, role: "Centre midfield", x: 185, y: 103 },
  { n: 6, role: "Centre midfield", x: 185, y: 157 },
  { n: 7, role: "Right midfield", x: 195, y: 210 },
  { n: 9, role: "Striker", x: 285, y: 100 },
  { n: 10, role: "Striker", x: 285, y: 160 },
];

// Shirt outline centred on 0,0 (about 26 × 23 units).
const SHIRT = "M-6 -11.5 Q0 -7.5 6 -11.5 L13 -7 L10 -0.5 L7 -2.5 L7 11.5 L-7 11.5 L-7 -2.5 L-10 -0.5 L-13 -7 Z";

/** Light theme only: the eleven, drawn on a pitch. Hover, focus or tap a shirt. */
function Squad() {
  const [active, setActive] = useState<number | null>(null);
  const player = active === null ? null : squad[active];

  return (
    <figure data-squad className="mt-14 w-full max-w-[600px] lg:mt-20">
      <svg viewBox="0 0 400 260" className="w-full overflow-visible text-gold" role="group" aria-label="Eleven shirts in a 4-4-2 formation">
        {/* pitch */}
        <g fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1">
          <rect x="6" y="6" width="388" height="248" rx="2" />
          <line x1="200" y1="6" x2="200" y2="254" />
          <circle cx="200" cy="130" r="34" />
          <rect x="6" y="72" width="54" height="116" />
          <rect x="340" y="72" width="54" height="116" />
          <rect x="6" y="104" width="20" height="52" />
          <rect x="374" y="104" width="20" height="52" />
        </g>
        <circle cx="200" cy="130" r="2" fill="currentColor" fillOpacity="0.6" />

        {squad.map((p, i) => {
          const on = active === i;
          return (
            <g
              key={p.n}
              transform={`translate(${p.x} ${p.y})`}
              tabIndex={0}
              role="button"
              aria-label={`Number ${p.n}, ${p.role}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(i)}
              className="cursor-pointer outline-none"
            >
              {/* generous invisible hit area for fingers */}
              <circle r="22" fill="transparent" />
              <g
                className="transition-transform duration-500 ease-[var(--ease-out-expo)]"
                style={{ transform: on ? "scale(1.45) translateY(-3px)" : "scale(1.15)" }}
              >
                <path d={SHIRT} fill="var(--color-ink)" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                <g data-shirt-fill>
                  <path d={SHIRT} fill="currentColor" />
                  <text
                    y="5"
                    textAnchor="middle"
                    className="font-display"
                    fontSize="9"
                    fontWeight="700"
                    fill="var(--color-ink)"
                  >
                    {p.n}
                  </text>
                </g>
                {/* Picked shirt: always fully filled, whatever the scroll has revealed. */}
                {on && (
                  <g>
                    <path d={SHIRT} fill="var(--color-gold-soft)" stroke="var(--color-gold-soft)" strokeWidth="1.2" strokeLinejoin="round" />
                    <text y="5" textAnchor="middle" className="font-display" fontSize="9" fontWeight="700" fill="var(--color-ink)">
                      {p.n}
                    </text>
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </svg>
      <figcaption className="eyebrow mt-6 flex items-center gap-3 text-faint" aria-live="polite">
        {player ? (
          <>
            <span className="text-gold-soft">No. {String(player.n).padStart(2, "0")}</span>
            <span className="text-bone">{player.role}</span>
          </>
        ) : (
          "Tap a shirt to meet the eleven"
        )}
      </figcaption>
    </figure>
  );
}
