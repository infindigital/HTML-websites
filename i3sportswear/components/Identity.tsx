"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, Lines } from "./ui";
import { MQ, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion, useTheme } from "@/lib/hooks";

const beats = ["It’s colours.", "It’s a crest.", "It’s a number.", "It’s a name.", "It’s the feeling before kickoff."];

/**
 * 06: Team identity (Our story). A close-up frame from the master film,
 * slowly pushing in, while each line of the manifesto lights up in turn.
 * Light theme: a stadium split-flap board that flips through COLOURS, CREST,
 * NUMBER, NAME and KICKOFF as the section scrolls; tap the board or a line to
 * flip it yourself.
 */
export default function Identity() {
  const root = useRef<HTMLElement>(null);
  // 0 = the board reads iTHREE; 1–5 = one word per manifesto line.
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  const light = useTheme() === "light";
  const shown = step;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-identity-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.1, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: "[data-identity-title]", start: "top 80%" } },
        );
        gsap.fromTo(
          "[data-identity-media]",
          { scale: 1.12 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        // Light theme: the board flips to the next word as each line comes up.
        ScrollTrigger.create({
          trigger: "[data-shirt-build]",
          start: "top 85%",
          end: "bottom 60%",
          onUpdate: (self) => {
            const next = Math.min(beats.length, Math.floor(self.progress * (beats.length + 1)));
            setStep((prev) => (prev === next ? prev : next));
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-beat]").forEach((beat) => {
          gsap.fromTo(
            beat,
            { opacity: 0.16 },
            { opacity: 1, ease: "none", scrollTrigger: { trigger: beat, start: "top 78%", end: "top 52%", scrub: true } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="identity" ref={root} aria-labelledby="identity-title" className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 light:hidden">
        <div data-identity-media className="absolute inset-0 will-change-transform">
          <Image src="/images/stills/identity" alt="" fill sizes="100vw" className="object-cover object-[70%_40%] opacity-60" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_8%,color-mix(in_srgb,var(--color-ink)_75%,transparent)_45%,color-mix(in_srgb,var(--color-ink)_25%,transparent)_100%),linear-gradient(to_bottom,var(--color-ink),transparent_20%,transparent_80%,var(--color-ink))]"
        />
      </div>

      <div className="shell relative grid gap-16 py-32 lg:grid-cols-12 lg:py-48">
        <div className="lg:col-span-7">
          <Eyebrow index="06">Our story</Eyebrow>
          <h2 id="identity-title" data-identity-title className="display-lg mt-8">
            <Lines
              lines={["A team is", "more than", <>11 players<span className="text-gold-soft">.</span></>]}
              outer="js-hidden-line"
            />
          </h2>
          <div className="hidden light:block">
            <Scoreboard step={shown} reduce={reduce} onNext={() => setStep((n) => (n % beats.length) + 1)} />
          </div>
        </div>
        <ul className="flex flex-col gap-3 self-end lg:col-span-5 lg:col-start-8 lg:pt-[30vh]">
          {beats.map((b, i) => (
            <li
              key={b}
              data-beat
              className={`font-display tracking-tight ${i === beats.length - 1 ? "mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold" : "text-[clamp(1.375rem,2.2vw,2rem)]"}`}
            >
              {/* Light theme: each line is a word on the board; tap to flip to it. */}
              <button
                type="button"
                onClick={() => setStep(i + 1)}
                className="flex items-baseline gap-3 text-left light:cursor-pointer"
                tabIndex={light ? 0 : -1}
                aria-hidden={!light}
              >
                <span
                  aria-hidden
                  className={`hidden h-2 w-2 shrink-0 -translate-y-1 rounded-full transition-colors duration-500 light:block ${
                    i < shown ? "bg-gold-soft" : "bg-bone/15"
                  }`}
                />
                {b}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// One word per manifesto line, padded to the board's width.
const WORDS = ["ITHREE", "COLOURS", "CREST", "NUMBER", "NAME", "KICKOFF"];
const FLAPS = 7;
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const pad = (w: string) => w.padEnd(FLAPS, " ").slice(0, FLAPS).split("");

/**
 * Light theme only: a stadium split-flap board. On each change every flap
 * rattles through a few random letters before settling, left to right.
 */
function Scoreboard({ step, reduce, onNext }: { step: number; reduce: boolean; onNext: () => void }) {
  const target = pad(WORDS[step]);
  const [chars, setChars] = useState(target);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduce) {
      setChars(pad(WORDS[step]));
      return;
    }
    const goal = pad(WORDS[step]);
    goal.forEach((letter, i) => {
      const spins = 3 + i; // later flaps rattle longer, so the word settles left to right
      for (let k = 0; k <= spins; k++) {
        timers.current.push(
          setTimeout(() => {
            setChars((prev) => {
              const next = [...prev];
              next[i] = k === spins ? letter : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              return next;
            });
          }, i * 45 + k * 55),
        );
      }
    });
    return () => timers.current.forEach(clearTimeout);
  }, [step, reduce]);

  return (
    <figure data-board className="mt-14 lg:mt-20">
      <p className="eyebrow flex items-center gap-3 text-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" /> Matchday · iTHREE
      </p>
      <button
        type="button"
        onClick={onNext}
        aria-label={`Scoreboard reads ${WORDS[step]}. Flip to the next word.`}
        className="group mt-5 flex cursor-pointer gap-1 rounded-[6px] bg-[#16140f] p-2 shadow-[0_30px_60px_-30px_var(--product-shadow)] ring-1 ring-gold/40 sm:gap-1.5 sm:p-3"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            aria-hidden
            className="relative flex h-[min(17vw,88px)] w-[min(11.6vw,60px)] lg:h-[min(8.4vw,124px)] lg:w-[min(5.6vw,84px)] items-center justify-center overflow-hidden rounded-[3px] bg-[#23201a] [perspective:200px]"
          >
            <span
              key={`${i}-${c}`}
              className="font-display text-[min(10.5vw,56px)] leading-none lg:text-[min(5.2vw,78px)] font-bold text-[#e0c15a] [animation:flap_120ms_ease-out]"
            >
              {c === " " ? "\u00a0" : c}
            </span>
            {/* the hinge line across the middle of each flap */}
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/70" />
          </span>
        ))}
      </button>
      <figcaption className="eyebrow mt-5 text-faint">
        <span className="text-gold-soft">{String(step).padStart(2, "0")}</span> / 0{beats.length} · Tap the board to flip
      </figcaption>
    </figure>
  );
}
