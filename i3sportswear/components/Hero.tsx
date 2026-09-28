"use client";

import { useRef } from "react";
import HeroVideo from "./HeroVideo";
import { Button, Lines } from "./ui";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * 01 — Hero. A sticky stage inside a taller track: while it is pinned the
 * film darkens and eases forward, the headline lifts away and the
 * "Built for your game." statement rises into the same frame.
 * Reduced motion collapses the track and shows both statements in flow.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: "(min-width: 1024px)" }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.8 },
        });
        tl.to("[data-hero-copy] .line-mask > span", { yPercent: -110, stagger: 0.04, duration: 0.3, ease: "power2.in" }, 0)
          .to("[data-hero-aside]", { y: -40, autoAlpha: 0, duration: 0.25 }, 0)
          .to("[data-hero-hint]", { autoAlpha: 0, duration: 0.1 }, 0)
          .to("[data-hero-dim]", { opacity: 0.78, duration: 0.5 }, 0.05)
          .fromTo(
            "[data-hero-statement] .line-mask > span",
            { y: 0, yPercent: 120 },
            { y: 0, yPercent: 0, stagger: 0.07, duration: 0.3, ease: "power3.out" },
            0.42,
          )
          .fromTo("[data-hero-kicker]", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.4)
          .fromTo("[data-hero-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.3, ease: "power2.out" }, 0.62)
          .to({}, { duration: 0.12 });
        if (desktop) tl.fromTo("[data-hero-media]", { scale: 1 }, { scale: 1.1, duration: 0.8 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
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
            <HeroVideo />
          </div>

          {/* Legibility: weight the frame toward the lower-left text field only. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--color-ink)_2%,rgb(5_5_5/0.55)_30%,transparent_62%),linear-gradient(to_right,rgb(5_5_5/0.7),transparent_55%)]"
          />
          <div data-hero-dim aria-hidden className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

          <div className="shell absolute inset-x-0 bottom-0 pb-20 lg:pb-24">
            <div className="grid items-end gap-10 lg:grid-cols-12">
              <h1 id="hero-title" data-hero-copy className="display-xl lg:col-span-8">
                <Lines
                  lines={["Wear", "Your", <>Identity<span className="text-gold-soft">.</span></>]}
                  inner="enter-rise"
                />
              </h1>
              <div data-hero-aside className="max-w-sm lg:col-span-4 lg:justify-self-end lg:pb-3">
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
          className="shell pointer-events-none absolute inset-0 flex flex-col justify-center motion-reduce:relative motion-reduce:py-32"
        >
          <p data-hero-kicker className="js-hidden-fade eyebrow mb-8 text-faint">
            <span className="text-gold-soft">01</span> — Custom team kits
          </p>
          <h2 className="display-xl">
            <Lines lines={["Built", "For", <>Your game<span className="text-gold-soft">.</span></>]} outer="js-hidden-line" />
          </h2>
          <span data-hero-rule aria-hidden className="mt-10 block h-px w-full max-w-md origin-left bg-bone/25" />
        </div>
      </div>
    </section>
  );
}
