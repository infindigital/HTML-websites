"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img, Kicker, Lines } from "./ui";
import { useReveal } from "./useReveal";
import { reasons } from "@/config/content";
import { jerseyById, jerseySet } from "@/config/jerseys";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * 08: Why choose iTHREE. An interactive list: hovering or tapping a reason
 * opens it and brings up a close-up of a kit beside the list.
 */
export default function WhyChoose() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);
  const uid = useId();
  useReveal(root);
  const r = reasons[open];
  const kit = jerseyById(r.jersey);

  return (
    <section id="why" ref={root} aria-labelledby="why-title" className="bg-white py-24 lg:py-36">
      <div className="shell">
        <Kicker index="07">Why iTHREE</Kicker>
        <h2 id="why-title" data-reveal className="display-lg mt-6 max-w-4xl">
          <Lines lines={["Why teams", <>choose iTHREE<span className="text-gold">.</span></>]} />
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <ul className="lg:col-span-7">
            {reasons.map((item, i) => {
              const on = i === open;
              return (
                <li key={item.title} className="border-t border-line last:border-b" onMouseEnter={() => setOpen(i)}>
                  <h3>
                    <button
                      type="button"
                      id={`${uid}-h${i}`}
                      aria-expanded={on}
                      aria-controls={`${uid}-p${i}`}
                      onClick={() => setOpen(i)}
                      className="group flex w-full items-center gap-5 py-6 text-left lg:py-7"
                    >
                      <span className={`label w-8 shrink-0 transition-colors ${on ? "text-gold-deep" : "text-faint"}`}>0{i + 1}</span>
                      <span className={`flex-1 font-display text-[clamp(1.4rem,2.6vw,2.4rem)] leading-tight font-semibold tracking-[-0.03em] transition-colors duration-300 ${on ? "text-ink" : "text-ink/35 group-hover:text-ink/70"}`}>
                        {item.title}
                      </span>
                      <span aria-hidden className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ${on ? "rotate-45" : ""}`}>
                        <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
                        <span className="absolute top-0 left-1/2 h-4 w-[1.5px] -translate-x-1/2 bg-ink" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${uid}-p${i}`}
                    role="region"
                    aria-labelledby={`${uid}-h${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-lg pb-7 pl-13 text-mute">{item.text}</p>
                      {/* Phones: the close-up sits inside the open item */}
                      <div className="mb-7 ml-13 h-56 overflow-hidden lg:hidden" style={{ backgroundColor: jerseyById(item.jersey).tone }}>
                        {on && (
                          <Img {...jerseySet(item.jersey, "front")} sizes="60vw" alt="" className="h-[220%] w-full object-cover" style={{ objectPosition: item.focus }} />
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div aria-hidden className="relative hidden overflow-hidden lg:col-span-5 lg:block" style={{ backgroundColor: kit.tone }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={open}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <Img {...jerseySet(r.jersey, "front")} sizes="40vw" alt="" className="h-[190%] w-full max-w-none object-cover" style={{ objectPosition: r.focus }} />
              </motion.div>
            </AnimatePresence>
            <p className="label absolute bottom-4 left-4 bg-white px-2.5 py-1.5 text-ink">{kit.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
