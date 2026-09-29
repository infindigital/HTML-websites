"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "./ui";
import { site } from "@/lib/site";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

// Qualitative signals, each grounded in the service itself. Replaced by
// verified numbers as soon as `site.stats` is filled in.
const signals = [
  { title: "Made for your team", text: "Every kit is built around one team's colours, crest and players." },
  { title: "Designed with you", text: "Our designers work with you from first idea to final approval." },
  { title: "Every player covered", text: "Individual names and numbers across the whole squad." },
  { title: "Six sports, one standard", text: "Football, cricket, basketball, volleyball, badminton and training wear." },
];

/** 08: Trust. Verified statistics when supplied, qualitative signals otherwise. */
export function Trust() {
  const root = useRef<HTMLElement>(null);
  const stats = site.stats;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-trust-item]", {
          y: 30,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.fromTo(
          "[data-trust-rule]",
          { scaleX: 0 },
          { scaleX: 1, stagger: 0.08, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 75%" } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="trust" ref={root} aria-labelledby="trust-title" className="bg-ink py-28 lg:py-40">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow index="08">Why iTHREE</Eyebrow>
            <h2 id="trust-title" className="display-md mt-8">
              Built on the detail<span className="text-gold-soft">.</span>
            </h2>
          </div>
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {stats.length
            ? stats.map((s) => (
                <li key={s.label} data-trust-item>
                  <span data-trust-rule className="block h-px origin-left bg-bone/15" />
                  <p className="mt-6 font-display text-[clamp(3rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]">
                    {s.value}
                  </p>
                  <p className="eyebrow mt-4 text-faint">{s.label}</p>
                </li>
              ))
            : signals.map((s, i) => (
                <li key={s.title} data-trust-item>
                  <span data-trust-rule className="block h-px origin-left bg-bone/15" />
                  <p className="eyebrow mt-6 text-gold-soft">0{i + 1}</p>
                  <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-xs text-mute">{s.text}</p>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

/** 10: Client wall. Renders only when real client logos are configured. */
export function Clients() {
  if (!site.clients.length) return null;
  const row = [...site.clients, ...site.clients];
  return (
    <section aria-label="Teams we have worked with" className="overflow-hidden border-y border-bone/10 bg-ink py-16">
      <p className="shell eyebrow text-faint">Worn by</p>
      <div className="group mt-10 flex w-max animate-[marquee_60s_linear_infinite] gap-16 hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-auto motion-reduce:px-[var(--gutter)]">
        {row.map((c, i) => (
          <div key={`${c.name}-${i}`} aria-hidden={i >= site.clients.length} className="relative h-14 w-36 shrink-0">
            <Image
              src={c.logo}
              alt={c.name}
              fill
              unoptimized
              className="object-contain opacity-45 brightness-0 invert transition duration-500 hover:-translate-y-0.5 hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/** 11: Testimonials. Renders only when real, permissioned quotes exist. */
export function Testimonials() {
  const items = site.testimonials;
  const [i, setI] = useState(0);
  if (!items.length) return null;
  const t = items[i];
  return (
    <section aria-labelledby="voices-title" className="bg-coal py-28 lg:py-40">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Eyebrow index="10">Voices</Eyebrow>
          <h2 id="voices-title" className="sr-only">
            What teams say
          </h2>
        </div>
        <figure className="lg:col-span-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-[clamp(1.75rem,3.6vw,3.5rem)] leading-[1.1] font-medium tracking-[-0.025em]">
                <span className="text-gold-soft">&ldquo;</span>
                {t.quote}
                <span className="text-gold-soft">&rdquo;</span>
              </blockquote>
              <figcaption className="eyebrow mt-10 text-faint">
                <span className="text-bone">{t.author}</span>, {t.team}
              </figcaption>
            </motion.div>
          </AnimatePresence>
          {items.length > 1 && (
            <div className="mt-12 flex items-center gap-6">
              <p className="eyebrow text-faint" aria-live="polite">
                <span className="text-bone">{String(i + 1).padStart(2, "0")}</span> / {String(items.length).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                {([-1, 1] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                    onClick={() => setI((i + d + items.length) % items.length)}
                    className="flex h-11 w-11 items-center justify-center ring-1 ring-bone/20 transition hover:bg-bone hover:text-ink"
                  >
                    <svg viewBox="0 0 16 16" aria-hidden className={`h-4 w-4 ${d < 0 ? "rotate-180" : ""}`} fill="none">
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}
        </figure>
      </div>
    </section>
  );
}
