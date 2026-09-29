"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eyebrow, Lines } from "./ui";
import { MQ, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion, useTheme } from "@/lib/hooks";

const beats = ["It’s colours.", "It’s a crest.", "It’s a number.", "It’s a name.", "It’s the feeling before kickoff."];

/**
 * 06: Team identity (Our story). A close-up frame from the master film,
 * slowly pushing in, while each line of the manifesto lights up in turn.
 * Light theme: a shirt that builds itself line by line as the section
 * scrolls (colours, crest, number, name, then the glow before kickoff); tap a
 * line to jump the shirt to that step.
 */
export default function Identity() {
  const root = useRef<HTMLElement>(null);
  // 0 = outline only … 5 = finished shirt. Reduced motion shows it finished.
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const light = useTheme() === "light";
  const shown = reduce ? beats.length : step;

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
        // Light theme: the shirt gains one layer per manifesto line as it crosses the screen.
        ScrollTrigger.create({
          trigger: "[data-shirt-build]",
          start: "top 85%",
          end: "bottom 60%",
          onUpdate: (self) => {
            const next = Math.min(beats.length, Math.floor(self.progress * (beats.length + 1)));
            setStep((prev) => (prev === next ? prev : next));
          },
        });
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
            <ShirtBuild step={shown} />
          </div>
        </div>
        <ul className="flex flex-col gap-3 self-end lg:col-span-5 lg:col-start-8 lg:pt-[30vh]">
          {beats.map((b, i) => (
            <li
              key={b}
              data-beat
              className={`font-display tracking-tight ${i === beats.length - 1 ? "mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold" : "text-[clamp(1.375rem,2.2vw,2rem)]"}`}
            >
              {/* Light theme: each line is a step of the shirt; tap to jump to it. */}
              <button
                type="button"
                onClick={() => setStep(i + 1)}
                className="flex items-baseline gap-3 text-left light:cursor-pointer"
                tabIndex={light ? 0 : -1}
                aria-hidden={!light}
              >
                <span
                  aria-hidden
                  className={`hidden h-2 w-2 shrink-0 -translate-y-1 rounded-full transition-colors duration-500 light:block ${
                    i < shown ? "bg-gold-soft" : "bg-bone/15"
                  }`}
                />
                {b}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Shirt geometry in a 300 × 320 view box.
const BODY = "M96 22 Q150 50 204 22 L222 60 L222 300 L78 300 L78 60 Z";
const SLEEVE_L = "M96 22 L30 56 L50 120 L78 106 L78 60 Z";
const SLEEVE_R = "M204 22 L270 56 L250 120 L222 106 L222 60 Z";
const OUTLINE = "M96 22 Q150 50 204 22 L270 56 L250 120 L222 106 L222 300 L78 300 L78 106 L50 120 L30 56 Z";
const COLLAR = "M96 22 Q150 50 204 22 Q150 66 96 22 Z";

/** Light theme only: the shirt gains a layer for every line of the manifesto. */
function ShirtBuild({ step }: { step: number }) {
  const layer = (n: number) =>
    `transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${step >= n ? "opacity-100" : "opacity-0"}`;
  const pop = (n: number) => ({ transform: step >= n ? "none" : "translateY(10px) scale(0.92)", transformBox: "fill-box" as const, transformOrigin: "center" });

  return (
    <figure data-shirt-build aria-hidden className="mt-14 w-full max-w-[380px] lg:mt-20">
      <div className={step >= 5 ? "animate-[float_4s_ease-in-out_infinite]" : ""}>
        <svg
          viewBox="0 0 300 320"
          className="w-full overflow-visible transition-[filter] duration-1000"
          style={{ filter: step >= 5 ? "drop-shadow(0 0 36px color-mix(in srgb, var(--color-gold) 45%, transparent))" : "none" }}
        >
          {/* 1 · colours */}
          <g className={layer(1)} style={pop(1)}>
            <path d={BODY} fill="#16140f" />
            <path d={SLEEVE_L} fill="var(--color-gold)" />
            <path d={SLEEVE_R} fill="var(--color-gold)" />
            <path d="M78 268 L222 238 L222 254 L78 284 Z" fill="var(--color-gold)" opacity="0.9" />
            <path d={COLLAR} fill="var(--color-gold)" />
          </g>
          {/* outline, always drawn */}
          <path d={OUTLINE} fill="none" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M96 22 Q150 66 204 22" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" />
          {/* 2 · crest (left chest) */}
          <g className={layer(2)} style={pop(2)}>
            <image href="/images/logo-480.webp" x="168" y="66" width="38" height="32" />
          </g>
          {/* 4 · name */}
          <g className={layer(4)} style={pop(4)}>
            <text x="150" y="132" textAnchor="middle" className="font-display" fontSize="15" fontWeight="600" letterSpacing="3" fill="#faf8f3">
              YOUR NAME
            </text>
          </g>
          {/* 3 · number */}
          <g className={layer(3)} style={pop(3)}>
            <text x="150" y="222" textAnchor="middle" className="font-display" fontSize="92" fontWeight="700" letterSpacing="-4" fill="var(--color-gold-soft)">
              11
            </text>
          </g>
        </svg>
      </div>
      <figcaption className="eyebrow mt-6 text-faint">
        <span className="text-gold-soft">{String(step).padStart(2, "0")}</span> / 0{beats.length} · Tap a line to build the shirt
      </figcaption>
    </figure>
  );
}
