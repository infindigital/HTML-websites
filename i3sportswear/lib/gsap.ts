"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 1 });
}

/** Shared media conditions for gsap.matchMedia(). */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  compactOrReduced: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
};

export { gsap, ScrollTrigger, useGSAP };
