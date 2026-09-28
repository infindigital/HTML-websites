"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import LabFallback from "./lab/LabFallback";
import type { LabState } from "./lab/LabCanvas";
import { Button, Eyebrow, Lines } from "./ui";
import { labKits } from "@/lib/products";
import { contactHref } from "@/lib/site";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/hooks";

const LabCanvas = dynamic(() => import("./lab/LabCanvas"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * 02 — The Jersey Lab. A visual prototype, not a configurator: it previews
 * where names, numbers and crests sit on real iTHREE kits and hands the
 * resulting brief to a real conversation. Nothing is saved or submitted here.
 */
export default function JerseyLab() {
  const root = useRef<HTMLElement>(null);
  const entry = useRef(0);
  const [kitIndex, setKitIndex] = useState(0);
  const [view, setView] = useState<"front" | "back">("front");
  const [zoom, setZoom] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [crest, setCrest] = useState(false);
  const [near, setNear] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const rich = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const ids = { name: useId(), number: useId() };

  const kit = labKits[kitIndex];
  const state: LabState = { kit, view, zoom, name, number, crest };

  useEffect(() => setWebgl(hasWebGL()), []);

  // Mount the WebGL stage only as the section approaches.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px 0px" });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-lab-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          {
            y: 0,
            yPercent: 0,
            stagger: 0.08,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-lab-title]", start: "top 85%" },
          },
        );
        gsap.from("[data-lab-panel] > *", {
          y: 24,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-lab-panel]", start: "top 80%" },
        });
        ScrollTrigger.create({
          trigger: "[data-lab-stage]",
          start: "top bottom",
          end: "center center",
          onUpdate: (self) => (entry.current = self.progress),
        });
      });
      mm.add(MQ.compactOrReduced, () => {
        entry.current = 1;
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Editing the name or number turns the kit to show where it sits.
  const editBack = (fn: (v: string) => void) => (v: string) => {
    fn(v);
    if (view !== "back") setView("back");
  };

  const brief = [
    `Hi iTHREE — I'd like a quote for a ${kit.sport.toLowerCase()} kit.`,
    `Reference: Jersey Lab kit ${String(kitIndex + 1).padStart(2, "0")} (${kit.sport}).`,
    name && `Player name: ${name}`,
    number && `Number: ${number}`,
    crest && "Team crest: left chest",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <section id="lab" ref={root} aria-labelledby="lab-title" className="relative bg-coal py-28 lg:py-40">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow index="02">Customize</Eyebrow>
            <h2 id="lab-title" data-lab-title className="display-lg mt-8">
              <Lines lines={["The Jersey", <>Lab<span className="text-gold-soft">.</span></>]} outer="js-hidden-line" />
            </h2>
          </div>
          <p className="lede max-w-sm lg:col-span-4 lg:justify-self-end">
            From an idea to your team&rsquo;s identity. Choose a kit, add a name and number, and see where your crest
            sits.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Stage */}
          <div
            data-lab-stage
            className="relative h-[min(118vw,560px)] overflow-hidden bg-[radial-gradient(60%_55%_at_50%_42%,#1d1d1c_0%,#0e0e0e_55%,#080808_100%)] lg:col-span-8 lg:h-[min(82vh,860px)]"
          >
            {/* studio floor line */}
            <span aria-hidden className="absolute inset-x-0 bottom-[14%] h-px bg-bone/[0.05]" />

            {!(rich && webgl && ready) && <LabFallback {...state} />}
            {rich && webgl && near && (
              <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
                <LabCanvas {...state} entry={entry} onViewChange={setView} onReady={markReady} small={false} />
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-x-6 gap-y-2 p-5 lg:p-7">
              <p className="eyebrow text-faint">
                Kit <span className="text-bone">{String(kitIndex + 1).padStart(2, "0")}</span> / 0{labKits.length} —{" "}
                <span className="text-bone">{kit.sport}</span>
              </p>
              <p className="eyebrow text-faint" aria-live="polite">
                <span className={view === "front" ? "text-bone" : ""}>Front</span> /{" "}
                <span className={view === "back" ? "text-bone" : ""}>Back</span>
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 lg:p-7">
              <p className="eyebrow pointer-events-none hidden text-faint lg:block">
                {rich && webgl ? "Drag to rotate" : "Preview"}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setView(view === "front" ? "back" : "front")}
                  className="eyebrow flex h-11 items-center gap-2 bg-ink/70 px-4 text-bone ring-1 ring-bone/15 backdrop-blur transition hover:ring-bone/50"
                >
                  <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M2.5 8a5.5 5.5 0 0 1 9.6-3.7M13.5 8a5.5 5.5 0 0 1-9.6 3.7M12.5 1.5v3h-3M3.5 14.5v-3h3" />
                  </svg>
                  Turn
                </button>
                <button
                  type="button"
                  aria-pressed={zoom}
                  onClick={() => setZoom((z) => !z)}
                  className={`eyebrow flex h-11 items-center gap-2 px-4 ring-1 backdrop-blur transition ${
                    zoom ? "bg-bone text-ink ring-bone" : "bg-ink/70 text-bone ring-bone/15 hover:ring-bone/50"
                  }`}
                >
                  <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <circle cx="7" cy="7" r="4.5" />
                    <path d="m10.5 10.5 3.5 3.5M5 7h4" />
                    {!zoom && <path d="M7 5v4" />}
                  </svg>
                  Detail
                </button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div data-lab-panel className="flex flex-col gap-9 lg:col-span-4">
            <fieldset>
              <legend className="eyebrow text-faint">Sport</legend>
              <div className="mt-4 grid grid-cols-2 gap-px bg-bone/10 ring-1 ring-bone/10">
                {labKits.map((k, i) => (
                  <button
                    key={k.slug}
                    type="button"
                    aria-pressed={i === kitIndex}
                    onClick={() => setKitIndex(i)}
                    className={`eyebrow flex h-14 items-center justify-between px-4 text-left transition-colors duration-300 ${
                      i === kitIndex ? "bg-bone text-ink" : "bg-coal text-bone/70 hover:bg-graphite hover:text-bone"
                    }`}
                  >
                    {k.sport}
                    <span className={i === kitIndex ? "text-ink/50" : "text-faint"}>0{i + 1}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div>
              <p className="eyebrow text-faint">Colour</p>
              <div className="mt-4 flex items-center gap-4">
                <ul className="flex" aria-label={`Kit palette for ${kit.sport}`}>
                  {kit.palette.map((c) => (
                    <li key={c} className="-mr-2 h-9 w-9 rounded-full ring-2 ring-coal" style={{ background: c }}>
                      <span className="sr-only">{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-snug text-faint">
                  Sampled from this kit. Your own team colours are matched in design.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_7rem] gap-3">
              <label htmlFor={ids.name} className="block">
                <span className="eyebrow text-faint">Name</span>
                <input
                  id={ids.name}
                  value={name}
                  maxLength={12}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="e.g. Rahman"
                  onChange={(e) => editBack(setName)(e.target.value.toUpperCase().replace(/[^A-Z .'-]/g, ""))}
                  className="mt-3 h-14 w-full bg-transparent px-4 font-display text-lg tracking-wide text-bone uppercase ring-1 ring-bone/15 transition outline-none placeholder:text-bone/25 placeholder:normal-case focus:ring-gold-soft"
                />
              </label>
              <label htmlFor={ids.number} className="block">
                <span className="eyebrow text-faint">Number</span>
                <input
                  id={ids.number}
                  value={number}
                  inputMode="numeric"
                  maxLength={2}
                  autoComplete="off"
                  placeholder="10"
                  onChange={(e) => editBack(setNumber)(e.target.value.replace(/\D/g, ""))}
                  className="mt-3 h-14 w-full bg-transparent px-4 font-display text-lg text-bone ring-1 ring-bone/15 transition outline-none placeholder:text-bone/25 focus:ring-gold-soft"
                />
              </label>
            </div>

            <div>
              <p className="eyebrow text-faint">Logo</p>
              <button
                type="button"
                role="switch"
                aria-checked={crest}
                onClick={() => {
                  setCrest((c) => !c);
                  setView("front");
                }}
                className="mt-4 flex h-14 w-full items-center justify-between px-4 ring-1 ring-bone/15 transition hover:ring-bone/40"
              >
                <span className="text-sm text-bone/85">Show team crest placement</span>
                <span className={`relative h-5 w-9 rounded-full transition-colors ${crest ? "bg-gold" : "bg-bone/15"}`}>
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-bone transition-transform duration-300 ${
                      crest ? "translate-x-4" : ""
                    }`}
                  />
                </span>
              </button>
            </div>

            <div className="border-t border-bone/10 pt-8">
              <Button href={contactHref(brief)} className="w-full" cursor="view">
                Send this brief
              </Button>
              <p className="mt-4 text-[0.8125rem] leading-relaxed text-faint">
                Preview only. Nothing is saved here. Your final artwork is designed and approved with our team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
