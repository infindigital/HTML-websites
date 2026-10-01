"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button, Img, Kicker, Lines, Logo, Mark } from "./ui";
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
 * Contact: a "team sheet" brief. Visitors pick what they need, fill in a
 * short sentence about themselves and their requirement, and watch the
 * WhatsApp message build beside it. This static page has no mail server, so
 * sending opens WhatsApp with the message filled in, and says so.
 */
const NEEDS = [...categoryList.map((c) => c.label), "Corporate T-shirts"];

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [needs, setNeeds] = useState<string[]>([]);
  const [f, setF] = useState({ first: "", last: "", company: "", phone: "", email: "", message: "" });
  useReveal(root);

  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((v) => ({ ...v, [k]: e.target.value }));
  const toggle = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));

  const name = [f.first, f.last].filter(Boolean).join(" ");
  const message = [
    "Hello iThree Sports Wear, I'd like a quote.",
    name && `Name: ${name}`,
    f.company && `Team / company: ${f.company}`,
    f.phone && `Phone: ${f.phone}`,
    f.email && `Email: ${f.email}`,
    needs.length > 0 && `Looking for: ${needs.join(", ")}`,
    f.message && `Requirement: ${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.open(whatsappWith(message), "_blank", "noopener");
    setSent(true);
  };

  const inline =
    "mx-1 inline-block h-11 min-w-0 border-b-2 border-ink/20 bg-transparent px-1 align-baseline font-display text-[clamp(1.15rem,2vw,1.6rem)] font-semibold text-ink outline-none transition-colors placeholder:font-normal placeholder:text-ink/25 focus:border-gold";
  const step = "label flex items-center gap-3 text-mute";

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="bg-white py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col lg:col-span-4">
          <Kicker index="10">Contact</Kicker>
          <h2 id="contact-title" data-reveal className="display-lg mt-6">
            <Lines lines={["Start", <>your kit<span className="text-gold">.</span></>]} />
          </h2>

          {/* Live preview of the message */}
          <div data-fade className="mt-10 bg-[#efeae2] p-4" aria-hidden>
            <p className="label flex items-center gap-2 text-ink/60">
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#1fa855]" /> Your message
            </p>
            <div className="relative mt-3 ml-auto max-w-[92%] bg-[#d9fdd3] px-4 py-3 text-[0.92rem] leading-relaxed whitespace-pre-line text-ink shadow-[0_1px_0_rgb(0_0_0/0.08)]">
              {message}
            </div>
          </div>

          <ul className="mt-10 flex flex-col gap-3 text-[0.95rem] text-mute">
            <li>
              <a href={PHONE.href} className="flex items-center gap-3 hover:text-ink">
                <PhoneIcon className="h-4 w-4 shrink-0 text-gold-deep" /> {PHONE.display}
              </a>
            </li>
            {EMAIL && (
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 break-all hover:text-ink">
                  <MailIcon className="h-4 w-4 shrink-0 text-gold-deep" /> {EMAIL}
                </a>
              </li>
            )}
            <li className="flex items-start gap-3">
              <ClockIcon className="mt-1 h-4 w-4 shrink-0 text-gold-deep" /> {OPENING_HOURS.days}, {OPENING_HOURS.time}
            </li>
            <li className="flex items-start gap-3">
              <PinIcon className="mt-1 h-4 w-4 shrink-0 text-gold-deep" /> {ADDRESS.full}
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-12 lg:col-span-7 lg:col-start-6" aria-describedby={`${uid}-note`}>
          <fieldset>
            <legend className={step}>
              <span className="text-gold-deep">01</span> <Mark /> What do you need?
            </legend>
            <div className="mt-5 flex flex-wrap gap-2">
              {NEEDS.map((n) => {
                const on = needs.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(n)}
                    className={`label flex h-11 items-center gap-2 px-4 transition-colors duration-300 ${
                      on ? "bg-ink text-white" : "bg-paper text-ink/75 ring-1 ring-line hover:ring-ink/40"
                    }`}
                  >
                    {on && <Mark className="text-gold" />}
                    {n}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className={step}>
              <span className="text-gold-deep">02</span> <Mark /> About you
            </legend>
            <p className="mt-5 font-display text-[clamp(1.15rem,2vw,1.6rem)] leading-[2.2] font-medium tracking-tight text-ink/70">
              Hi iTHREE, I&rsquo;m
              <input aria-label="First name" required name="first" autoComplete="given-name" placeholder="first name" value={f.first} onChange={set("first")} className={`${inline} w-[8.5ch]`} />
              <input aria-label="Second name" name="last" autoComplete="family-name" placeholder="second name" value={f.last} onChange={set("last")} className={`${inline} w-[9.5ch]`} />
              from
              <input aria-label="Company or team name" name="company" autoComplete="organization" placeholder="team or company" value={f.company} onChange={set("company")} className={`${inline} w-[12ch]`} />
              . You can reach me on
              <input aria-label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="phone" value={f.phone} onChange={set("phone")} className={`${inline} w-[11ch]`} />
              or
              <input aria-label="Email" name="email" type="email" autoComplete="email" placeholder="email" value={f.email} onChange={set("email")} className={`${inline} w-[13ch]`} />
              .
            </p>
          </fieldset>

          <fieldset>
            <legend className={step}>
              <span className="text-gold-deep">03</span> <Mark /> Your requirement
            </legend>
            <textarea
              name="message"
              aria-label="Requirement or message"
              required
              rows={3}
              value={f.message}
              onChange={set("message")}
              placeholder="Number of players, colours, names and numbers, deadline…"
              className="mt-5 w-full resize-y border-b-2 border-ink/20 bg-transparent py-2 font-display text-[clamp(1.1rem,1.8vw,1.4rem)] text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-gold"
            />
          </fieldset>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              data-magnetic
              className="group label relative isolate inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-ink px-8 tracking-[0.16em] text-white"
            >
              <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-whatsapp transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
              <WhatsAppIcon /> Send on WhatsApp
            </button>
            <a href={pages.contact.href} className="label text-mute underline-offset-4 hover:text-ink hover:underline">
              Or use our contact page
            </a>
          </div>
          <p id={`${uid}-note`} className="-mt-6 text-sm text-mute" aria-live="polite">
            {sent ? "WhatsApp has opened with your message. Press send there to reach us." : "Sending opens WhatsApp with this message filled in."}
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
              <span>{ADDRESS.full}</span>
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

