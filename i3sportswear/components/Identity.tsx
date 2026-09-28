"use client";

import Image from "next/image";
import { jerseySrc } from "@/lib/products";
import { useRef } from "react";
import { Eyebrow, Lines } from "./ui";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

const beats = ["It’s colours.", "It’s a crest.", "It’s a number.", "It’s a name.", "It’s the feeling before kickoff."];

/**
 * 07: Team identity (Our story). A close-up frame from the master film,
 * slowly pushing in, while each line of the manifesto lights up in turn.
 * Light theme: fanned kit cards and an outlined gold "11" replace the dark still.
 */
export default function Identity() {
  const root = useRef<HTMLElement>(null);

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
        // Light theme: the fanned kits spread and rise, the outline numeral drifts.
        gsap.utils.toArray<HTMLElement>("[data-fan-kit]").forEach((kit, i) => {
          gsap.fromTo(
            kit,
            { y: 70, x: (i - 1) * -24 },
            { y: -10 * i, x: (i - 1) * 14, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom 40%", scrub: true } },
          );
        });
        gsap.fromTo(
          "[data-identity-numeral]",
          { yPercent: 12 },
          { yPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
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
      <div className="absolute inset-0">
        <div data-identity-media className="absolute inset-0 will-change-transform">
          <Image
            src="/images/stills/identity"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[70%_40%] opacity-60 light:hidden"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_8%,color-mix(in_srgb,var(--color-ink)_75%,transparent)_45%,color-mix(in_srgb,var(--color-ink)_25%,transparent)_100%),linear-gradient(to_bottom,var(--color-ink),transparent_20%,transparent_80%,var(--color-ink))]"
        />
        {/* Light theme backdrop: a warm gold glow and an outlined "11" in place of
            the dark film still. */}
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-[radial-gradient(55%_50%_at_18%_78%,color-mix(in_srgb,var(--color-gold)_14%,transparent),transparent_70%),radial-gradient(40%_45%_at_88%_20%,color-mix(in_srgb,var(--color-gold)_8%,transparent),transparent_70%)] light:block"
        />
        <span
          aria-hidden
          data-identity-numeral
          className="pointer-events-none absolute -right-[3vw] -bottom-[8vw] hidden font-display text-[62vw] leading-none font-semibold tracking-[-0.06em] text-transparent opacity-50 select-none [-webkit-text-stroke:1.5px_var(--color-gold)] light:block lg:-bottom-[5vw] lg:text-[34vw]"
        >
          11
        </span>
      </div>

      <div className="shell relative grid gap-16 py-32 lg:grid-cols-12 lg:py-48">
        <div className="lg:col-span-7">
          <Eyebrow index="07">Our story</Eyebrow>
          <h2 id="identity-title" data-identity-title className="display-lg mt-8">
            <Lines
              lines={["A team is", "more than", <>11 players<span className="text-gold-soft">.</span></>]}
              outer="js-hidden-line"
            />
          </h2>
          <div className="hidden light:block">
            <KitFan />
          </div>
        </div>
        <ul className="flex flex-col gap-3 self-end lg:col-span-5 lg:col-start-8 lg:pt-[30vh]">
          {beats.map((b, i) => (
            <li
              key={b}
              data-beat
              className={`font-display tracking-tight ${i === beats.length - 1 ? "mt-4 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-semibold" : "text-[clamp(1.375rem,2.2vw,2rem)]"}`}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Three kits fanned like cards: one team's squad, three sports.
const fan = [
  { slug: "sky-brush", left: "0%", rotate: -7, z: 1 },
  { slug: "coral-teal", left: "23%", rotate: 0, z: 3 },
  { slug: "yellow-circuit", left: "46%", rotate: 6, z: 2 },
];

/** Light theme only: kit cards that drift apart as the section scrolls. */
function KitFan() {
  return (
    <div aria-hidden className="relative mt-14 aspect-[2.15/1] w-full max-w-[680px] lg:mt-20">
      {fan.map((k) => (
        <div
          key={k.slug}
          data-fan-kit
          className="absolute bottom-0 aspect-[5/4] w-[54%] will-change-transform"
          style={{ left: k.left, zIndex: k.z, rotate: `${k.rotate}deg` }}
        >
          <div className="relative h-full w-full bg-[var(--stage)] shadow-[0_30px_60px_-24px_var(--product-shadow)] ring-1 ring-bone/[0.07]">
            <Image src={jerseySrc(k.slug)} alt="" fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-contain p-[7%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
