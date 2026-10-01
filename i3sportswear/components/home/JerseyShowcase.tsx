"use client";

import { useRef, useState } from "react";
import { Arrow, Button, Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { jerseys, jerseyProduct, jerseySet } from "@/config/jerseys";
import { pages } from "@/config/navigation";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * 03: Jersey archive. All twelve supplied kits. Desktop: the section pins and
 * the row travels sideways with the scroll. Phones, tablets and reduced
 * motion: a native swipe row with previous/next buttons. Hovering a card
 * turns the kit to its back and tints the section in that kit's colour.
 */
export default function JerseyShowcase() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [tint, setTint] = useState<string | null>(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const el = track.current!;
        el.classList.add("is-pinned");
        const distance = () => Math.max(0, el.scrollWidth - el.clientWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-archive-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.8,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
        return () => el.classList.remove("is-pinned");
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 16), behavior: "smooth" });
  };

  return (
    <section
      id="jerseys"
      ref={root}
      aria-labelledby="jerseys-title"
      className="relative bg-white transition-colors duration-700"
      style={tint ? { backgroundColor: `color-mix(in srgb, ${tint} 38%, white)` } : undefined}
    >
      <div data-archive-pin className="flex min-h-[100svh] flex-col justify-center gap-10 overflow-hidden py-20 lg:gap-10 lg:pt-28 lg:pb-10">
        <div className="shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Kicker index="02">Jersey archive</Kicker>
            <h2 id="jerseys-title" data-reveal className="display-lg mt-6 lg:text-[min(4.6vw,4.75rem)]">
              <Lines lines={["Our custom", <>jersey designs<span className="text-gold">.</span></>]} />
            </h2>
            <p data-fade className="mt-4 max-w-md text-mute">
              Explore selected custom jersey designs created for teams, clubs and sporting identities.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button href={pages.products.href} variant="outline" size="sm">
              All products
            </Button>
            <div className="flex gap-2 lg:motion-safe:hidden">
              <button type="button" onClick={() => nudge(-1)} aria-label="Previous designs" className="flex h-11 w-11 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <Arrow className="rotate-180" />
              </button>
              <button type="button" onClick={() => nudge(1)} aria-label="Next designs" className="flex h-11 w-11 items-center justify-center ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <Arrow />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] [&.is-pinned]:snap-none [&.is-pinned]:overflow-visible lg:gap-6"
        >
          {jerseys.map((j, i) => {
            const { productUrl, matched } = jerseyProduct(j);
            const front = jerseySet(j.id, "front");
            const back = jerseySet(j.id, "back");
            const body = (
              <>
                <span className="label absolute top-5 left-5 z-10 text-ink/60">
                  {String(i + 1).padStart(2, "0")} <span className="text-ink/30">/ {jerseys.length}</span>
                </span>
                {j.sport && <span className="label absolute top-5 right-5 z-10 bg-white/70 px-2.5 py-1.5 text-ink">{j.sport}</span>}

                <div className={`relative mx-auto mt-12 h-[72%] w-full ${matched ? "transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" : ""}`}>
                  <Img
                    {...front}
                    sizes="(min-width: 1024px) 16vw, 40vw"
                    alt={`Player wearing the iTHREE ${j.name} jersey, front view`}
                    className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Img
                    {...back}
                    sizes="(min-width: 1024px) 16vw, 40vw"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                {matched && <span aria-hidden className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/[0.04]" />}

                <div className="mt-auto bg-gradient-to-t from-white/70 to-transparent p-5 pt-10">
                  <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">{j.name}</h3>
                  {matched && (
                    <p className="label mt-2 flex translate-y-1 items-center gap-2 text-ink/70 opacity-0 transition-[opacity,translate] duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      View jersey <Arrow />
                    </p>
                  )}
                </div>
              </>
            );
            const common = {
              "data-card": true,
              onMouseEnter: () => setTint(j.tone),
              onMouseLeave: () => setTint(null),
              className:
                "group relative flex h-[min(118vw,560px)] w-[78vw] shrink-0 snap-start flex-col overflow-hidden sm:w-[46vw] lg:h-[min(calc(100svh-19rem),640px)] lg:w-[min(27vw,460px)]",
              style: { backgroundColor: j.tone },
            };
            // Only a verified product match becomes a link (src/config/productUrls.ts).
            return matched ? (
              <a
                key={j.id}
                {...common}
                href={productUrl}
                data-cursor="View"
                onFocus={() => setTint(j.tone)}
                onBlur={() => setTint(null)}
                aria-label={`View the ${j.name} jersey`}
              >
                {body}
              </a>
            ) : (
              <article key={j.id} {...common} aria-label={`${j.name} jersey`}>
                {body}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
