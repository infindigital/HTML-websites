"use client";

import { useRef } from "react";
import { Button, Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { qualities } from "@/config/content";
import { pages } from "@/config/navigation";
import { ADDRESS, BRAND } from "@/config/site";
import { jerseySet } from "@/config/jerseys";

/**
 * 07: About. Editorial split: the uniform photography on one side, who
 * iThree Sports Wear is on the other. Facts only; the full story lives on
 * the WordPress About page.
 */
export default function About() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="bg-paper py-24 lg:py-36">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div data-fade className="relative lg:col-span-6">
          <Img
            src="/images/uniforms/polo-black-1600.webp"
            srcSet="/images/uniforms/polo-black-800.webp 800w, /images/uniforms/polo-black-1600.webp 1600w"
            sizes="(min-width: 1024px) 46vw, 92vw"
            width={1600}
            height={1416}
            alt="iTHREE black polo uniform, front and back"
            className="aspect-[4/5] w-full object-cover lg:aspect-auto lg:h-[min(86vh,820px)]"
          />
          <div className="absolute -right-3 -bottom-8 w-[46%] bg-white p-3 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] sm:-right-6 lg:-right-10 lg:w-[42%]">
            <Img {...jerseySet("blue-marbled", "pair")} sizes="(min-width: 1024px) 18vw, 40vw" alt="iTHREE Blue Marbled football kit, front and back" className="h-auto w-full" />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Kicker index="06">About us</Kicker>
          <h2 id="about-title" data-reveal className="display-lg mt-6">
            <Lines lines={["Made for teams.", <>Made in Bantwal<span className="text-gold">.</span></>]} />
          </h2>
          <p data-fade className="lede mt-8">
            {BRAND.legalName} designs custom sportswear in {ADDRESS.short}: jerseys, track suits and uniforms for football,
            cricket, volleyball, throwball, basketball and kabaddi teams, made in your colours with your names, numbers and
            crest.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {qualities.map((q, i) => (
              <li key={q.title} data-fade={String(i * 0.08)} className="border-t border-ink pt-4">
                <h3 className="font-display text-lg font-semibold tracking-tight">{q.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{q.text}</p>
              </li>
            ))}
          </ul>
          <div data-fade className="mt-12">
            <Button href={pages.about.href} variant="outline">
              More about iTHREE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
