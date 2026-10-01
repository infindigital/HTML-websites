"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img, Kicker, Lines, Mark } from "./ui";
import { useReveal } from "./useReveal";
import { corporateKit, jerseySet } from "@/config/jerseys";
import { useReducedMotion } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

type Spot = { x: number; y: number; tag: string; above?: boolean };
type Option = { id: string; label: string; spots?: Spot[]; focus?: "front" | "back" | "both"; colours?: boolean };

// Positions are fractions of the front-and-back cut-out (corporate-pair).
const OPTIONS: Option[] = [
  { id: "logo", label: "Company Logo", spots: [{ x: 0.38, y: 0.37, tag: "Chest logo" }, { x: 0.75, y: 0.325, tag: "Back logo" }] },
  { id: "names", label: "Employee Names", spots: [{ x: 0.75, y: 0.245, tag: "Employee name", above: true }], focus: "back" },
  { id: "team", label: "Team Names", spots: [{ x: 0.75, y: 0.47, tag: "Team name" }], focus: "back" },
  { id: "colours", label: "Custom Colours", colours: true },
  { id: "sponsor", label: "Sponsor Branding", spots: [{ x: 0.085, y: 0.36, tag: "Sleeve" }], focus: "front" },
  { id: "print", label: "Front & Back Printing", focus: "both" },
  { id: "type", label: "Custom Typography", spots: [{ x: 0.75, y: 0.325, tag: "Lettering" }], focus: "back" },
  { id: "bulk", label: "Bulk Orders" },
];

const USES = [
  "Corporate Teams",
  "Company Events",
  "Conferences",
  "Promotional Campaigns",
  "Restaurants & Cafés",
  "Hotels & Hospitality",
  "Schools & Colleges",
  "Sports & Fitness Teams",
];

// Panel colours shown behind the polo while "Custom Colours" is active.
const TONES = [corporateKit.tone, "#d6e4f2", "#dcebd7", "#f1dcd4", "#ece3c4"];

/**
 * Corporate T-shirt customization. Follows the client logos: the corporate
 * polo front and back on a colour panel, and a quiet list of what can be
 * customised. Pointing at (or focusing) an option marks where it goes on
 * the shirt. A visual section only: it has no links.
 */
export default function Corporate() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  useReveal(root);

  return (
    <section id="corporate" ref={root} aria-labelledby="corporate-title" className="bg-paper py-24 lg:py-36">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
          <Stage option={OPTIONS.find((o) => o.id === active) ?? null} />
        </div>

        <div className="flex flex-col lg:col-span-6 lg:col-start-7">
          <Kicker>Corporate apparel</Kicker>
          <h2 id="corporate-title" data-reveal className="display-lg mt-6 text-[clamp(2.3rem,10.5vw,4rem)] lg:text-[min(4.6vw,5.25rem)]">
            <span className="sr-only">Corporate T-shirt customization: </span>
            <Lines lines={["Your brand.", "Your team.", <>Your T‑shirts<span className="text-gold">.</span></>]} />
          </h2>
          <p data-fade className="lede mt-8">
            Custom corporate T-shirts designed around your brand identity, from employee uniforms and company events to
            promotional campaigns and team wear.
          </p>

          <div data-fade className="mt-12">
            <h3 className="label text-mute">Customize your T-shirts</h3>
            <ul className="mt-4 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-8" onMouseLeave={() => setActive(null)}>
              {OPTIONS.map((o) => {
                const on = o.id === active;
                return (
                  <li key={o.id} className="border-b border-line">
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => setActive(o.id)}
                      onFocus={() => setActive(o.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(on ? null : o.id)}
                      className="group flex w-full items-center gap-3 py-3.5 text-left"
                    >
                      <Mark className={`rotate-90 transition-opacity duration-300 ${on ? "opacity-100" : "opacity-30 group-hover:opacity-70"}`} />
                      <span className={`font-display text-[1.05rem] font-semibold tracking-tight transition-colors duration-300 ${on ? "text-ink" : "text-ink/60"}`}>
                        {o.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-fade className="mt-12">
            <h3 className="label text-mute">Perfect for</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {USES.map((u) => (
                <li key={u} className="label bg-white px-3 py-2 text-ink/80 ring-1 ring-line">
                  {u}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual sign-off only: deliberately not a link or button. */}
          <p data-fade className="mt-12 flex items-center gap-4 bg-ink px-6 py-5 text-white">
            <Mark className="text-gold" />
            <span className="font-display text-xl font-semibold tracking-tight">Make your team look the part.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Stage({ option }: { option: Option | null }) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  const cycling = option?.colours || option?.focus === "both";

  useEffect(() => {
    if (!cycling || reduce) return;
    setTick(0);
    const t = setInterval(() => setTick((n) => n + 1), 1100);
    return () => clearInterval(t);
  }, [cycling, reduce, option?.id]);

  const tone = option?.colours ? TONES[(tick % (TONES.length - 1)) + 1] : corporateKit.tone;
  // Which half is dimmed: front-only options dim the back and vice versa;
  // "Front & Back Printing" alternates between the two.
  const focus = option?.focus === "both" ? (tick % 2 === 0 ? "front" : "back") : option?.focus;
  const img = jerseySet("corporate", "pair");

  return (
    <div className="relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: tone }}>
      <div className="relative mx-auto aspect-[1200/1233] w-full max-w-[640px]">
        <Img
          {...img}
          sizes="(min-width: 1024px) 44vw, 92vw"
          alt="Custom corporate polo T-shirt, front and back, with the company logo on the chest and across the back"
          className="absolute inset-0 h-full w-full object-contain"
        />
        {/* Dim the half that is not being talked about */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 transition-opacity duration-500"
          style={{ backgroundColor: tone, opacity: focus === "back" ? 0.55 : 0 }}
        />
        <span
          aria-hidden
          className="absolute inset-y-0 right-0 w-1/2 transition-opacity duration-500"
          style={{ backgroundColor: tone, opacity: focus === "front" ? 0.55 : 0 }}
        />
        <AnimatePresence>
          {option?.spots?.map((p, n) => (
            <motion.span
              key={`${option.id}-${p.tag}`}
              aria-hidden
              className="absolute"
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.45, ease, delay: n * 0.08 }}
            >
              <span className="absolute -top-6 -left-6 h-12 w-12 rounded-full ring-2 ring-gold sm:-top-8 sm:-left-8 sm:h-16 sm:w-16" />
              <span className={`label absolute whitespace-nowrap bg-ink px-2.5 py-1.5 text-white ${p.above ? "-top-16 sm:-top-[4.5rem]" : "top-8 sm:top-10"} ${p.x > 0.5 ? "right-0 translate-x-1/2" : "-left-3"}`}>{p.tag}</span>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <p className="label absolute top-4 left-4 bg-white/80 px-2.5 py-1.5 text-ink backdrop-blur">
        Corporate polo · Front &amp; back
      </p>
    </div>
  );
}
