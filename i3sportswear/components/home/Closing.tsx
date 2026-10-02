"use client";

import { useRef } from "react";
import { Button, Img, Kicker, Lines, Logo } from "./ui";
import { useReveal } from "./useReveal";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../icons";
import { categoryList, pages } from "@/config/navigation";
import { ADDRESSES, BRAND, EMAIL, INSTAGRAM, OPENING_HOURS, PHONE, WHATSAPP } from "@/config/site";
import { jerseySet } from "@/config/jerseys";

const LINEUP = ["black-gold", "blue-geometric", "yellow-basketball", "red-wolf", "blue-brushstroke"];

/** 10: Final CTA. The squad seen from behind, names and numbers out. */
export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} aria-labelledby="cta-title" className="relative overflow-hidden bg-paper pt-24 lg:pt-36">
      <div className="shell relative z-10 text-center">
        <Kicker className="justify-center">Get a quote</Kicker>
        <h2 id="cta-title" data-reveal className="display-xl mx-auto mt-6 max-w-[16ch]">
          <Lines lines={["Ready to build", <>your team kit<span className="text-gold">?</span></>]} />
        </h2>
        <p data-fade className="lede mx-auto mt-6 max-w-lg">
          Tell us about your sport, colours, players and design requirements.
        </p>
        <div data-fade className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={pages.contact.href} cursor="Quote">
            Get a quote
          </Button>
          <Button href={WHATSAPP.href} variant="outline" icon={<WhatsAppIcon />}>
            WhatsApp us
          </Button>
        </div>
      </div>
      <div aria-hidden className="relative mx-auto mt-14 flex h-[min(62vw,520px)] max-w-[1400px] items-end justify-center lg:mt-20">
        {LINEUP.map((id, i) => {
          const mid = (LINEUP.length - 1) / 2;
          const d = Math.abs(i - mid);
          return (
            <div key={id} data-fade={String(0.08 * i)} className="relative -mx-[3.2%] h-full" style={{ zIndex: 10 - d, height: `${100 - d * 9}%` }}>
              <Img {...jerseySet(id, "back")} sizes="22vw" alt="" className="h-full w-auto object-contain object-bottom" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Contact: the details plus one "Request a quote" button that takes visitors to
 * the contact form on the WordPress Contact page.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="border-t border-line bg-white py-14 lg:py-16">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-6">
          <Kicker index="10">Contact</Kicker>
          <h2 id="contact-title" data-reveal className="display-lg mt-4 text-[clamp(2.25rem,5vw,3.75rem)]">
            <Lines lines={[<>Contact us<span className="text-gold">.</span></>]} />
          </h2>
          <p data-fade className="mt-4 max-w-lg text-mute">
            Tell us about your team, your sport and what you need on our contact form, and we&rsquo;ll get back to you with designs and a quote.
          </p>
          <div data-fade className="mt-6">
            <Button href={pages.contact.href} cursor="Quote">Request a quote</Button>
          </div>
        </div>

        <ul data-fade className="flex flex-col border border-line text-[0.95rem] text-mute lg:col-span-6 lg:col-start-7">
          <li className="border-b border-line">
            <a href={PHONE.href} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-paper hover:text-ink">
              <PhoneIcon className="h-4 w-4 shrink-0 text-gold-deep" /> {PHONE.display}
            </a>
          </li>
          {EMAIL && (
            <li className="border-b border-line">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 break-all px-5 py-3.5 transition-colors hover:bg-paper hover:text-ink">
                <MailIcon className="h-4 w-4 shrink-0 text-gold-deep" /> {EMAIL}
              </a>
            </li>
          )}
          <li className="flex items-start gap-4 border-b border-line px-5 py-3.5">
            <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-gold-deep" /> {OPENING_HOURS.days}, {OPENING_HOURS.time}
          </li>
          {ADDRESSES.map((a, n) => (
            <li key={a.city} className={`flex items-start gap-4 px-5 py-3.5 ${n < ADDRESSES.length - 1 ? "border-b border-line" : ""}`}>
              <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold-deep" />
              <span>
                <span className="label mb-1 block text-ink/60">{a.city}</span>
                {a.full}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const link = "text-ink/75 transition-colors hover:text-ink";
  return (
    <footer className="bg-paper pt-14 pb-24 text-[0.92rem] lg:pb-8">
      <div className="shell">
        <div className="grid gap-10 border-t border-ink pt-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href={pages.home.href} aria-label="iTHREE Sports Wear home" className="block h-16 w-fit">
              <Logo />
            </a>
            <p className="mt-5 max-w-xs font-display text-base font-semibold tracking-tight">{BRAND.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a href={INSTAGRAM.href} target="_blank" rel="noopener" aria-label="Instagram (opens in a new tab)" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={WHATSAPP.href} target="_blank" rel="noopener" aria-label="WhatsApp (opens in a new tab)" className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <p className="label text-faint">Quick links</p>
            <ul className="mt-4 flex flex-col gap-2">
              {[pages.home, pages.about, pages.products, pages.contact].map((n) => (
                <li key={n.label}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sports" className="lg:col-span-3">
            <p className="label text-faint">Sports</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {categoryList.map((n) => (
                <li key={n.key}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-3">
            <p className="label text-faint">Contact</p>
            <address className="mt-4 flex flex-col gap-2 text-ink/75 not-italic">
              <a href={PHONE.href} className={link}>
                {PHONE.display}
              </a>
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>
                  {EMAIL}
                </a>
              )}
              {ADDRESSES.map((a) => (
                <span key={a.city}>{a.full}</span>
              ))}
              <span>
                {OPENING_HOURS.days}, {OPENING_HOURS.time}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:pr-24">
          <p className="text-sm text-mute">
            &copy; {year} {BRAND.legalName}. All rights reserved.
          </p>
          <a href="#top" className="label inline-flex items-center gap-3 text-ink/70 hover:text-ink">
            Back to top
            <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 -rotate-90" fill="none">
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Floating WhatsApp button, always within reach. */
export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP.href}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp us (opens in a new tab)"
      className="group enter-fade fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] transition-transform duration-300 [animation-delay:1200ms] hover:scale-105 lg:right-8 lg:bottom-8"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span aria-hidden className="label pointer-events-none absolute right-full mr-3 hidden translate-x-1 bg-ink px-3 py-2 whitespace-nowrap text-white opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        WhatsApp us
      </span>
    </a>
  );
}

