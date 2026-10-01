import { Img, Kicker } from "./ui";
import { clients, testimonials } from "@/config/content";

/**
 * Clients, straight after the hero: the supplied client logos in full
 * colour on a slow marquee that pauses on hover; under reduced motion they
 * simply wrap.
 */
export function Clients() {
  if (!clients.length) return null;
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-16 pr-16 motion-reduce:flex-wrap motion-reduce:justify-center lg:gap-24 lg:pr-24">
      {clients.map((c) => (
        <li key={c.name} className="shrink-0">
          <Img src={c.src} alt={hidden ? "" : c.name} width={520} height={164} className="h-12 w-auto object-contain transition-transform duration-500 hover:scale-105 lg:h-16" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-white py-16 lg:py-20">
      <div className="shell flex items-baseline justify-between gap-6">
        <Kicker>
          <span id="clients-title">Trusted by teams and organisations</span>
        </Kicker>
      </div>
      <div className="group mt-10 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {row(false)}
          <div className="contents motion-reduce:hidden">{row(true)}</div>
        </div>
      </div>
    </section>
  );
}

/** Testimonials: rendered only when real quotes exist in config/content.ts. */
export function Testimonials() {
  if (!testimonials.length) return null;
  return (
    <section aria-labelledby="testimonials-title" className="bg-paper py-24 lg:py-36">
      <div className="shell">
        <Kicker index="09">
          <span id="testimonials-title">Teams on iTHREE</span>
        </Kicker>
        <ul className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto">
          {testimonials.map((t) => (
            <li key={t.name} className="w-[min(88vw,760px)] shrink-0 snap-start">
              <figure>
                <blockquote className="display-md leading-tight">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-8">
                  <span className="font-display font-semibold">{t.name}</span>
                  <span className="label mt-1 block text-mute">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
