"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Img, Mark } from "./ui";
import { heroSlides } from "@/config/content";
import { groupSet, jerseyById, jerseySet, jerseySrc } from "@/config/jerseys";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const ease = [0.16, 1, 0.3, 1] as const;
const DURATION = 6500;

/**
 * 01: Hero. A four-slide campaign: each slide pairs a headline with one of
 * the supplied kits, front and back, on a panel in that kit's colour. Slides
 * advance on their own (paused only off-screen, in a hidden tab, or with
 * the pause button) and can be picked directly. Scrolling away drifts the athlete and splits
 * the headline.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false); // off-screen or hidden tab
  const slide = heroSlides[index];
  const kit = jerseyById(slide.jersey);
  const running = playing && !hold;

  const go = useCallback((i: number) => setIndex((i + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [running, index, go]);

  // Pause off-screen and in hidden tabs.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setHold(!e.isIntersecting));
    io.observe(el);
    const onVis = () => setHold(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => (io.disconnect(), document.removeEventListener("visibilitychange", onVis));
  }, []);

  // Warm the other slides' images once the page has settled.
  useEffect(() => {
    const id = setTimeout(() => {
      heroSlides.slice(1).forEach((s) => {
        if (s.group) {
          new Image().src = groupSet(s.group).src;
          return;
        }
        new Image().src = jerseySrc(s.jersey, "front");
        new Image().src = jerseySrc(s.jersey, "back", "s");
      });
    }, 2500);
    return () => clearTimeout(id);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopMotion, () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } });
        tl.to("[data-hero-front]", { yPercent: -10, scale: 1.05, ease: "none" }, 0)
          .to("[data-hero-back]", { yPercent: 8, ease: "none" }, 0)
          .to("[data-hero-line='0']", { xPercent: -14, ease: "none" }, 0)
          .to("[data-hero-line='1']", { xPercent: 10, ease: "none" }, 0)
          .to("[data-hero-copy]", { y: -60, autoAlpha: 0, ease: "none" }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const front = jerseySet(slide.jersey, "front");
  const back = jerseySet(slide.jersey, "back");

  return (
    <section
      id="top"
      ref={root}
      aria-roledescription="carousel"
      aria-label="iTHREE kits"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-paper lg:block lg:h-[100svh] lg:min-h-[720px]"
    >
      {/* Stage: below the copy on phones and tablets, taking the height that is
          left (never less than a usable minimum); behind the copy on desktop. */}
      <div className="relative order-2 min-h-[max(52svh,340px)] flex-1 lg:absolute lg:inset-0 lg:min-h-0">
        {/* Colour panel for the current kit */}
        <motion.div
          aria-hidden
          className="absolute inset-0 lg:left-auto lg:w-[47%]"
          animate={{ backgroundColor: slide.tone }}
          transition={{ duration: 1.1, ease }}
        >
        </motion.div>

        {/* Kit: back figure behind, front figure leading */}
        <div className="pointer-events-none absolute inset-0 lg:left-auto lg:w-[60%]">
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              {slide.group ? (
                // Group photo: always whole, centred in the colour panel, clear of the
                // slide controls on phones and tablets.
                <div data-hero-front className="absolute inset-x-[var(--gutter)] top-[3%] bottom-12 origin-bottom lg:inset-x-auto lg:top-[9.5rem] lg:right-0 lg:bottom-0 lg:w-[78%] lg:px-[5%]">
                  <motion.div
                    className="h-full w-full"
                    initial={{ y: 30, opacity: 0, clipPath: "inset(-30% -30% 100% -30%)" }}
                    animate={{ y: 0, opacity: 1, clipPath: "inset(-30% -30% 0% -30%)" }}
                    transition={{ duration: 1.2, ease }}
                  >
                    <Img
                      {...groupSet(slide.group)}
                      sizes="(min-width: 1024px) 40vw, 80vw"
                      alt="Three colleagues in custom corporate wear: a navy polo, a white polo and a black hoodie, each with the company logo on the chest"
                      className="h-full w-full object-contain object-bottom drop-shadow-[0_30px_30px_rgb(0_0_0/0.14)]"
                    />
                  </motion.div>
                </div>
              ) : (
                <>
                  <div data-hero-back className="absolute right-[4%] bottom-0 h-[78%] lg:right-[6%] lg:h-[calc(78%-6rem)]">
                    <motion.div
                      className="h-full"
                      initial={{ x: 60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1.3, ease, delay: 0.15 }}
                    >
                      <Img {...back} sizes="(min-width: 1024px) 22vw, 40vw" alt="" className="h-full w-auto object-contain drop-shadow-[0_30px_30px_rgb(0_0_0/0.12)]" />
                    </motion.div>
                  </div>
                  <div data-hero-front className="absolute bottom-0 left-[8%] h-[96%] origin-bottom lg:left-[16%] lg:h-[calc(100%-8.5rem)] xl:h-[calc(100%-7rem)]">
                    <motion.div
                      className="h-full"
                      initial={{ x: -40, opacity: 0, clipPath: "inset(-30% -30% 100% -30%)" }}
                      animate={{ x: 0, opacity: 1, clipPath: "inset(-30% -30% 0% -30%)" }}
                      transition={{ duration: 1.2, ease }}
                    >
                      <Img
                        {...front}
                        priority={index === 0}
                        sizes="(min-width: 1024px) 30vw, 55vw"
                        alt={`Player wearing the iTHREE ${kit.name} jersey, front view`}
                        className="h-full w-auto object-contain drop-shadow-[0_40px_40px_rgb(0_0_0/0.18)]"
                      />
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phones: slide bars along the foot of the panel */}
        <div className="absolute inset-x-[var(--gutter)] bottom-4 z-10 flex items-center gap-2 lg:hidden">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-current={i === index ? "true" : undefined}
              aria-label={`Slide ${i + 1}: ${s.lines.join(" ")}`}
              className="flex h-8 flex-1 items-center"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-ink/20">
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    className="absolute inset-0 origin-left bg-ink"
                    style={{ animation: `progress ${DURATION}ms linear both`, animationPlayState: running ? "running" : "paused" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>

      </div>

      {/* Copy */}
      <div className="shell relative order-1 flex flex-col pt-[calc(var(--header-h)+2.5rem)] pb-6 sm:pb-8 lg:h-full lg:justify-center lg:pt-24 lg:pb-28">
        <div className="lg:w-[52%]">
          <p className="label enter-fade flex items-center gap-3 text-mute">
            <Mark />
            {slide.eyebrow ?? "Custom team kits · iThree Sports Wear"}
          </p>
          <h1 className={`display-xxl mt-5 lg:mt-7 ${slide.lines.length > 2 ? "text-[clamp(2.6rem,11.5vw,4.6rem)] lg:text-[min(5.6vw,6.6rem)]" : "text-[clamp(3rem,13.5vw,5.5rem)] lg:text-[min(7.2vw,8.6rem)]"}`} aria-live={running ? "off" : "polite"}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={slide.id} className="block" exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: "easeIn" }}>
                {slide.lines.map((line, i) => (
                  <span key={i} className="mask" data-hero-line={i}>
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, ease, delay: 0.08 * i }}
                      className={i === slide.lines.length - 1 ? "" : ""}
                    >
                      {i === slide.lines.length - 1 ? (
                        <>
                          {line.replace(/\.$/, "")}
                          <span style={{ color: slide.accent }}>.</span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </AnimatePresence>
          </h1>
          {/* Phones: one compact action row under the headline */}
          <div className="relative z-10 mt-6 flex gap-2 lg:hidden">
            <Button href="#contact" size="sm" className="flex-1">
              Start your kit
            </Button>
            <Button href="#jerseys" size="sm" variant="outline" className="flex-1 bg-white/70 backdrop-blur">
              Explore jerseys
            </Button>
          </div>
          <div data-hero-copy className="max-lg:hidden">
            <p className="lede enter-fade mt-8 max-w-md [animation-delay:400ms]">
              {slide.text ?? "Custom performance wear designed around your team, your colours and your identity."}
            </p>
            <div className="enter-fade mt-10 flex flex-wrap gap-3 [animation-delay:550ms]">
              <Button href="#contact" cursor="Start">
                Start your kit
              </Button>
              <Button href="#jerseys" variant="outline">
                Explore jerseys
              </Button>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-[var(--gutter)] z-10 hidden items-end gap-8 lg:flex">
          <ol className="flex items-end gap-6" aria-label="Choose a slide">
            {heroSlides.map((s, i) => {
              const active = i === index;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? "true" : undefined}
                    aria-label={`Slide ${i + 1}: ${s.lines.join(" ")}`}
                    className="group flex h-9 w-16 items-center"
                  >
                    <span className="relative block h-[2px] w-full bg-ink/15 transition-colors group-hover:bg-ink/35">
                      {active && (
                        <span
                          key={`${index}-${running}`}
                          className="absolute inset-0 origin-left bg-ink"
                          style={{
                            animation: `progress ${DURATION}ms linear both`,
                            animationPlayState: running ? "running" : "paused",
                          }}
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-ink/20 transition hover:ring-ink"
          >
            {playing ? (
              <svg viewBox="0 0 12 12" aria-hidden className="h-2.5 w-2.5" fill="currentColor">
                <path d="M2 1h3v10H2zM7 1h3v10H7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 12 12" aria-hidden className="h-2.5 w-2.5" fill="currentColor">
                <path d="M2.5 1 11 6l-8.5 5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <p aria-hidden className="label absolute right-[var(--gutter)] bottom-8 z-10 hidden items-center gap-3 bg-paper/0 text-ink/60 [writing-mode:vertical-rl] 2xl:flex">
        Scroll to explore
        <span className="relative block h-12 w-px overflow-hidden bg-ink/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_2.2s_var(--ease-in-out-quart)_infinite] bg-ink" />
        </span>
      </p>
    </section>
  );
}
