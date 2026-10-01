"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button, Img, Kicker, Lines, Logo } from "./ui";
import { useReveal } from "./useReveal";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../icons";
import { categoryList, pages } from "@/config/navigation";
import { ADDRESS, BRAND, EMAIL, INSTAGRAM, OPENING_HOURS, PHONE, WHATSAPP, whatsappWith } from "@/config/site";
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
 * 11: Contact. The fields from the live contact form. This static page has
 * no mail server, so the form says what it does: it opens WhatsApp with the
 * details filled in. The full WordPress contact page is linked alongside.
 */
export function Contact() {
  const root = useRef<HTMLElement>(null);
  const uid = useId();
  const [sent, setSent] = useState(false);
  useReveal(root);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const lines = [
      "Hello iThree Sports Wear, I'd like a quote.",
      `Name: ${[v("first"), v("last")].filter(Boolean).join(" ")}`,
      v("email") && `Email: ${v("email")}`,
      v("phone") && `Phone: ${v("phone")}`,
      v("company") && `Team / company: ${v("company")}`,
      `Requirement: ${v("message")}`,
    ].filter(Boolean);
    window.open(whatsappWith(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  const field = "mt-2 h-14 w-full border-b border-ink/25 bg-transparent text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink";
  const fields = [
    { name: "first", label: "First name", type: "text", auto: "given-name", required: true, half: true },
    { name: "last", label: "Second name", type: "text", auto: "family-name", half: true },
    { name: "email", label: "Email", type: "email", auto: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", auto: "tel", half: true },
    { name: "company", label: "Company / team name", type: "text", auto: "organization" },
  ];

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="bg-white py-24 lg:py-36">
      <div className="shell grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker index="10">Contact</Kicker>
          <h2 id="contact-title" data-reveal className="display-lg mt-6">
            <Lines lines={["Start", <>your kit<span className="text-gold">.</span></>]} />
          </h2>
          <ul className="mt-12 flex flex-col gap-5 text-lg">
            <li>
              <a href={PHONE.href} className="flex items-center gap-4 hover:text-gold-deep">
                <PhoneIcon className="h-5 w-5 shrink-0 text-gold-deep" /> {PHONE.display}
              </a>
            </li>
            <li>
              <a href={WHATSAPP.href} target="_blank" rel="noopener" className="flex items-center gap-4 hover:text-gold-deep">
                <WhatsAppIcon className="h-5 w-5 shrink-0 text-gold-deep" /> WhatsApp {PHONE.display}
              </a>
            </li>
            {EMAIL && (
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 break-all hover:text-gold-deep">
                  <MailIcon className="h-5 w-5 shrink-0 text-gold-deep" /> {EMAIL}
                </a>
              </li>
            )}
            <li className="flex items-start gap-4">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-gold-deep" />
              <span>
                {ADDRESS.lines[0]}
                <br />
                {ADDRESS.lines[1]}
              </span>
            </li>
            <li className="flex items-start gap-4">
              <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-gold-deep" />
              <span>
                {OPENING_HOURS.days}
                <br />
                {OPENING_HOURS.time}
              </span>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-8 gap-y-8 lg:col-span-6 lg:col-start-7" aria-describedby={`${uid}-note`}>
          {fields.map((f) => (
            <label key={f.name} className={`block ${f.half ? "col-span-2 sm:col-span-1" : "col-span-2"}`}>
              <span className="label text-mute">
                {f.label}
                {f.required && <span className="text-gold-deep"> *</span>}
              </span>
              <input name={f.name} type={f.type} autoComplete={f.auto} required={f.required} className={field} />
            </label>
          ))}
          <label className="col-span-2 block">
            <span className="label text-mute">
              Requirement / message<span className="text-gold-deep"> *</span>
            </span>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="Sport, number of players, colours, deadline…"
              className="mt-2 w-full resize-y border-b border-ink/25 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-ink"
            />
          </label>
          <div className="col-span-2 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              data-magnetic
              className="group relative isolate inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-ink px-8 label tracking-[0.16em] text-white"
            >
              <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-whatsapp transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <WhatsAppIcon /> Send on WhatsApp
            </button>
            <a href={pages.contact.href} className="label text-mute underline-offset-4 hover:text-ink hover:underline">
              Or use our contact page
            </a>
          </div>
          <p id={`${uid}-note`} className="col-span-2 text-sm text-mute" aria-live="polite">
            {sent ? "WhatsApp has opened with your details. Press send there to reach us." : "Sending opens WhatsApp with your details filled in."}
          </p>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const link = "text-ink/75 transition-colors hover:text-ink";
  return (
    <footer className="bg-paper pt-24 pb-28 lg:pb-12">
      <div className="shell">
        <div className="grid gap-14 border-t border-ink pt-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <a href={pages.home.href} aria-label="iTHREE Sports Wear home" className="block h-24 w-fit lg:h-28">
              <Logo />
            </a>
            <p className="mt-8 max-w-xs font-display text-xl font-semibold tracking-tight">{BRAND.tagline}</p>
            <p className="mt-3 max-w-sm text-mute">Custom jerseys, track suits and uniforms, designed around your team.</p>
            <div className="mt-8 flex gap-3">
              <a href={INSTAGRAM.href} target="_blank" rel="noopener" aria-label="Instagram (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a href={WHATSAPP.href} target="_blank" rel="noopener" aria-label="WhatsApp (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-ink/20 transition hover:bg-ink hover:text-white">
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2 lg:col-start-6">
            <p className="label text-faint">Quick links</p>
            <ul className="mt-6 flex flex-col gap-3">
              {[pages.home, pages.about, pages.products, pages.contact].map((n) => (
                <li key={n.label}>
                  <a href={n.href} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sports" className="lg:col-span-2">
            <p className="label text-faint">Sports</p>
            <ul className="mt-6 flex flex-col gap-3">
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
            <address className="mt-6 flex flex-col gap-3 text-ink/75 not-italic">
              <a href={PHONE.href} className={link}>
                {PHONE.display}
              </a>
              <a href={WHATSAPP.href} target="_blank" rel="noopener" className={link}>
                WhatsApp
              </a>
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className={`${link} break-all`}>
                  {EMAIL}
                </a>
              )}
              <a href={INSTAGRAM.href} target="_blank" rel="noopener" className={link}>
                Instagram {INSTAGRAM.handle}
              </a>
              <span className="mt-3">
                {ADDRESS.lines[0]}
                <br />
                {ADDRESS.lines[1]}
              </span>
              <span className="mt-3">
                {OPENING_HOURS.days}
                <br />
                {OPENING_HOURS.time}
              </span>
            </address>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between lg:pr-24">
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

