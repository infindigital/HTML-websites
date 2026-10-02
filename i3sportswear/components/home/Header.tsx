"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Arrow, Button, Img, Logo } from "./ui";
import { ClockIcon, InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon, ChevronIcon } from "../icons";
import { categoryList, mainMenu, pages, type NavLink } from "@/config/navigation";
import { ADDRESSES, INSTAGRAM, OPENING_HOURS, PHONE, WHATSAPP } from "@/config/site";
import { sports } from "@/config/content";
import { jerseySet } from "@/config/jerseys";

const ease = [0.16, 1, 0.3, 1] as const;

/** Preview image for each category, shared with the sports section. */
function categoryImage(key: string) {
  const s = sports.find((x) => x.key === key);
  if (!s) return null;
  return s.image.kind === "jersey" ? { ...jerseySet(s.image.id, "front"), contain: true } : { src: s.image.src, srcSet: s.image.srcSet, width: 1600, height: 1416, contain: false };
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

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
    panel.current?.querySelector<HTMLElement>("a,button")?.focus();
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

  const solid = scrolled || open;

  return (
    <>
      <a href="#main" className="label fixed top-3 left-3 z-[70] -translate-y-24 bg-ink px-4 py-3 text-white focus:translate-y-0">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-expo)] ${
          solid ? "border-b border-line bg-white/85 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
        }`}
      >
        <TopBar hidden={scrolled && !open} />
        <nav
          aria-label="Primary"
          className={`shell flex items-center justify-between gap-6 transition-[height] duration-500 ease-[var(--ease-out-expo)] ${
            scrolled ? "h-[4.25rem] lg:h-[4.5rem]" : "h-[5rem] lg:h-[6rem]"
          }`}
        >
          <a
            href={pages.home.href}
            aria-label="iTHREE Sports Wear home"
            className={`relative z-10 block shrink-0 transition-[height] duration-500 ease-[var(--ease-out-expo)] ${
              scrolled ? "h-12 lg:h-[3.25rem]" : "h-14 lg:h-[4.25rem]"
            }`}
          >
            <Logo priority />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {mainMenu.map((item) =>
              item.children ? (
                <ProductsMenu key={item.label} item={item} />
              ) : (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ),
            )}
          </ul>

          <div className="relative z-10 flex items-center gap-3">
            <Button href={pages.contact.href} variant="outline" size="sm" className="max-md:hidden!">
              Get a quote
            </Button>
            <Button
              href={WHATSAPP.href}
              size="sm"
              aria-label="WhatsApp us (opens in a new tab)"
              className="max-sm:hidden!"
              icon={<WhatsAppIcon className="h-3.5 w-3.5" />}
            >
              WhatsApp
            </Button>
            <button
              ref={menuButton}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="label flex h-11 min-w-11 items-center justify-center gap-3 text-ink lg:hidden"
            >
              <span className="sr-only xs:not-sr-only">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span className={`absolute left-0 h-[1.5px] w-7 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-[1.5px] w-7 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>{open && <MobileMenu panelRef={panel} close={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}

function NavItem({ item }: { item: NavLink }) {
  const home = item.href === pages.home.href;
  return (
    <a
      href={item.href}
      aria-current={home ? "page" : undefined}
      className="label group relative block py-2 text-ink/70 transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink"
    >
      {item.label}
      <span
        aria-hidden
        className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100 ${
          home ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </a>
  );
}

/**
 * Products: the label links to the WordPress products page. Hover, or the
 * chevron (keyboard and touch), opens a mega menu of every category with a
 * preview that follows the highlighted sport.
 */
function ProductsMenu({ item }: { item: NavLink }) {
  const [open, setOpen] = useState(false);
  const [hot, setHot] = useState(categoryList[0].key as string);
  const id = useId();
  const box = useRef<HTMLLIElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const show = () => (clearTimeout(closeTimer.current), setOpen(true));
  const hide = () => (closeTimer.current = setTimeout(() => setOpen(false), 120));
  const img = categoryImage(hot);

  return (
    <li
      ref={box}
      className="flex items-center gap-1"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <NavItem item={item} />
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${item.label}: show categories`}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:text-ink"
      >
        <ChevronIcon className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={id}
        className={`absolute inset-x-0 top-full transition-[opacity,visibility,translate] duration-400 ease-[var(--ease-out-expo)] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mt-px border-y border-line bg-white shadow-[0_40px_80px_-40px_rgb(0_0_0/0.25)]">
          <div className="shell grid grid-cols-12 gap-10 py-10">
            <div className="col-span-3 flex flex-col justify-between">
              <div>
                <p className="label text-gold-deep">Products</p>
                <p className="display-md mt-4 max-w-[12ch]">Kits for every sport you play.</p>
              </div>
              <a href={item.href} className="label group mt-8 inline-flex items-center gap-3 text-ink">
                All products
                <Arrow className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <ul className="col-span-6 grid grid-cols-2 gap-x-10">
              {categoryList.map((c, i) => (
                <li key={c.key} className="border-b border-line">
                  <a
                    href={c.href}
                    onMouseEnter={() => setHot(c.key)}
                    onFocus={() => setHot(c.key)}
                    className="group flex items-baseline justify-between py-3.5"
                  >
                    <span className="font-display text-xl font-semibold tracking-tight transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
                      {c.label}
                    </span>
                    <span className="label text-faint group-hover:text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div aria-hidden className="relative col-span-3 h-64 overflow-hidden bg-paper">
              {img && (
                <Img
                  key={hot}
                  src={img.src}
                  srcSet={img.srcSet}
                  sizes="20vw"
                  width={img.width}
                  height={img.height}
                  alt=""
                  className={`enter-fade absolute inset-0 h-full w-full ${img.contain ? "object-contain p-3" : "object-cover"}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/** Compact bar above the menu: hours, phone, location and socials. */
function TopBar({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
        hidden ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      }`}
      inert={hidden}
    >
      <div className="overflow-hidden">
        <div className="bg-ink text-white/80">
          <div className="shell flex h-9 items-center justify-between gap-4 text-[0.75rem]">
            <ul className="flex min-w-0 items-center gap-x-6">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <ClockIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                <span className="md:hidden">{OPENING_HOURS.short}</span>
                <span className="hidden md:inline">
                  {OPENING_HOURS.days}, {OPENING_HOURS.time}
                </span>
              </li>
              <li className="hidden sm:block">
                <a href={PHONE.href} className="flex items-center gap-2 whitespace-nowrap hover:text-white">
                  <PhoneIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                  {PHONE.display}
                </a>
              </li>
              <li className="hidden items-center gap-2 whitespace-nowrap lg:flex">
                <PinIcon className="h-3.5 w-3.5 shrink-0 text-gold-soft" />
                {ADDRESSES.map((a) => a.city).join(" · ")}
              </li>
            </ul>
            <ul className="flex shrink-0 items-center">
              <li className="sm:hidden">
                <a href={PHONE.href} aria-label={`Call ${PHONE.display}`} className="flex h-8 w-8 items-center justify-center hover:text-white">
                  <PhoneIcon className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a href={INSTAGRAM.href} target="_blank" rel="noopener" aria-label="Instagram (opens in a new tab)" className="flex h-8 w-8 items-center justify-center hover:text-white">
                  <InstagramIcon className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <a href={WHATSAPP.href} target="_blank" rel="noopener" aria-label="WhatsApp (opens in a new tab)" className="flex h-8 w-8 items-center justify-center hover:text-white">
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

/** Full-screen mobile menu: large type, categories in two columns, contact at the foot. */
function MobileMenu({ panelRef, close }: { panelRef: React.RefObject<HTMLDivElement | null>; close: () => void }) {
  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      data-lenis-prevent
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.75, ease }}
      className="fixed inset-0 z-40 flex flex-col justify-between gap-12 overflow-y-auto overscroll-contain bg-white pt-36 pb-10 lg:hidden"
    >
      <ul className="shell">
        {mainMenu.map((item, i) => (
          <li key={item.label} className="border-b border-line">
            <div className="overflow-hidden">
              <motion.a
                href={item.href}
                onClick={close}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease, delay: 0.12 + i * 0.06 }}
                className="flex items-baseline justify-between py-4 font-display text-[clamp(2rem,9vw,3rem)] leading-none font-bold tracking-[-0.04em] uppercase"
              >
                {item.label}
                <span className="label text-gold-deep">0{i + 1}</span>
              </motion.a>
            </div>
            {item.children && (
              <motion.ul
                aria-label="Product categories"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="grid grid-cols-2 gap-x-6 pb-5"
              >
                {item.children.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} onClick={close} className="block py-2.5 text-[0.98rem] text-ink/75 hover:text-ink">
                      {c.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </li>
        ))}
      </ul>
      <motion.div className="shell flex flex-col gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.6 }}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Button href={pages.contact.href} variant="outline">
            Get a quote
          </Button>
          <Button href={WHATSAPP.href} icon={<WhatsAppIcon />}>
            WhatsApp us
          </Button>
        </div>
        <ul className="flex flex-col gap-2.5 text-sm text-mute">
          <li>
            <a href={PHONE.href} className="hover:text-ink">
              {PHONE.display}
            </a>
          </li>
          <li>
            {OPENING_HOURS.days}, {OPENING_HOURS.time}
          </li>
          {ADDRESSES.map((a) => (
            <li key={a.city}>{a.full}</li>
          ))}
          <li>
            <a href={INSTAGRAM.href} target="_blank" rel="noopener" className="hover:text-ink">
              Instagram {INSTAGRAM.handle}
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
