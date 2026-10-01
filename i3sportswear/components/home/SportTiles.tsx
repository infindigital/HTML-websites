"use client";

import { useRef } from "react";
import { Arrow, Img, Kicker } from "./ui";
import { useReveal } from "./useReveal";
import { categoryList } from "@/config/navigation";
import { sportIcons } from "@/config/content";

/**
 * Shop by sport: the live homepage's category strip, redrawn. A gold band
 * of eight tiles, each with the supplied sport icon and a direct link to
 * the WordPress category. Hover lifts the tile, tips the icon and draws a
 * gold rule along its foot.
 */
export default function SportTiles() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} aria-labelledby="shop-sport-title" className="bg-gold py-16 lg:py-24">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Kicker className="text-ink/70 [&_svg]:text-ink">Shop by sport</Kicker>
            <h2 id="shop-sport-title" data-reveal className="display-lg mt-5 text-ink">
              <span className="mask">
                <span>Pick your game.</span>
              </span>
            </h2>
          </div>
          <p data-fade className="max-w-xs text-ink/75">Eight categories. Every kit made in your team&rsquo;s colours.</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 lg:mt-14 lg:grid-cols-4 lg:gap-4">
          {categoryList.map((c, i) => (
            <li key={c.key} data-fade={String((i % 4) * 0.06)}>
              <a
                href={c.href}
                data-cursor="Shop"
                className="group relative flex h-36 flex-col justify-between overflow-hidden bg-white p-4 shadow-[0_1px_0_rgb(0_0_0/0.04)] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-24px_rgb(0_0_0/0.45)] sm:h-44 sm:p-6 lg:h-52"
              >
                <span className="flex items-start justify-between">
                  <span className="label text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                  <Img
                    src={sportIcons[c.key]}
                    alt=""
                    width={160}
                    height={160}
                    className="h-10 w-10 object-contain transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:-rotate-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
                  />
                </span>
                <span className="flex items-end justify-between gap-2">
                  <span className="font-display text-lg leading-tight font-semibold tracking-tight sm:text-2xl">{c.label}</span>
                  <Arrow className="mb-1 -translate-x-2 opacity-0 transition-[transform,opacity] duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold-deep transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
