"use client";

import type { RefObject } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveals inside `scope`: masked lines under [data-reveal] rise in
 * turn, [data-fade] elements fade up. Under reduced motion (or without JS)
 * everything is simply visible; see the .js rules in globals.css.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el.querySelectorAll(".mask > span"), { y: 0, yPercent: 110 }, {
            y: 0,
            yPercent: 0,
            stagger: 0.08,
            duration: 1.15,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 18 }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: Number(el.dataset.fade || 0),
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope },
  );
}
