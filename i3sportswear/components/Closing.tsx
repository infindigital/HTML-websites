"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { bySlug, jerseySrc } from "@/lib/products";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { Button, Lines, Logo, Mark } from "./ui";
import { contactHref, pages, productLinks, site, telHref } from "@/lib/site";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

/**
 * Final CTA. A centred composition in both themes: one kit at a time inside a
 * gold ring, the headline and actions beneath.
 */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-cta-title] .line-mask > span",
          { y: 0, yPercent: 120 },
          { y: 0, yPercent: 0, stagger: 0.1, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 60%" } },
        );
        gsap.from("[data-cta-actions]", {
          y: 20,
          autoAlpha: 0,
          duration: 1,
          delay: 0.35,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const talk = contactHref("Hi iTHREE, I'd like to talk about a team kit.");

  return (
    <section id="quote" ref={root} aria-labelledby="cta-title" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-ink">
      {/* A soft warm glow behind the kit ring. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(38%_42%_at_50%_30%,color-mix(in_srgb,var(--color-gold)_12%,transparent),transparent_72%)]"
      />

      <div className="shell relative flex flex-col items-center py-20 text-center">
        <KitRing />
        <p className="eyebrow mt-10 flex items-center gap-3 text-faint">
          <Mark /> Get a quote
        </p>
        <h2 id="cta-title" data-cta-title className="display-lg mt-6 max-w-[14ch]">
          <Lines lines={["Ready to build", <>your team kit<span className="text-gold-soft">?</span></>]} outer="js-hidden-line" />
        </h2>
        <div data-cta-actions className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="#lab" cursor="explore">
            Start your design
          </Button>
          <Button href={talk} variant="outline">
            Talk to our team
          </Button>
        </div>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-bone/70">
          <a href={site.whatsappUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-bone">
            <WhatsAppIcon /> WhatsApp
          </a>
          <a href={telHref} className="inline-flex items-center gap-2 hover:text-bone">
            <PhoneIcon className="h-4 w-4" /> {site.contact.phone}
          </a>
          <span className="inline-flex items-center gap-2">
            <PinIcon className="h-4 w-4" /> {site.contact.location}
          </span>
        </p>
      </div>
    </section>
  );
}

// Bright kits that read on both themes, one per sport where possible.
const ringKits = ["sky-brush", "coral-teal", "yellow-circuit", "ivory-gold", "teal-stripe", "azure-geo"].map(bySlug);

/**
 * One kit at a time inside a thin gold ring, like the centre
 * circle of the pitch. The kit breaks out of the ring; an outer dashed ring
 * with a gold marker turns slowly; kits change every few seconds while the
 * section is on screen (not under reduced motion).
 */
function KitRing() {
  const box = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !box.current) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setI((n) => (n + 1) % ringKits.length), 2800);
    });
    io.observe(box.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [reduce]);

  const kit = ringKits[i];

  return (
    <div ref={box} className="flex flex-col items-center">
      <div aria-hidden className="relative aspect-square w-[min(62vw,300px)] lg:w-[clamp(260px,22vw,340px)]">
        <span className="absolute inset-0 rounded-full ring-1 ring-gold/50" />
        <span className="absolute -inset-[9%] animate-[spin_36s_linear_infinite] rounded-full border border-dashed border-gold/35">
          <span className="absolute top-1/2 -left-[5px] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-gold-soft" />
        </span>
        <span className="absolute inset-[18%] rounded-full bg-[var(--stage)] shadow-[0_30px_60px_-30px_var(--product-shadow)]" />
        {/* The kit is wider than the ring so it breaks out of the frame. */}
        <div className="absolute top-1/2 left-1/2 aspect-[5/4] w-[150%] -translate-x-1/2 -translate-y-1/2">
          <AnimatePresence initial={false}>
            <motion.div
              key={kit.slug}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={jerseySrc(kit.slug)} alt="" fill sizes="(min-width: 1024px) 34vw, 90vw" className="object-contain drop-shadow-[0_24px_24px_var(--product-shadow)]" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="eyebrow mt-10 text-faint" aria-live="off">
        <span className="text-gold-soft">{kit.sport}</span> · {kit.colourway}
      </p>
    </div>
  );
}

export function Footer() {
  const { email, phone, address, hours } = site.contact;
  const instagram = site.social.find((s) => s.label === "Instagram")?.href;
  const year = new Date().getFullYear();
  const link = "text-bone/80 transition-colors hover:text-gold-soft";

  return (
    <footer className="border-t border-bone/10 bg-ink pt-24 pb-28">
      <div className="shell">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href="/" aria-label="iTHREE Sportswear home" className="block h-32 w-fit sm:h-40">
              <Logo />
            </a>
            <p className="mt-8 font-display text-lg font-semibold tracking-tight">{site.legalName}</p>
            <p className="lede mt-3 max-w-sm">{site.summary}</p>
            <div className="mt-8 flex items-center gap-3">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="iThree Sports Wear on Instagram (opens in a new tab)"
                  className="flex h-11 w-11 items-center justify-center rounded-full text-bone/80 ring-1 ring-bone/20 transition hover:text-gold-soft hover:ring-gold-soft"
                >
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </a>
              )}
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener"
                aria-label="Chat with iThree Sports Wear on WhatsApp (opens in a new tab)"
                className="flex h-11 w-11 items-center justify-center rounded-full text-bone/80 ring-1 ring-bone/20 transition hover:text-gold-soft hover:ring-gold-soft"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Company" className="lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-faint">Company</p>
            <ul className="mt-6 flex flex-col gap-3">
              {[{ label: "Home", href: "/" }, pages.about, pages.products, pages.contact].map((n) => (
                <li key={n.label}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Products" className="lg:col-span-2">
            <p className="eyebrow text-faint">Products</p>
            <ul className="mt-6 flex flex-col gap-3">
              {productLinks.map((n) => (
                <li key={n.label}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="eyebrow text-faint">Contact</p>
            <address className="mt-6 flex flex-col gap-4 text-bone/80 not-italic">
              <a href={telHref} className="flex items-center gap-3 transition-colors hover:text-gold-soft">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-soft" />
                {phone}
              </a>
              <a href={site.whatsappUrl} target="_blank" rel="noopener" className="flex items-center gap-3 transition-colors hover:text-gold-soft">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold-soft" />
                WhatsApp {phone}
              </a>
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 break-all transition-colors hover:text-gold-soft">
                  <MailIcon className="h-4 w-4 shrink-0 text-gold-soft" />
                  {email}
                </a>
              )}
              <span className="flex items-start gap-3">
                <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold-soft" />
                {address}
              </span>
            </address>
            <p className="eyebrow mt-10 text-faint">Opening hours</p>
            <p className="mt-4 flex items-start gap-3 text-bone/80">
              <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-gold-soft" />
              <span>
                {hours.days}
                <br />
                {hours.time}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-24 flex flex-col-reverse gap-6 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-faint">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <a href="#top" className="eyebrow inline-flex items-center gap-3 text-bone/60 hover:text-bone">
            Back to top
            <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 -rotate-90" fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
