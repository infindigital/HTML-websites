"use client";

import Image from "next/image";
import { useRef } from "react";
import { Eyebrow, Lines } from "./ui";
import { jerseys } from "@/lib/products";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

// Macro crops of supplied artwork (scripts/process_images.py). `from` names the
// archive kit each detail was cropped from.
const details = [
  { key: "breathable", label: "Breathable", from: "sky-brush", layout: "lg:col-span-5 lg:col-start-1" },
  { key: "lightweight", label: "Lightweight", from: "azure-geo", layout: "lg:col-span-4 lg:col-start-8 lg:mt-[22vh]" },
  { key: "performance", label: "Performance ready", from: "black-volt", layout: "lg:col-span-4 lg:col-start-2 lg:-mt-[8vh]" },
  { key: "print", label: "Durable print", from: "noir-gold", layout: "lg:col-span-3 lg:col-start-7 lg:mt-[10vh]" },
  { key: "fit", label: "Athlete-first fit", from: "ink-dragon", layout: "lg:col-span-5 lg:col-start-4 lg:mt-[6vh]" },
];

const archiveNo = (slug: string) => String(jerseys.findIndex((j) => j.slug === slug) + 1).padStart(3, "0");

/** 04 — Performance. Macro detail of real kit artwork, revealed by clip and parallax. */
export default function Performance() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-perf-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.08, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: "[data-perf-title]", start: "top 85%" } },
        );
      });
      mm.add(MQ.desktopMotion, () => {
        gsap.utils.toArray<HTMLElement>("[data-macro]").forEach((fig) => {
          const frame = fig.querySelector("[data-macro-frame]");
          const img = fig.querySelector("[data-macro-img]");
          gsap.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out", scrollTrigger: { trigger: fig, start: "top 92%", end: "top 40%", scrub: 0.6 } },
          );
          gsap.fromTo(
            img,
            { scale: 1.28, yPercent: -6 },
            { scale: 1.04, yPercent: 6, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } },
          );
          gsap.from(fig.querySelector("figcaption"), {
            y: 20,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: fig, start: "top 60%" },
          });
        });
      });
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-macro]").forEach((fig) => {
          gsap.from(fig, { y: 40, autoAlpha: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: fig, start: "top 85%" } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="performance" ref={root} aria-labelledby="perf-title" className="relative overflow-hidden bg-ink py-28 lg:py-44">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <Eyebrow index="04">Performance</Eyebrow>
            <h2 id="perf-title" data-perf-title className="display-lg mt-8">
              <Lines
                lines={["Performance", "starts with", <>the fabric<span className="text-gold-soft">.</span></>]}
                outer="js-hidden-line"
              />
            </h2>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-14 lg:mt-32 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {details.map((d, i) => (
            <figure key={d.key} data-macro className={`${i === 0 || i === 4 ? "col-span-2" : "col-span-1"} ${d.layout}`}>
              <div data-macro-frame className="relative aspect-[4/5] overflow-hidden bg-graphite">
                <div data-macro-img className="absolute inset-0 will-change-transform">
                  <Image
                    src={`/images/macro/${d.key}`}
                    alt={`Fabric and print detail from iTHREE archive kit ${archiveNo(d.from)}`}
                    fill
                    sizes={i === 0 || i === 4 ? "(min-width: 1024px) 42vw, 92vw" : "(min-width: 1024px) 30vw, 46vw"}
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-bone/10 pt-4">
                <span className="flex items-baseline gap-3">
                  <span className="eyebrow text-gold-soft">0{i + 1}</span>
                  <span className="font-display text-lg font-medium tracking-tight uppercase sm:text-2xl">{d.label}</span>
                </span>
                <span className="eyebrow hidden text-faint sm:block">Archive {archiveNo(d.from)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
