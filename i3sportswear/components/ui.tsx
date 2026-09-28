import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { isExternal } from "@/lib/site";

/** The supplied iTHREE lockup, untouched. Height drives the size. */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/logo-480.webp"
      alt="iTHREE Sportswear"
      width={564}
      height={480}
      unoptimized
      priority={priority}
      className={`h-full w-auto ${className}`}
    />
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`h-3.5 w-3.5 ${className}`} fill="none">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  size?: "md" | "sm";
  cursor?: string;
} & Omit<ComponentProps<"a">, "href">;

/**
 * Sharp-edged CTA. The hover state wipes a fill up from the baseline rather
 * than fading, which reads as deliberate and keeps the label legible.
 */
export function Button({ href, children, variant = "solid", size = "md", cursor, className = "", ...rest }: ButtonProps) {
  const external = isExternal(href) && !href.startsWith("mailto:") && !href.startsWith("tel:");
  const base =
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap eyebrow tracking-[0.18em] transition-colors duration-500 ease-[var(--ease-out-expo)]";
  const sizes = size === "md" ? "h-14 px-7" : "h-10 px-5 text-[0.6875rem]";
  const variants = {
    solid: "bg-bone text-ink hover:text-ink",
    outline: "text-bone ring-1 ring-inset ring-bone/30 hover:text-ink hover:ring-bone",
    text: "text-bone h-auto! px-0!",
  }[variant];
  const fill = variant === "solid" ? "bg-gold-soft" : "bg-bone";

  return (
    <a
      href={href}
      data-cursor={cursor}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={`${base} ${sizes} ${variants} ${className}`}
      {...rest}
    >
      {variant !== "text" && (
        <span
          aria-hidden
          className={`absolute inset-0 -z-10 origin-bottom scale-y-0 ${fill} transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100`}
        />
      )}
      <span>{children}</span>
      <Arrow className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" />
    </a>
  );
}

/** Small gold triangle drawn from the iTHREE mark; separates label parts. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 8" aria-hidden className={`h-[7px] w-[9px] shrink-0 text-gold-soft ${className}`} fill="currentColor">
      <path d="M5 0 10 8H0z" />
    </svg>
  );
}

/** Section index label, e.g. "02 ▲ The Jersey Lab". */
export function Eyebrow({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 text-faint ${className}`}>
      {index && <span className="text-gold-soft">{index}</span>}
      {index && <Mark />}
      <span>{children}</span>
    </p>
  );
}

/**
 * Splits a heading into masked lines. The outer span (`.line-mask > span`) is
 * reserved for scroll-driven GSAP transforms; `inner` classes (e.g. the CSS
 * entrance) go on a nested span so the two never fight over `transform`.
 */
export function Lines({ lines, outer = "", inner = "" }: { lines: ReactNode[]; outer?: string; inner?: string }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="line-mask">
          <span className={outer}>{inner ? <span className={`block ${inner}`}>{line}</span> : line}</span>
        </span>
      ))}
    </>
  );
}
