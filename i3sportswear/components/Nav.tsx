"use client";

import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, Button, Logo, Mark } from "./ui";
import { ChevronIcon, ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { menu, site, telHref, type NavLink } from "@/lib/site";
import { setTheme, useTheme } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [intro, setIntro] = useState(true);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      setIntro(window.scrollY < window.innerHeight * 0.3);
    };
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
          open
            ? "border-b border-bone/[0.07] bg-coal"
            : scrolled
              ? "border-b border-bone/[0.07] bg-ink/70 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-transparent"
        }`}
      >
        <TopBar hidden={scrolled && !open} />
        <nav
          aria-label="Primary"
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-700 ease-[var(--ease-out-expo)] ${
            scrolled ? "h-[4.25rem] lg:h-[4.5rem]" : "h-[5.25rem] lg:h-[6.25rem]"
          }`}
        >
          <a
            href="/"
            onClick={toTop}
            aria-label="iTHREE Sportswear home"
            className={`relative z-10 block shrink-0 transition-[height] duration-700 ease-[var(--ease-out-expo)] ${
              scrolled ? "h-11 lg:h-12" : "h-14 lg:h-[4.25rem]"
            }`}
          >
            <Logo priority />
          </a>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
            {menu.map((item) =>
              item.children ? (
                <ProductsMenu key={item.label} item={item} items={item.children} />
              ) : (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ),
            )}
          </ul>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <ThemeSwitch theme={theme} />
            <Button
              href={site.whatsappUrl}
              variant="outline"
              size="sm"
              aria-label="Chat with iThree Sports Wear on WhatsApp (opens in a new tab)"
              className="max-sm:hidden!"
            >
              <span className="flex items-center gap-2">
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp
              </span>
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
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between gap-12 overflow-y-auto overscroll-contain bg-coal pt-40 pb-10 lg:hidden"
          >
            <ul className="shell">
              {menu.map((item, i) => (
                <li key={item.label} className="border-b border-bone/10">
                  <div className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => (item.href === "/" ? (toTop(e), setOpen(false)) : setOpen(false))}
                      aria-current={item.href === "/" ? "page" : undefined}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
                      className="flex items-baseline justify-between py-4 font-display text-[clamp(1.75rem,8vw,2.5rem)] leading-none font-semibold tracking-[-0.035em] uppercase"
                    >
                      {item.label}
                      <span className="eyebrow text-gold-soft">0{i + 1}</span>
                    </motion.a>
                  </div>
                  {item.children && (
                    <motion.ul
                      aria-label={`${item.label} categories`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="grid grid-cols-2 gap-x-6 pb-5"
                    >
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <a
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 py-2.5 text-[0.95rem] text-bone/75 transition-colors hover:text-gold-soft"
                          >
                            <Mark className="rotate-90" />
                            {c.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
            <motion.div
              className="shell flex flex-col gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <Button href={site.whatsappUrl} aria-label="Chat with iThree Sports Wear on WhatsApp (opens in a new tab)">
                <span className="flex items-center gap-2.5">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </span>
              </Button>
              <ContactList className="text-sm text-bone/75" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppFloat hidden={open} intro={intro} />
    </>
  );
}

/** On the homepage, "Home" and the logo scroll back to the top instead of reloading. */
function toTop(e: MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== "/") return;
  e.preventDefault();
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

function NavItem({ item }: { item: NavLink }) {
  const home = item.href === "/";
  return (
    <a
      href={item.href}
      onClick={home ? toTop : undefined}
      aria-current={home ? "page" : undefined}
      className="eyebrow group relative block py-2 text-bone/75 transition-colors duration-300 hover:text-bone aria-[current=page]:text-bone"
    >
      {item.label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold-soft transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${
          home ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </a>
  );
}

/**
 * Products: the label links to the WordPress products page; hovering, or the
 * chevron button (keyboard and touch), opens the category list.
 */
function ProductsMenu({ item, items }: { item: NavLink; items: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const box = useRef<HTMLLIElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    const onDown = (e: PointerEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <li
      ref={box}
      className="relative flex items-center gap-1.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <NavItem item={item} />
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${item.label} categories`}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-8 w-8 items-center justify-center text-bone/60 transition-colors hover:text-bone"
      >
        <ChevronIcon className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* pt bridges the gap so the pointer can travel into the list */}
      <div
        id={id}
        className={`absolute top-full left-1/2 w-64 -translate-x-1/2 pt-3 transition-[opacity,visibility,translate] duration-300 ease-[var(--ease-out-expo)] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="border border-bone/10 bg-coal/95 py-2 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl">
          {items.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                className="group flex items-center justify-between px-5 py-2.5 text-[0.9375rem] text-bone/80 transition-colors hover:bg-bone/[0.05] hover:text-bone"
              >
                {c.label}
                <Mark className="rotate-90 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </li>
          ))}
          <li className="mt-1 border-t border-bone/10 pt-1">
            <a href={item.href} className="eyebrow flex items-center justify-between px-5 py-3 text-gold-soft hover:text-bone">
              All products
              <Arrow />
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
}

/** Compact bar above the menu: hours, phone, location and socials, as on the original site. */
function TopBar({ hidden }: { hidden: boolean }) {
  const { hours, phone, location } = site.contact;
  const instagram = site.social.find((s) => s.label === "Instagram")?.href;
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] ${
        hidden ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      }`}
      inert={hidden}
    >
      <div className="overflow-hidden">
        <div className="border-b border-bone/10">
          <div className="shell flex h-9 items-center justify-between gap-4 text-[0.75rem] text-bone/70">
            <ul className="flex min-w-0 items-center gap-x-5 sm:gap-x-7">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <ClockIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                <span className="md:hidden">{hours.short}</span>
                <span className="hidden md:inline">
                  {hours.days}, {hours.time}
                </span>
              </li>
              <li className="hidden sm:block">
                <a href={telHref} className="flex items-center gap-2 whitespace-nowrap transition-colors hover:text-bone">
                  <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                  {phone}
                </a>
              </li>
              <li className="hidden items-center gap-2 whitespace-nowrap lg:flex">
                <PinIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                {location}
              </li>
            </ul>
            <ul className="flex shrink-0 items-center gap-1">
              <li className="sm:hidden">
                <a href={telHref} aria-label={`Call ${phone}`} className="flex h-8 w-8 items-center justify-center hover:text-bone">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </a>
              </li>
              {instagram && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener"
                    aria-label="iThree Sports Wear on Instagram (opens in a new tab)"
                    className="flex h-8 w-8 items-center justify-center hover:text-bone"
                  >
                    <InstagramIcon className="h-3.5 w-3.5" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label="Chat with iThree Sports Wear on WhatsApp (opens in a new tab)"
                  className="flex h-8 w-8 items-center justify-center hover:text-bone"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Phone, email, address, hours and Instagram as a stacked list (mobile menu). */
function ContactList({ className = "" }: { className?: string }) {
  const { phone, email, address, hours } = site.contact;
  const instagram = site.social.find((s) => s.label === "Instagram")?.href;
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      <li>
        <a href={telHref} className="flex items-center gap-3 hover:text-bone">
          <PhoneIcon className="h-4 w-4 shrink-0 text-gold-soft" />
          {phone}
        </a>
      </li>
      {email && (
        <li>
          <a href={`mailto:${email}`} className="flex items-center gap-3 break-all hover:text-bone">
            <MailIcon className="h-4 w-4 shrink-0 text-gold-soft" />
            {email}
          </a>
        </li>
      )}
      <li className="flex items-start gap-3">
        <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
        {hours.days}, {hours.time}
      </li>
      <li className="flex items-start gap-3">
        <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" />
        {address}
      </li>
      {instagram && (
        <li>
          <a href={instagram} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-bone">
            <InstagramIcon className="h-4 w-4 shrink-0 text-gold-soft" />
            @i3_sportswear
          </a>
        </li>
      )}
    </ul>
  );
}

/**
 * Floating WhatsApp button, always in reach on every screen size. On desktop
 * it waits until the visitor scrolls past the opening frame, where the header
 * already carries a WhatsApp button, so it never sits on the hero actions.
 */
function WhatsAppFloat({ hidden, intro }: { hidden: boolean; intro: boolean }) {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener"
      aria-label="Chat with iThree Sports Wear on WhatsApp (opens in a new tab)"
      className={`group enter-fade fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.55)] transition-[translate,scale,opacity,visibility] duration-500 [animation-delay:1400ms] hover:scale-105 lg:right-8 lg:bottom-8 ${
        hidden ? "invisible opacity-0" : intro ? "lg:invisible lg:translate-y-3 lg:opacity-0" : ""
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span
        aria-hidden
        className="eyebrow pointer-events-none absolute right-full mr-3 hidden translate-x-1 bg-bone px-3 py-2 whitespace-nowrap text-ink opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block"
      >
        Chat with us
      </span>
    </a>
  );
}

/** Two separate theme buttons, moon for dark and sun for light; the active one is filled gold. */
function ThemeSwitch({ theme }: { theme: "dark" | "light" }) {
  const options = [
    { value: "dark", label: "Dark theme", Icon: Moon },
    { value: "light", label: "Light theme", Icon: Sun },
  ] as const;
  return (
    <div role="group" aria-label="Theme" className="flex items-center gap-1 sm:gap-1.5">
      {options.map(({ value, label, Icon }) => {
        const on = theme === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
            aria-label={label}
            title={label}
            onClick={() => !on && setTheme(value)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 sm:h-9 sm:w-9 ${
              on ? "bg-gold-soft text-ink" : "text-bone/80 ring-1 ring-bone/35 ring-inset hover:text-bone hover:ring-bone/60"
            }`}
          >
            <Icon />
          </button>
        );
      })}
    </div>
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
