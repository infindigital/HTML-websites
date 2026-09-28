"use client";

import Image from "next/image";
import { useRef } from "react";
import { Eyebrow, Lines } from "./ui";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

const beats = ["It’s colours.", "It’s a crest.", "It’s a number.", "It’s a name.", "It’s the feeling before kickoff."];

/**
 * 07: Team identity (Our story). A close-up frame from the master film,
 * slowly pushing in, while each line of the manifesto lights up in turn.
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
            className="object-cover object-[70%_40%] opacity-60"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_8%,rgb(5_5_5/0.75)_45%,rgb(5_5_5/0.25)_100%),linear-gradient(to_bottom,var(--color-ink),transparent_20%,transparent_80%,var(--color-ink))]"
        />
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
