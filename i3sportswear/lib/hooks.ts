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

/**
 * Switch theme. The choice lasts for this visit only, so every new visit
 * opens in the default dark theme. Cross-fades where the browser supports
 * view transitions and motion is allowed.
 */
export function setTheme(theme: Theme) {
  const apply = () => {
    const root = document.documentElement;
    if (theme === "light") root.dataset.theme = "light";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#faf8f3" : "#050505");
  };
  try {
    sessionStorage.setItem("ithree-theme", theme);
    const url = new URL(location.href);
    if (url.searchParams.has("theme")) {
      url.searchParams.delete("theme");
      history.replaceState(history.state, "", url);
    }
  } catch {}
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
  else apply();
}
