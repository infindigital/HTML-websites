"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Eyebrow } from "./ui";
import { bySlug, jerseySrc, sports } from "@/lib/products";
import { contactHref } from "@/lib/site";
import { MQ, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const ease = [0.16, 1, 0.3, 1] as const;

/** Oversized word sized so the longest sport name still fits the frame. */
const wordSize = (word: string) => `min(18vw, ${(90 / (word.length * 0.66)).toFixed(2)}vw)`;

/**
 * 03: Built for every game. The stage is pinned while the page scrolls
 * through six chapters; the word, jersey and ambient tint change per sport.
 * Reduced motion shows the chapters as a still vertical sequence.
 */
export default function Sports() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const sport = sports[active];
  const jersey = bySlug(sport.slug);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        ScrollTrigger.create({
          trigger: track.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const i = Math.min(sports.length - 1, Math.floor(self.progress * sports.length));
            setActive((prev) => (prev === i ? prev : i));
          },
        });
        gsap.fromTo(
          "[data-sports-progress]",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: track.current, start: "top top", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const jumpTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((i + 0.5) / sports.length) * (el.offsetHeight - window.innerHeight);
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="sports" ref={root} aria-labelledby="sports-title" className="relative bg-ink">
      <div className="shell pt-28 lg:pt-40">
        <Eyebrow index="03">Sports</Eyebrow>
        <h2 id="sports-title" className="display-md mt-8 max-w-3xl">
          Built for every game<span className="text-gold-soft">.</span>
        </h2>
      </div>

      {/* Pinned chapters (all screen sizes with motion) */}
      <div ref={track} className="relative h-[480vh] lg:h-[560vh] motion-reduce:hidden">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute inset-0"
            animate={{ background: `radial-gradient(55% 60% at 50% 55%, rgb(${sport.tint} / 0.16), rgb(5 5 5 / 0) 70%)` }}
            transition={{ duration: 1.4, ease }}
          />

          {/* Word behind the product */}
          <div aria-hidden className="absolute inset-x-0 top-[24%] -translate-y-1/2 overflow-hidden text-center lg:top-1/2">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={sport.name}
                className="font-display leading-[0.8] font-semibold tracking-[-0.05em] text-bone uppercase"
                style={{ fontSize: wordSize(sport.name) }}
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 1.1, ease }}
              >
                {sport.name}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Product */}
          <div className="absolute inset-0 flex items-center justify-center pt-4 lg:pt-10">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={jersey.slug}
                className="relative h-[42svh] w-[94vw] lg:h-[64vh] lg:w-[min(64vw,calc(64vh*1.45))]"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.02 }}
                transition={{ duration: 1.1, ease }}
              >
                <Image
                  src={jerseySrc(jersey.slug)}
                  alt={`iTHREE ${sport.name.toLowerCase()} kit in ${jersey.colourway.toLowerCase()}, front and back`}
                  fill
                  sizes="(min-width: 1024px) 64vw, 94vw"
                  className="object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.7)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Chapter meta */}
          <div className="shell absolute inset-x-0 bottom-0 flex flex-col-reverse gap-6 pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-12">
            <div className="max-w-xs" aria-live="polite">
              <p className="eyebrow text-faint">
                <span className="text-gold-soft">{String(active + 1).padStart(2, "0")}</span> / 0{sports.length}
              </p>
              <p className="mt-3 font-display text-xl tracking-tight lg:mt-4 lg:text-2xl">{sport.line}</p>
              <Button href={contactHref(`Hi iTHREE, I'd like a quote for a ${sport.name.toLowerCase()} kit.`)} variant="text" className="mt-5 text-bone/80 hover:text-bone">
                Start a {sport.name.toLowerCase()} kit
              </Button>
            </div>

            <nav aria-label="Sports" className="w-full lg:w-[min(46vw,640px)]">
              <div className="relative h-px bg-bone/10">
                <span data-sports-progress className="absolute inset-0 origin-left bg-gold-soft" />
              </div>
              <ul className="mt-4 hidden justify-between lg:flex">
                {sports.map((s, i) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={i === active ? "true" : undefined}
                      className={`eyebrow flex h-10 items-center transition-colors duration-500 ${
                        i === active ? "text-bone" : "text-bone/35 hover:text-bone/70"
                      }`}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

        </div>
      </div>

      {/* Reduced motion: the chapters as a still editorial sequence */}
      <ol className="shell hidden gap-24 pt-16 pb-28 motion-reduce:flex motion-reduce:flex-col lg:motion-reduce:grid lg:motion-reduce:grid-cols-2 lg:motion-reduce:gap-x-10 lg:motion-reduce:pb-40">
        {sports.map((s, i) => {
          const j = bySlug(s.slug);
          return (
            <li key={s.name} className="relative">
              <p className="eyebrow text-faint">
                <span className="text-gold-soft">{String(i + 1).padStart(2, "0")}</span> / 0{sports.length}
              </p>
              <h3

                className="mt-4 font-display leading-[0.82] font-semibold tracking-[-0.05em] uppercase"
                style={{ fontSize: `min(22vw, ${(88 / (s.name.length * 0.66)).toFixed(2)}vw)` }}
              >
                {s.name}
              </h3>
              <div

                className="relative -mt-[6vw] aspect-[1.35] w-full"
                style={{ background: `radial-gradient(50% 50% at 50% 55%, rgb(${s.tint} / 0.14), transparent 70%)` }}
              >
                <Image
                  src={jerseySrc(j.slug)}
                  alt={`iTHREE ${s.name.toLowerCase()} kit in ${j.colourway.toLowerCase()}, front and back`}
                  fill
                  sizes="(min-width: 1024px) 60vw, 92vw"
                  className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.7)]"
                />
              </div>
              <p className="mt-4 font-display text-xl tracking-tight">
                {s.line}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
