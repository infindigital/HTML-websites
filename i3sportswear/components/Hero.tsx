"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import HeroVideo from "./HeroVideo";
import { Button, Lines, Mark } from "./ui";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const HeroWorld = dynamic(() => import("./hero/HeroWorld"), { ssr: false });

function canUseWorld() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * 01: Hero. A sticky stage inside a taller track. On desktop the stage is the
 * 3D Kit Room (components/hero/HeroWorld); scroll turns the camera through the
 * ring of kits and cranes up as "Built for your game." rises into frame.
 * Phones get a lighter build of the same world; the master film remains only
 * as the fallback where WebGL is unavailable.
 * Reduced motion collapses the track and shows both statements in flow.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  // null until we know whether WebGL works (always null on the server).
  const [world, setWorld] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);
  const [lite, setLite] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const markLost = useCallback(() => setReady(false), []);

  useEffect(() => {
    setWorld(canUseWorld());
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setLite(window.matchMedia("(max-width: 1023px)").matches);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: "(min-width: 1024px)" }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => (progress.current = self.progress),
          },
        });
        tl.to("[data-hero-copy] .line-mask > span", { yPercent: -110, stagger: 0.04, duration: 0.3, ease: "power2.in" }, 0)
          .to("[data-hero-aside]", { y: -40, autoAlpha: 0, duration: 0.25 }, 0)
          .to("[data-hero-hint]", { autoAlpha: 0, duration: 0.1 }, 0)
          .fromTo(
            "[data-hero-statement] .line-mask > span",
            { y: 0, yPercent: 120 },
            { y: 0, yPercent: 0, stagger: 0.07, duration: 0.3, ease: "power3.out" },
            0.42,
          )
          .fromTo("[data-hero-kicker]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.4)
          .fromTo("[data-hero-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, 0.62)
          .to({}, { duration: 0.12 });
        if (desktop && world === false) tl.fromTo("[data-hero-media]", { scale: 1 }, { scale: 1.1, duration: 0.8 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [world], revertOnUpdate: true },
  );

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative h-[210svh] lg:h-[270vh] motion-reduce:h-auto!"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:relative motion-reduce:h-auto">
        <div className="relative h-[100svh]">
          <div data-hero-media className="absolute inset-0 will-change-transform">
            {world === false ? (
              <HeroVideo />
            ) : (
              <>
                {/* First frame of the Kit Room, shown instantly while three.js and
                    the kit textures load; the live scene fades in over it. */}
                <div aria-hidden className="hero-still absolute inset-0 bg-cover bg-center" />
                {world && (
                  <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
                    <HeroWorld progress={progress} still={still} lite={lite} onReady={markReady} onLost={markLost} />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="shell absolute inset-x-0 bottom-0 pb-20 lg:pb-24">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              {/* On desktop the headline is sized to its 8-column field so "Identity." never runs into the copy beside it. */}
              <h1 id="hero-title" data-hero-copy className="display-xl lg:col-span-8 lg:text-[min(5.15vw,5.8rem)] lg:whitespace-nowrap lg:[&_.line-mask]:inline-block! lg:[&_.line-mask:not(:last-child)]:mr-[0.24em]">
                <Lines
                  lines={["Wear", "Your", <>Identity<span className="text-gold-soft">.</span></>]}
                  inner="enter-rise"
                />
              </h1>
              <div data-hero-aside className="max-w-sm lg:col-span-4 lg:max-w-[min(24rem,100%)] lg:justify-self-end lg:pb-3">
                <p className="lede enter-fade text-bone/80 [animation-delay:700ms]">
                  Custom performance wear engineered around your team.
                </p>
                <div className="enter-fade mt-8 flex flex-col gap-3 sm:flex-row [animation-delay:850ms]">
                  <Button href="#lab" cursor="explore">
                    Design your kit
                  </Button>
                  <Button href="#sports" variant="outline">
                    Explore sports
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <p
            data-hero-hint
            aria-hidden
            className="eyebrow enter-fade absolute bottom-8 left-[var(--gutter)] hidden items-center gap-3 text-bone/50 [animation-delay:1200ms] lg:flex"
          >
            <span className="relative block h-8 w-px overflow-hidden bg-bone/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-hint_2.4s_var(--ease-in-out-quart)_infinite] bg-gold-soft" />
            </span>
            Scroll
          </p>
        </div>

        {/* Statement: layered into the pinned frame with motion, in flow without. */}
        <div
          data-hero-statement
          className="shell pointer-events-none absolute inset-0 flex flex-col justify-center pt-16 lg:justify-end lg:pt-0 lg:pb-24 motion-reduce:relative motion-reduce:py-32"
        >
          <p data-hero-kicker className="js-hidden-fade eyebrow mb-8 flex items-center gap-3 text-faint">
            <span className="text-gold-soft">01</span>
            <Mark />
            Custom team kits
          </p>
          {/* Sized so its longest line ("Your game.") fits the same field as "Identity." */}
          <h2 className="display-xl lg:text-[min(5.15vw,5.8rem)] lg:whitespace-nowrap lg:[&_.line-mask]:inline-block! lg:[&_.line-mask:not(:last-child)]:mr-[0.24em]">
            <Lines lines={["Built", "For", <>Your game<span className="text-gold-soft">.</span></>]} outer="js-hidden-line" />
          </h2>
          <span data-hero-rule aria-hidden className="mt-10 block h-px w-full max-w-md origin-left bg-bone/25 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
