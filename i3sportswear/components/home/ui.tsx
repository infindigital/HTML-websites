import type { ComponentProps, ReactNode } from "react";
import { WORDPRESS_URL } from "@/config/site";

/** The supplied iTHREE lockup (gold), untouched. Height drives the size. */
export function Logo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-480.webp"
      alt="iTHREE Sports Wear"
      width={564}
      height={480}
      fetchPriority={priority ? "high" : undefined}
      className={`h-full w-auto ${className}`}
    />
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`h-3.5 w-3.5 shrink-0 ${className}`} fill="none">
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Links to other sites open in a new tab; WordPress pages are part of this site. */
export function linkProps(href: string) {
  const external = /^https?:/.test(href) && !href.startsWith(WORDPRESS_URL);
  return external ? { target: "_blank", rel: "noopener" } : {};
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "gold";
  size?: "md" | "sm";
  cursor?: string;
  icon?: ReactNode;
} & Omit<ComponentProps<"a">, "href">;

/**
 * Sharp-edged CTA. A fill wipes up from the baseline on hover; on desktop
 * the button leans toward the pointer (data-magnetic, see Pointer.tsx).
 */
export function Button({ href, children, variant = "solid", size = "md", cursor, icon, className = "", ...rest }: ButtonProps) {
  const base =
    "group relative isolate inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap label tracking-[0.16em] transition-colors duration-500 ease-[var(--ease-out-expo)]";
  const sizes = size === "md" ? "h-14 px-7" : "h-11 px-5 text-[0.68rem]";
  const variants = {
    solid: "bg-ink text-white",
    outline: "text-ink ring-1 ring-inset ring-ink/25 hover:text-white hover:ring-ink",
    gold: "bg-gold text-ink",
  }[variant];
  const fill = variant === "outline" ? "bg-ink" : variant === "gold" ? "bg-ink" : "bg-gold-deep";
  const hoverText = variant === "gold" ? "group-hover:text-white" : "";

  return (
    <a href={href} data-cursor={cursor} data-magnetic {...linkProps(href)} className={`${base} ${sizes} ${variants} ${className}`} {...rest}>
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 ${fill} transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100`}
      />
      {icon}
      <span className={`transition-colors duration-500 ${hoverText}`}>{children}</span>
      <Arrow className={`transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 ${hoverText}`} />
    </a>
  );
}

/** Small gold triangle drawn from the iTHREE mark; separates label parts. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 8" aria-hidden className={`h-[7px] w-[9px] shrink-0 text-gold ${className}`} fill="currentColor">
      <path d="M5 0 10 8H0z" />
    </svg>
  );
}

/** Small index label, e.g. "02 ▲ Jersey archive". */
export function Kicker({ index, children, className = "" }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 text-mute ${className}`}>
      {index && <span className="text-gold-deep">{index}</span>}
      {index && <Mark />}
      <span>{children}</span>
    </p>
  );
}

/** Splits a heading into masked lines for line-by-line reveals. */
export function Lines({ lines, className = "" }: { lines: ReactNode[]; className?: string }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="mask">
          <span className={className}>{line}</span>
        </span>
      ))}
    </>
  );
}

type ImgProps = ComponentProps<"img"> & { priority?: boolean };

/** Plain responsive image: lazy and async unless it is the critical hero image. */
export function Img({ priority = false, alt, ...rest }: ImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}
