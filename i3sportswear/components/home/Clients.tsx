import { Kicker } from "./ui";
import LogoStrip from "./LogoStrip";
import { clients, testimonials } from "@/config/content";

/**
 * Clients, straight after the hero: the supplied client logos in full
 * colour on a strip that glides on its own and scrolls by hand (LogoStrip).
 */
export function Clients() {
  if (!clients.length) return null;
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-white py-16 lg:py-20">
      <div className="shell flex items-baseline justify-between gap-6">
        <Kicker>
          <span id="clients-title">Trusted by teams and organisations</span>
        </Kicker>
      </div>
      <LogoStrip />
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
