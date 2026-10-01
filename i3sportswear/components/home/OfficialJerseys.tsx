"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { officialJerseys, poloSet } from "@/config/content";
import { categories, pages } from "@/config/navigation";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Our Custom Jersey Designs: the official jerseys (polo uniforms) from the
 * live homepage. One large stage and a colour picker: the colours play
 * through on their own while the section is on screen, and stop on the one
 * a visitor picks.
 */
export default function OfficialJerseys() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  useReveal(root);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (picked || !onScreen) return;
    const t = setTimeout(() => setI((n) => (n + 1) % officialJerseys.length), 2800);
    return () => clearTimeout(t);
  }, [i, picked, onScreen]);

  const pick = (n: number) => (setI(n), setPicked(true));
  const j = officialJerseys[i];
  const href = categories.officials.href;

  return (
    <section id="official" ref={root} aria-labelledby="official-title" className="bg-paper py-24 lg:py-36">
      {/* Phones: intro, photo, then colours and actions. Desktop: text left, photo right. */}
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
        <div className="min-w-0 lg:col-span-5 lg:row-start-1">
          <Kicker index="03">Official &amp; uniforms</Kicker>
          <h2 id="official-title" data-reveal className="display-lg mt-6">
            <Lines lines={["Official", <>jerseys<span className="text-gold">.</span></>]} />
          </h2>
          <p data-fade className="lede mt-6 max-w-md">
            Collared official jerseys for staff, schools, events and team officials, finished with your logo.
          </p>
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
          <a href={href} data-cursor="View" aria-label={`${j.name} official jersey: view ${categories.officials.label}`} className="group relative mx-auto block aspect-[4/3] max-h-[62vh] overflow-hidden bg-ink lg:aspect-[1600/1416]">
            <AnimatePresence initial={false}>
              <motion.div
                key={j.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0 0 0 100%)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.9, ease }}
              >
                <Img
                  {...poloSet(j.id)}
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  alt={`iTHREE ${j.name.toLowerCase()} official jersey, front and back`}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-0 left-0 z-10 flex items-center gap-3 bg-white px-4 py-3">
              <span aria-hidden className="h-3 w-3 rounded-full ring-1 ring-ink/20" style={{ backgroundColor: j.swatch }} />
              <span className="label text-ink">Official jersey · {j.name}</span>
            </span>
          </a>

          <ul className="no-scrollbar mt-3 hidden gap-3 overflow-x-auto lg:flex">
            {officialJerseys.map((o, n) => (
              <li key={o.id} className="min-w-0 flex-1">
                <button
                  type="button"
                  onClick={() => pick(n)}
                  aria-label={`Show the ${o.name.toLowerCase()} official jersey`}
                  className={`block w-full overflow-hidden transition-opacity duration-300 ${n === i ? "opacity-100 ring-2 ring-ink" : "opacity-55 hover:opacity-100"}`}
                >
                  <Img src={`/images/uniforms/polo-${o.id}-800.webp`} alt="" width={800} height={708} className="aspect-square w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:col-span-5 lg:row-start-2 lg:self-end">
          <fieldset data-fade className="lg:mt-10">
            <legend className="label text-mute">
              Colour <span className="text-ink">{j.name}</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-3">
              {officialJerseys.map((o, n) => {
                const on = n === i;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => pick(n)}
                    aria-pressed={on}
                    aria-label={`${o.name} official jersey`}
                    title={o.name}
                    className={`relative h-10 w-10 rounded-full sm:h-11 sm:w-11 transition-transform duration-300 hover:scale-110 ${on ? "ring-2 ring-ink ring-offset-2 ring-offset-paper sm:ring-offset-4" : "ring-1 ring-ink/15"}`}
                    style={{ backgroundColor: o.swatch }}
                  />
                );
              })}
            </div>
          </fieldset>

          <div data-fade className="mt-10 flex flex-wrap gap-3">
            <Button href={href}>View {categories.officials.label}</Button>
            <Button href={pages.contact.href} variant="outline">
              Get a quote
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
