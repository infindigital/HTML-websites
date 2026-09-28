"use client";

import Image from "next/image";
import { jerseySrc } from "@/lib/products";
import { useRef } from "react";
import { Button, Lines, Logo, Mark } from "./ui";
import { contactHref, nav, site } from "@/lib/site";
import { MQ, gsap, useGSAP } from "@/lib/gsap";

/** Final CTA. The jersey wall from the master film, held in deep shadow. */
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
        gsap.fromTo(
          "[data-cta-media]",
          { scale: 1.14, xPercent: 3 },
          { scale: 1, xPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const talk = contactHref("Hi iTHREE, I'd like to talk about a team kit.");

  return (
    <section id="quote" ref={root} aria-labelledby="cta-title" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <div data-cta-media className="absolute inset-0 will-change-transform">
          <Image src="/images/stills/wall" alt="" fill sizes="100vw" className="object-cover object-[80%_50%] opacity-55 light:hidden" />
          {/* Light theme: a light kit in place of the dark film still. */}
          <div className="absolute inset-y-[14%] right-[4%] hidden w-full light:block lg:w-[52%]">
            <Image src={jerseySrc("sky-brush")} alt="" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-contain object-right opacity-25 lg:opacity-100" />
          </div>
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_15%,color-mix(in_srgb,var(--color-ink)_60%,transparent)_55%,color-mix(in_srgb,var(--color-ink)_20%,transparent)),linear-gradient(to_bottom,var(--color-ink),transparent_25%,transparent_75%,var(--color-ink))]"
        />
      </div>

      <div className="shell relative py-32">
        <p className="eyebrow flex items-center gap-3 text-faint">
          <Mark /> Get a quote
        </p>
        <h2 id="cta-title" data-cta-title className="display-lg mt-8 max-w-[14ch]">
          <Lines lines={["Ready to build", <>your team kit<span className="text-gold-soft">?</span></>]} outer="js-hidden-line" />
        </h2>
        <div data-cta-actions className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="#lab" cursor="explore">
            Start your design
          </Button>
          <Button href={talk} variant="outline">
            Talk to our team
          </Button>
        </div>
        {site.contact.whatsapp && (
          <a href={contactHref()} target="_blank" rel="noopener" className="eyebrow mt-8 inline-flex items-center gap-3 text-bone/70 hover:text-bone">
            <WhatsAppIcon /> Message us on WhatsApp
          </a>
        )}
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.2Z" />
    </svg>
  );
}

export function Footer() {
  const { email, phone, whatsapp, location } = site.contact;
  const socials = site.social.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink pt-24 pb-10">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" aria-label="iTHREE Sportswear, back to top" className="block h-32 w-fit sm:h-44">
              <Logo />
            </a>
            <p className="lede mt-8 max-w-sm">Custom performance wear engineered around your team.</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-7">
            <p className="eyebrow text-faint">Explore</p>
            <ul className="mt-6 flex flex-col gap-3">
              {[...nav, { label: "Get a quote", href: "#quote" }].map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-bone/80 transition-colors hover:text-gold-soft">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="eyebrow text-faint">Contact</p>
            <ul className="mt-6 flex flex-col gap-3 text-bone/80">
              {whatsapp && (
                <li>
                  <a href={contactHref()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-gold-soft">
                    <WhatsAppIcon /> WhatsApp
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold-soft">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="break-all hover:text-gold-soft">
                    {email}
                  </a>
                </li>
              )}
              {!whatsapp && !phone && !email && (
                <li>
                  <a href="#quote" className="hover:text-gold-soft">
                    Get a quote
                  </a>
                </li>
              )}
            </ul>
            {location && (
              <>
                <p className="eyebrow mt-10 text-faint">Location</p>
                <address className="mt-4 text-bone/80 not-italic">{location}</address>
              </>
            )}
          </div>

          {socials.length > 0 && (
            <div className="lg:col-span-2">
              <p className="eyebrow text-faint">Follow</p>
              <ul className="mt-6 flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener" className="text-bone/80 hover:text-gold-soft">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-24 flex flex-col-reverse gap-6 border-t border-bone/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-faint">
            &copy; {year} {site.name}. All rights reserved.
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
