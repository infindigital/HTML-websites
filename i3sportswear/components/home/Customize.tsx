"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { customOptions, type CustomId } from "@/config/content";
import { jerseyById, jerseySet } from "@/config/jerseys";
import { useReducedMotion } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

// Reference kit and where each detail sits on it (fractions of the image box).
const REF = "black-gold";
const SPOTS: Record<string, { view: "front" | "back"; points: { x: number; y: number; tag: string }[] }> = {
  names: { view: "back", points: [{ x: 0.48, y: 0.32, tag: "Player name" }] },
  numbers: { view: "back", points: [{ x: 0.48, y: 0.44, tag: "Number" }] },
  crest: { view: "front", points: [{ x: 0.72, y: 0.37, tag: "Crest" }] },
  sponsors: {
    view: "front",
    points: [
      { x: 0.55, y: 0.48, tag: "Chest sponsor" },
      { x: 0.12, y: 0.34, tag: "Sleeve" },
    ],
  },
};
const COLOURS = ["black-gold", "blue-geometric", "yellow-basketball", "red-wolf", "neon-green", "teal"];
const PATTERNS = ["dragon", "red-wolf", "blue-marbled", "blue-geometric"];

/**
 * 05: Make it yours. Six things a team can customise. As each one scrolls
 * into focus (or is tapped), the kit beside it shows where that detail
 * lives: colourways cycle, callouts mark the name, number, crest and
 * sponsor positions, and patterns zoom in on the print.
 */
export default function Customize() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<CustomId>("colours");
  useReveal(root);

  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>("[data-option]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.getAttribute("data-option") as CustomId)),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="customise" ref={root} aria-labelledby="custom-title" className="bg-white">
      <div className="shell grid gap-10 py-24 lg:grid-cols-12 lg:gap-16 lg:py-36">
        <div className="lg:col-span-12">
          <Kicker index="04">Customization</Kicker>
          <h2 id="custom-title" data-reveal className="display-xl mt-6">
            <Lines lines={[<>Make it yours<span className="text-gold">.</span></>]} />
          </h2>
        </div>

        {/* Visual: sticky beside (desktop) or above (phones) the list */}
        <div className="sticky top-[calc(var(--header-h)-0.5rem)] z-10 -mx-[var(--gutter)] h-[44svh] bg-white px-[var(--gutter)] pb-3 lg:top-24 lg:col-span-6 lg:mx-0 lg:h-[min(78vh,760px)] lg:px-0 lg:pb-0">
          <Stage active={active} />
        </div>

        <ol className="lg:col-span-5 lg:col-start-8">
          {customOptions.map((o, i) => {
            const on = o.id === active;
            return (
              <li key={o.id} data-option={o.id} className="flex min-h-[34svh] items-center border-t border-line lg:min-h-[52vh]">
                <button type="button" onClick={() => setActive(o.id)} aria-pressed={on} className="group w-full py-8 text-left">
                  <span className={`label transition-colors ${on ? "text-gold-deep" : "text-faint"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`mt-3 block font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-bold tracking-[-0.04em] uppercase transition-colors duration-500 ${on ? "text-ink" : "text-ink/20 group-hover:text-ink/50"}`}>
                    {o.title}
                  </span>
                  <span className={`mt-4 block max-w-sm text-mute transition-opacity duration-500 ${on ? "opacity-100" : "opacity-40"}`}>{o.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Stage({ active }: { active: CustomId }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const cycling = active === "colours" || active === "patterns";

  useEffect(() => {
    if (!cycling || reduce) return;
    const t = setInterval(() => setTick((n) => n + 1), 1600);
    return () => clearInterval(t);
  }, [cycling, reduce]);

  const ref = jerseyById(REF);
  let jersey = REF;
  let view: "front" | "back" = "front";
  if (active === "colours") jersey = COLOURS[tick % COLOURS.length];
  if (active === "patterns") jersey = PATTERNS[tick % PATTERNS.length];
  const spot = SPOTS[active];
  if (spot) view = spot.view;
  const kit = jerseyById(jersey);
  const img = jerseySet(jersey, view);
  const zoom = active === "patterns";

  return (
    <div className="relative h-full overflow-hidden transition-colors duration-700" style={{ backgroundColor: kit.tone || ref.tone }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={`${jersey}-${view}`}
          className="absolute inset-0 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <motion.div
            className="relative aspect-[480/1000] h-[94%]"
            animate={{ scale: zoom ? 1.9 : 1, y: zoom ? "22%" : "0%" }}
            transition={{ duration: 1, ease }}
          >
            <Img {...img} sizes="(min-width: 1024px) 24vw, 40vw" alt={`iTHREE ${kit.name} jersey, ${view} view`} className="absolute inset-0 h-full w-full object-contain" />
            {spot?.points.map((p, n) => (
              <motion.span
                key={p.tag}
                aria-hidden
                className="absolute"
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease, delay: 0.25 + n * 0.12 }}
              >
                <span className="absolute -top-7 -left-7 h-14 w-14 rounded-full ring-2 ring-gold" />
                <span className="absolute -top-7 -left-7 h-14 w-14 animate-ping rounded-full ring-1 ring-gold/70 [animation-duration:2.2s]" />
                <span className={`label absolute top-9 whitespace-nowrap bg-ink px-2.5 py-1.5 text-white ${p.x > 0.5 ? "-left-6" : "-left-2"}`}>{p.tag}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <p className="label absolute top-4 left-4 bg-white/75 px-2.5 py-1.5 text-ink backdrop-blur">
        {kit.name} · {view === "front" ? "Front" : "Back"}
      </p>
    </div>
  );
}
