"use client";

import { useRef } from "react";
import { Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { pillars } from "@/config/content";

/**
 * 02: Brand statement. Breathing room after the hero: the line the brand is
 * built on, then the three promises from the live homepage.
 */
export default function Statement() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="statement-title" className="bg-white py-28 lg:py-44">
      <div className="shell">
        <Kicker index="01">iThree Sports Wear</Kicker>
        <h2 id="statement-title" data-reveal className="display-xl mt-10 lg:mt-14">
          <Lines lines={["Your team.", <span key="s" className="text-ink/30">Your style.</span>, <>Your jersey<span className="text-gold">.</span></>]} />
        </h2>
        <div className="mt-14 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <p data-fade className="lede max-w-xl lg:col-span-5">
            iThree Sports Wear creates custom sportswear and jerseys designed around teams: your colours, your crest, every
            player&rsquo;s name and number.
          </p>
          <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:gap-8">
            {pillars.map((p, i) => (
              <li key={p.title} data-fade={String(0.1 * i)} className="border-t border-line pt-6">
                {/* Supplied icons come in mixed colours (one is white); a mask tints them all the same gold. */}
                <span aria-hidden className="icon-mask block h-12 w-10 text-gold-deep" style={{ ["--icon" as string]: `url(${p.icon})` }} />
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
