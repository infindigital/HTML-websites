"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow, Lines } from "./ui";
import { jerseys } from "@/lib/products";
import { MQ, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/hooks";

const FabricCanvas = dynamic(() => import("./perf/FabricCanvas"), { ssr: false });

// Fabric squares cropped from the front of supplied kits. `from` names the
// archive kit each one comes from.
const claims = [
  { key: "breathable", label: "Breathable", from: "teal-stripe" },
  { key: "lightweight", label: "Lightweight", from: "sky-brush" },
  { key: "performance", label: "Performance ready", from: "black-volt" },
  { key: "print", label: "Durable print", from: "crimson-wolf" },
  { key: "fit", label: "Athlete-first fit", from: "azure-geo" },
];

const archiveNo = (slug: string) => String(jerseys.findIndex((j) => j.slug === slug) + 1).padStart(3, "0");
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 04: Performance. A pinned WebGL sheet of real kit fabric whose motion
 * expresses each claim (billow, float, tension, stillness, wrap). Phones get
 * a lighter mesh; reduced motion gets the same fabrics as a still sequence.
 */
export default function Performance() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const rich = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const lite = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "1000px 0px" });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

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
      mm.add(MQ.motion, () => {
        ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const i = Math.min(claims.length - 1, Math.floor(self.progress * claims.length));
            setChapter((p) => (p === i ? p : i));
          },
        });
        gsap.fromTo(
          "[data-perf-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: track.current, start: "top top", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const c = claims[chapter];

  return (
    <section id="performance" ref={root} aria-labelledby="perf-title" className="relative bg-ink">
      <div className="shell pt-28 lg:pt-44">
        <Eyebrow index="04">Performance</Eyebrow>
        <h2 id="perf-title" data-perf-title className="display-lg mt-8">
          <Lines
            lines={["Performance", "starts with", <>the fabric<span className="text-gold-soft">.</span></>]}
            outer="js-hidden-line"
          />
        </h2>
      </div>

      {/* Pinned living fabric (all screen sizes with motion) */}
      <div ref={track} className="relative h-[420vh] lg:h-[520vh] motion-reduce:hidden">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(45%_55%_at_60%_50%,#1b1b1a,#050505_75%)]"
          />
          {rich && near && (
            <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
              <FabricCanvas chapter={chapter} lite={lite} onReady={markReady} />
            </div>
          )}

          <div className="shell pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between pb-10 lg:pb-14">
            <div aria-live="polite">
              <p className="eyebrow text-faint">
                <span className="text-gold-soft">0{chapter + 1}</span> / 0{claims.length}
              </p>
              <div className="mt-4 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={c.key}
                    className="display-lg"
                    style={{ fontSize: "clamp(2.5rem, 5.4vw, 6rem)" }}
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.8, ease }}
                  >
                    {c.label}
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="eyebrow mt-5 text-faint">Fabric from archive {archiveNo(c.from)}</p>
              <div aria-hidden className="mt-6 flex gap-1.5 lg:hidden">
                {claims.map((cl, i) => (
                  <span key={cl.key} className={`h-0.5 w-6 transition-colors duration-500 ${i <= chapter ? "bg-gold-soft" : "bg-bone/15"}`} />
                ))}
              </div>
            </div>

            <ol className="hidden gap-5 lg:flex">
              <li aria-hidden className="relative w-px bg-bone/10">
                <span data-perf-progress className="absolute inset-0 origin-top bg-gold-soft" />
              </li>
              <li>
                <ul className="flex flex-col gap-2">
                  {claims.map((cl, i) => (
                    <li
                      key={cl.key}
                      className={`eyebrow transition-colors duration-500 ${i === chapter ? "text-bone" : "text-bone/30"}`}
                    >
                      {cl.label}
                    </li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Reduced motion: the same fabrics as a still sequence */}
      <ol className="shell hidden gap-14 pt-16 pb-28 sm:grid-cols-2 motion-reduce:grid lg:grid-cols-3 lg:pb-40">
        {claims.map((cl, i) => (
          <li key={cl.key} data-fabric-card>
            <div className="relative aspect-square overflow-hidden bg-graphite">
              <Image
                src={`/images/fabric/${cl.key}.webp`}
                alt={`Fabric detail from iTHREE archive kit ${archiveNo(cl.from)}`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-bone/10 pt-4">
              <span className="flex items-baseline gap-3">
                <span className="eyebrow text-gold-soft">0{i + 1}</span>
                <span className="font-display text-xl font-medium tracking-tight uppercase">{cl.label}</span>
              </span>
              <span className="eyebrow text-faint">Archive {archiveNo(cl.from)}</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
