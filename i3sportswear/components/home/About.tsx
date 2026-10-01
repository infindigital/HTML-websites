"use client";

import { useRef, type ReactNode } from "react";
import { Button, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { qualities } from "@/config/content";
import { pages } from "@/config/navigation";
import { ADDRESS, BRAND } from "@/config/site";

/** Line icons for the three qualities, drawn to match the brand's gold marks. */
const ICONS: Record<string, ReactNode> = {
  Performance: (
    // lightning bolt
    <path d="M13.5 2.5 5 13.5h6l-1 8 8.5-11h-6l1-8Z" />
  ),
  Comfort: (
    // feather
    <>
      <path d="M20 4c-6.5 0-12 4.5-12 11v5" />
      <path d="M20 4c0 7-4.5 12-11 12" />
      <path d="M8 15h5" />
      <path d="M11 11h5" />
    </>
  ),
  Customization: (
    // pen nib
    <>
      <path d="M4 20 6 13l9-9 5 5-9 9-7 2Z" />
      <path d="m13 6 5 5" />
      <circle cx="9.5" cy="14.5" r="1.4" />
    </>
  ),
};

/**
 * 07: About. Kept simple: who iThree Sports Wear is, and the three things
 * the brand stands for, each with a line icon. The full story lives on the
 * WordPress About page.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="bg-paper py-24 lg:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Kicker index="07">About us</Kicker>
          <h2 id="about-title" data-reveal className="display-lg mt-6">
            <Lines lines={["Made for teams.", <>Made in Bantwal<span className="text-gold">.</span></>]} />
          </h2>
          <p data-fade className="lede mt-8 max-w-xl">
            {BRAND.legalName} designs custom sportswear in {ADDRESS.short}: jerseys, track suits and uniforms for football,
            cricket, volleyball, throwball, basketball and kabaddi teams, made in your colours with your names, numbers and
            crest.
          </p>
          <div data-fade className="mt-10">
            <Button href={pages.about.href} variant="outline">
              More about iTHREE
            </Button>
          </div>
        </div>

        <ul className="flex flex-col lg:col-span-5 lg:col-start-8 lg:justify-center">
          {qualities.map((q, i) => (
            <li key={q.title} data-fade={String(i * 0.08)} className="group flex items-start gap-6 border-t border-line py-8 last:border-b">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-gold-deep ring-1 ring-gold/40 transition-colors duration-500 group-hover:bg-gold group-hover:text-ink">
                <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[q.title]}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{q.title}</h3>
                <p className="mt-2 text-mute">{q.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
