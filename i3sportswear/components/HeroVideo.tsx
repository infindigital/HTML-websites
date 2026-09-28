"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The master film. Plays muted and inline only while on screen and only when
 * the visitor has not asked for reduced motion; otherwise the poster frame is
 * the hero. A visible control satisfies WCAG 2.2.2 (pause moving content).
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      io.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover object-[58%_50%]"
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/stills/hero-poster-1280.webp"
        aria-hidden
        tabIndex={-1}
      >
        <source src="/video/hero-480.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero-720.webm" type="video/webm" />
        <source src="/video/hero-720.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        data-cursor={playing ? "pause" : "play"}
        aria-label={playing ? "Pause background film" : "Play background film"}
        className="eyebrow absolute right-[var(--gutter)] bottom-6 z-20 flex h-11 items-center gap-3 text-bone/60 transition-colors hover:text-bone lg:bottom-8"
      >
        <span aria-hidden className="flex h-3 w-3 items-center justify-center">
          {playing ? (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
              <rect x="2" y="1" width="2.5" height="10" />
              <rect x="7.5" y="1" width="2.5" height="10" />
            </svg>
          ) : (
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor">
              <path d="M2.5 1v10l8-5z" />
            </svg>
          )}
        </span>
        <span className="hidden sm:inline">{playing ? "Pause film" : "Play film"}</span>
      </button>
    </>
  );
}
