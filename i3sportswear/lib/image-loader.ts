// Maps next/image requests onto the pre-generated WebP files.
// `src` is a base path without extension, e.g. "/images/jerseys/noir-gold".
const SETS: Record<string, number[]> = {
  jerseys: [240, 480, 960, 1440, 1920],
  stills: [640, 1280],
};

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const folder = src.split("/")[2] ?? "";
  const sizes = SETS[folder];
  if (!sizes) return src;
  const size = sizes.find((s) => s >= width) ?? sizes[sizes.length - 1];
  return `${src}-${size}.webp`;
}
