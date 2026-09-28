"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query subscription; `fallback` is used on the server. */
export function useMediaQuery(query: string, fallback = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useDesktop = () => useMediaQuery("(min-width: 1024px)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");
