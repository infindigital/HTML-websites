"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { processSteps } from "@/config/content";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 06: Process. The four steps illustrated on the live site. Desktop: the
 * frame holds still while the page scrolls through the steps along a
 * timeline. Phones: a simple stacked list.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  useReveal(root);

  useEffect(() => {
    const onScroll = () => {
      const el = track.current;
      if (!el || el.offsetHeight === 0) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      setProgress(p);
      setStep(Math.min(processSteps.length - 1, Math.floor(p * processSteps.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => (window.removeEventListener("scroll", onScroll), window.removeEventListener("resize", onScroll));
  }, []);

  const s = processSteps[step];

  return (
    <section id="process" ref={root} aria-labelledby="process-title" className="bg-stone">
      <div className="shell pt-24 lg:pt-36">
        <Kicker index="05">How it works</Kicker>
        <h2 id="process-title" data-reveal className="display-lg mt-6">
          <Lines lines={["From idea", <>to kick-off<span className="text-gold">.</span></>]} />
        </h2>
      </div>

      {/* Desktop: sticky timeline */}
      <div ref={track} className="relative hidden h-[280vh] lg:block">
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
          <div className="shell grid grid-cols-12 items-center gap-10">
            <div className="col-span-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}>
                  <p className="font-display text-[clamp(6rem,13vw,13rem)] leading-[0.8] font-bold tracking-[-0.06em] text-ink/10">0{step + 1}</p>
                  <h3 className="display-lg -mt-[0.35em]">{s.title}</h3>
                  <p className="lede mt-6 max-w-md">{s.text}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="relative col-span-5 col-start-8 aspect-square">
              <AnimatePresence initial={false}>
                <motion.div
                  key={step}
                  className="absolute inset-0 flex items-center justify-center bg-white"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Img src={s.image} alt="" width={512} height={512} className="h-[78%] w-auto object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ol className="shell mt-14 grid grid-cols-4 gap-6">
            {processSteps.map((p, i) => (
              <li key={p.title} className="relative pt-6">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-ink/15" />
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-[2px] origin-left bg-ink"
                  style={{ width: `${Math.min(1, Math.max(0, progress * processSteps.length - i)) * 100}%` }}
                />
                <p className={`label transition-colors ${i <= step ? "text-ink" : "text-faint"}`}>
                  0{i + 1} · {p.title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Phones and tablets: stacked */}
      <ol className="shell grid gap-6 pt-12 pb-24 sm:grid-cols-2 lg:hidden">
        {processSteps.map((p, i) => (
          <li key={p.title} data-fade className="bg-white p-6">
            <Img src={p.image} alt="" width={512} height={512} className="h-36 w-auto" />
            <p className="label mt-6 text-gold-deep">0{i + 1}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-mute">{p.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
