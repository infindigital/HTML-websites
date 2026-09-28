"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Logo } from "./ui";
import { contactHref, nav, site } from "@/lib/site";
import { setTheme, useTheme } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;
    const lenis = window.__lenis;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab" || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>("a,button")];
      const [a, z] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === a) (e.preventDefault(), z.focus());
      else if (!e.shiftKey && document.activeElement === z) (e.preventDefault(), a.focus());
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuButton.current?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="eyebrow fixed top-3 left-3 z-[70] -translate-y-20 bg-bone px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-700 ease-[var(--ease-out-expo)] ${
          scrolled && !open
            ? "border-b border-bone/[0.07] bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`shell flex items-center justify-between transition-[height] duration-700 ease-[var(--ease-out-expo)] ${
            scrolled ? "h-[4.25rem] lg:h-[4.5rem]" : "h-[5.25rem] lg:h-[6.25rem]"
          }`}
        >
          <a
            href="#top"
            aria-label="iTHREE Sportswear, back to top"
            className={`relative z-10 block transition-[height] duration-700 ease-[var(--ease-out-expo)] ${
              scrolled ? "h-11 lg:h-12" : "h-14 lg:h-[4.25rem]"
            }`}
          >
            <Logo priority />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="eyebrow group relative py-2 text-bone/75 transition-colors duration-300 hover:text-bone"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold-soft transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <ThemeSwitch theme={theme} />
            <Button href="#quote" variant="outline" size="sm" className="px-3! xs:px-4! sm:px-5!">
              Get a quote
            </Button>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="eyebrow flex h-11 min-w-11 items-center justify-center gap-3 text-bone lg:hidden"
            >
              <span className="sr-only xs:not-sr-only">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 h-px w-6 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-6 bg-bone transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-coal pt-28 pb-10 lg:hidden"
          >
            <ul className="shell">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-bone/10">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
                    className="display-md flex items-baseline justify-between py-5"
                  >
                    {item.label}
                    <span className="eyebrow text-gold-soft">0{i + 1}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
            <motion.div
              className="shell flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Button href="#quote" onClick={() => setOpen(false)}>
                Get a quote
              </Button>
              {site.contact.whatsapp && (
                <Button href={contactHref()} variant="outline">
                  WhatsApp
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Dark / light switch: both icons visible, a sliding thumb marks the active one. */
function ThemeSwitch({ theme }: { theme: "dark" | "light" }) {
  const light = theme === "light";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light theme"
      title={light ? "Switch to dark theme" : "Switch to light theme"}
      onClick={() => setTheme(light ? "dark" : "light")}
      className="group relative flex h-11 items-center"
    >
      <span className="relative flex h-8 w-[3.25rem] items-center justify-between rounded-full px-[6px] xs:w-[3.75rem] xs:px-[7px] ring-1 ring-bone/25 transition-colors group-hover:ring-bone/50">
        <span
          aria-hidden
          className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-gold-soft transition-transform duration-500 ease-[var(--ease-out-expo)] ${
            light ? "translate-x-[1.25rem] xs:translate-x-[1.75rem]" : "translate-x-0"
          }`}
        />
        <Moon className={`relative ${light ? "text-bone/55" : "text-ink"}`} />
        <Sun className={`relative ${light ? "text-ink" : "text-bone/55"}`} />
      </span>
    </button>
  );
}

function Moon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={`h-[15px] w-[15px] transition-colors duration-500 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M16.5 12.2A7 7 0 0 1 7.8 3.5a7 7 0 1 0 8.7 8.7Z" />
    </svg>
  );
}

function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={`h-[15px] w-[15px] transition-colors duration-500 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10" cy="10" r="3.4" />
      <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
    </svg>
  );
}
