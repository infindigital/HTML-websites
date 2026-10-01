"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, Button, Img, Kicker } from "./ui";
import { useReveal } from "./useReveal";
import { sports, sportLabel } from "@/config/content";
import { categories } from "@/config/navigation";
import { jerseyById, jerseySet } from "@/config/jerseys";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 04: Sports. An editorial selector: one sport at a time, its name set huge
 * beside a kit made for it. Every sport links to its WordPress category.
 */
export default function SportsShowcase() {
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [i, setI] = useState(0);
  useReveal(root);

  const sport = sports[i];
  const label = sportLabel(sport.key);
  const href = categories[sport.key].href;
  const go = (n: number) => setI((n + sports.length) % sports.length);

  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: sports.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const n = (map[e.key] + sports.length) % sports.length;
    setI(n);
    tabs.current[n]?.focus();
  };

  const tone = sport.image.kind === "jersey" ? jerseyById(sport.image.id).tone : "#e7e5df";

  return (
    <section id="sports" ref={root} aria-labelledby="sports-title" className="bg-paper py-24 lg:py-36">
      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Kicker index="04">Sports</Kicker>
            <h2 id="sports-title" data-reveal className="display-lg mt-6">
              <span className="mask">
                <span>Every sport. One standard.</span>
              </span>
            </h2>
          </div>
          <p data-fade className="lede max-w-sm">Kits for eight disciplines, each made in your colours.</p>
        </div>

        <div role="tablist" aria-label="Sports" onKeyDown={onKey} className="no-scrollbar -mx-[var(--gutter)] mt-12 flex gap-1 overflow-x-auto border-b border-line px-[var(--gutter)] lg:mt-16">
          {sports.map((s, n) => {
            const on = n === i;
            return (
              <button
                key={s.key}
                ref={(el) => {
                  tabs.current[n] = el;
                }}
                role="tab"
                id={`sport-tab-${s.key}`}
                aria-selected={on}
                aria-controls="sport-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setI(n)}
                className={`label relative shrink-0 px-3 py-4 whitespace-nowrap transition-colors ${on ? "text-ink" : "text-ink/45 hover:text-ink"}`}
              >
                {sportLabel(s.key)}
                <span aria-hidden className={`absolute inset-x-3 -bottom-px h-[2px] bg-ink transition-transform duration-500 ${on ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            );
          })}
        </div>

        <div id="sport-panel" role="tabpanel" aria-labelledby={`sport-tab-${sport.key}`} className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5 lg:py-6">
            <div>
              <p className="label text-gold-deep" aria-live="polite">
                {String(i + 1).padStart(2, "0")} / {String(sports.length).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={sport.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <h3 className="display-xl mt-5 text-[clamp(2.6rem,11vw,4.5rem)] lg:text-[min(5.4vw,6rem)]">
                    <span className="mask">
                      <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease }}>
                        {label}
                      </motion.span>
                    </span>
                  </h3>
                  <p className="mt-6 font-display text-2xl font-medium tracking-tight text-ink/80">{sport.line}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href={href}>Shop {label}</Button>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(i - 1)} aria-label="Previous sport" className="flex h-14 w-14 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                  <Arrow className="rotate-180" />
                </button>
                <button type="button" onClick={() => go(i + 1)} aria-label="Next sport" className="flex h-14 w-14 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                  <Arrow />
                </button>
              </div>
            </div>
          </div>

          <a
            href={href}
            data-cursor="Shop"
            aria-label={`Shop ${label}`}
            className="group relative block h-[min(110vw,520px)] overflow-hidden transition-colors duration-700 lg:col-span-7 lg:h-[min(72vh,680px)]"
            style={{ backgroundColor: tone }}
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={sport.key}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
                style={{ backgroundColor: tone }}
              >
                {sport.image.kind === "jersey" ? (
                  <Img
                    {...jerseySet(sport.image.id, "pair")}
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    alt={`iTHREE ${jerseyById(sport.image.id).name} kit, front and back`}
                    className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto max-w-[94%] object-contain object-bottom transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                ) : (
                  <Img
                    src={sport.image.src}
                    srcSet={sport.image.srcSet}
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    width={1600}
                    height={1416}
                    alt="iTHREE polo uniforms"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                )}
              </motion.div>
            </AnimatePresence>
            <span className="label absolute right-5 bottom-5 z-10 flex items-center gap-2 bg-white px-3 py-2 text-ink">
              {label} range <Arrow />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
