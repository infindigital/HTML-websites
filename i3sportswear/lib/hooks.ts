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

export type Theme = "dark" | "light";
const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

/** Current site theme, following the data-theme attribute on <html>. */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const mo = new MutationObserver(onChange);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    readTheme,
    () => "dark",
  );
}

export function setTheme(theme: Theme) {
  if (theme === "light") document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  try {
    localStorage.setItem("ithree-theme", theme);
  } catch {}
}
