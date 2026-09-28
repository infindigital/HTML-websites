import type { LabState } from "./LabCanvas";

function Marker({ at, label, value, show }: { at: [number, number]; label: string; value: string; show: boolean }) {
  return (
    <span
      aria-hidden
      style={{ left: `${at[0] * 100}%`, top: `${at[1] * 100}%` }}
      className={`absolute flex -translate-y-1/2 items-center transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`}
    >
      <span className="-ml-[5px] block h-2.5 w-2.5 rounded-full bg-gold-soft ring-4 ring-gold-soft/25" />
      <span className="block h-px w-8 bg-gold-soft/70 sm:w-12" />
      <span className="eyebrow bg-ink/85 px-2.5 py-1.5 text-[0.5625rem] whitespace-nowrap text-bone">
        <span className="text-faint">{label}</span> {value}
      </span>
    </span>
  );
}

/**
 * CSS-only Jersey Lab stage: a two-faced card flipped with a 3D transform.
 * Used on phones, with reduced motion, without WebGL, and as the placeholder
 * while the WebGL stage loads.
 */
export default function LabFallback({ kit, view, name, number, crest, zoom }: LabState) {
  return (
    <div className="absolute inset-0 flex items-center justify-center [perspective:1600px]">
      <div
        className="relative aspect-square h-[82%] max-h-full transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] [transform-style:preserve-3d]"
        style={{ transform: `${zoom ? "scale(1.55) translateY(22%) " : ""}rotateY(${view === "back" ? 180 : 0}deg)` }}
      >
        {(["front", "back"] as const).map((side) => (
          <div
            key={side}
            className="absolute inset-0 [backface-visibility:hidden]"
            style={side === "back" ? { transform: "rotateY(180deg)" } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/lab/${kit.slug}-${side}-sm.webp`}
              alt={`${kit.sport} kit, ${side} view`}
              width={768}
              height={768}
              className="h-full w-full object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.6)]"
            />
            {side === "front" ? (
              <Marker at={kit.crest} label="Crest" value="Left chest" show={crest} />
            ) : (
              <>
                <Marker at={kit.name} label="Name" value={name || "—"} show={!!name} />
                <Marker at={kit.number} label="No." value={number || "—"} show={!!number} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
