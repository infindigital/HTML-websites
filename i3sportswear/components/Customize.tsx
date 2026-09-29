"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Eyebrow, Lines } from "./ui";
import { bySlug, jerseySrc, jerseys } from "@/lib/products";
import { MQ, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Each step frames a real kit; `focus` is the point (fractions of the image)
// the camera moves to and `zoom` how far it pushes in.
const steps = [
  { label: "Team colours", text: "Your palette, carried across every panel of the kit.", slug: "azure-geo", focus: [0.5, 0.5], zoom: 1 },
  { label: "Player names", text: "Every player named, placed across the shoulders.", slug: "sky-brush", focus: [0.715, 0.22], zoom: 2.6 },
  { label: "Numbers", text: "Numbers sized and set for your sport.", slug: "crimson-wolf", focus: [0.69, 0.42], zoom: 2.2 },
  { label: "Team crests", text: "Your crest on the chest, where it belongs.", slug: "black-volt", focus: [0.38, 0.27], zoom: 3.2 },
  { label: "Sponsors", text: "Sponsor placements planned into the design, not added on top.", slug: "teal-stripe", focus: [0.29, 0.55], zoom: 2.5 },
  { label: "Custom patterns", text: "Original artwork, from subtle texture to full-body graphics.", slug: "ink-dragon", focus: [0.27, 0.5], zoom: 1.55 },
] as const;

const archiveNo = (slug: string) => String(jerseys.findIndex((j) => j.slug === slug) + 1).padStart(3, "0");

/** scale(s) translate(t): moves the focus point to the frame centre, then zooms. */
const frameTransform = (focus: readonly number[], zoom: number) =>
  `scale(${zoom}) translate(${((0.5 - focus[0]) * 100).toFixed(2)}%, ${((0.5 - focus[1]) * 100).toFixed(2)}%)`;

/**
 * 04: Make it yours. A scroll-driven "camera" moves across real kits to show
 * each customisable element. Reduced motion shows each framed detail as a still.
 */
export default function Customize() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-custom-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: "[data-custom-title]", start: "top 85%" } },
        );
      });
      mm.add(MQ.motion, () => {
        ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            setActive((p) => (p === i ? p : i));
          },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const current = bySlug(steps[active].slug);

  return (
    <section id="customize" ref={root} aria-label="Make it yours" className="relative bg-coal">
      {/* Pinned camera sequence (all screen sizes with motion) */}
      <div ref={track} className="relative h-[420vh] lg:h-[480vh] motion-reduce:hidden">
        <div className="sticky top-0 flex h-[100svh] flex-col gap-5 overflow-hidden px-[var(--gutter)] pt-24 pb-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:py-0">
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:pt-16">
            <Eyebrow index="04">Customization</Eyebrow>
            <h2 data-custom-title className="display-md mt-4 lg:display-lg lg:mt-8">
              <Lines lines={["Make it", <>yours<span className="text-gold-soft">.</span></>]} outer="js-hidden-line" />
            </h2>
            <ol className="mt-14 hidden max-w-md lg:block">
              {steps.map((s, i) => (
                <li key={s.label} className="border-t border-bone/10 last:border-b">
                  <div className="flex items-baseline gap-5 py-4">
                    <span className={`eyebrow transition-colors duration-500 ${i === active ? "text-gold-soft" : "text-bone/25"}`}>
                      0{i + 1}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-xl font-medium tracking-tight uppercase transition-colors duration-500 ${
                          i === active ? "text-bone" : "text-bone/30"
                        }`}
                      >
                        {s.label}
                      </h3>
                      <p
                        className={`grid text-sm text-mute transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] ${
                          i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2">{s.text}</span>
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden bg-[radial-gradient(60%_60%_at_50%_50%,var(--stage),var(--color-coal)_75%)] lg:col-span-7 lg:my-[12vh]">
            {steps.map((s, i) => {
              const j = bySlug(s.slug);
              const on = i === active;
              return (
                <div
                  key={s.slug}
                  aria-hidden={!on}
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`}
                >
                  <div
                    className="relative max-h-[84%] w-[88%] transition-transform duration-[1600ms] ease-[var(--ease-in-out-quart)]"
                    style={{
                      aspectRatio: `${j.w} / ${j.h}`,
                      transform: on ? frameTransform(s.focus, s.zoom) : "scale(1)",
                      transitionDelay: on ? "250ms" : "0ms",
                    }}
                  >
                    <Image
                      src={jerseySrc(j.slug)}
                      alt={on ? `${s.label}: detail of iTHREE archive kit ${archiveNo(s.slug)}` : ""}
                      fill
                      sizes={`(min-width: 1024px) ${Math.round(56 * s.zoom)}vw, ${Math.round(90 * s.zoom)}vw`}
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
            <p className="eyebrow absolute right-5 bottom-5 text-faint">
              Archive {archiveNo(current.slug)} · {current.sport}
            </p>
            <span aria-hidden className="absolute top-5 left-5 h-3 w-3 border-t border-l border-bone/40" />
            <span aria-hidden className="absolute top-5 right-5 h-3 w-3 border-t border-r border-bone/40" />
            <span aria-hidden className="absolute bottom-5 left-5 h-3 w-3 border-b border-l border-bone/40" />
          </div>

          {/* Phone: the active step under the frame */}
          <div className="lg:hidden" aria-live="polite">
            <div aria-hidden className="flex gap-1.5">
              {steps.map((s, i) => (
                <span key={s.label} className={`h-0.5 flex-1 transition-colors duration-500 ${i <= active ? "bg-gold-soft" : "bg-bone/15"}`} />
              ))}
            </div>
            <div className="mt-5 flex min-h-[4.5rem] gap-4">
              <span className="eyebrow pt-1.5 text-gold-soft">0{active + 1}</span>
              <div>
                <h3 className="font-display text-xl font-medium tracking-tight uppercase">{steps[active].label}</h3>
                <p className="mt-1 text-sm text-mute">{steps[active].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reduced motion: framed stills */}
      <div className="shell hidden py-28 motion-reduce:block lg:py-40">
        <Eyebrow index="04">Customization</Eyebrow>
        <h2 className="display-lg mt-8">
          Make it yours<span className="text-gold-soft">.</span>
        </h2>
        <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => {
            const j = bySlug(s.slug);
            return (
              <li key={s.label}>
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[92%]" style={{ aspectRatio: `${j.w} / ${j.h}`, transform: frameTransform(s.focus, Math.max(1, s.zoom * 0.85)) }}>
                      <Image src={jerseySrc(j.slug)} alt={`${s.label}: detail of iTHREE archive kit ${archiveNo(s.slug)}`} fill sizes={`(min-width: 640px) ${Math.round(45 * s.zoom)}vw, ${Math.round(80 * s.zoom)}vw`} className="object-contain" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex gap-4 border-t border-bone/10 pt-4">
                  <span className="eyebrow pt-1.5 text-gold-soft">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-tight uppercase">{s.label}</h3>
                    <p className="mt-1 text-sm text-mute">{s.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
