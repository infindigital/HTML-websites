import { categories, pages, type CategoryKey } from "./navigation";
import { productUrls } from "./productUrls";

/**
 * The twelve supplied jersey photographs (public/images/jerseys, built by
 * scripts/process_assets.py). Names describe each design's colours; `sport`
 * is set only where the supplied file name states it.
 */
export type Jersey = {
  id: string;
  name: string;
  sport: string | null;
  category: CategoryKey | null;
  /** Panel colour behind the cut-out, sampled from the garment. */
  tone: string;
  /** Text colour that reads on `tone`. */
  ink: "dark" | "light";
};

export const jerseys: Jersey[] = [
  { id: "black-gold", name: "Black & Gold", sport: null, category: null, tone: "#e8dcc0", ink: "dark" },
  { id: "blue-geometric", name: "Blue Geometric", sport: null, category: null, tone: "#cfe3f5", ink: "dark" },
  { id: "yellow-basketball", name: "Yellow & White", sport: "Basketball", category: "basketball", tone: "#f6e7a6", ink: "dark" },
  { id: "red-wolf", name: "Black & Red Wolf", sport: null, category: null, tone: "#f0d2cc", ink: "dark" },
  { id: "neon-green", name: "Black & Neon Green", sport: null, category: null, tone: "#dcefc4", ink: "dark" },
  { id: "blue-brushstroke", name: "Blue Brushstroke", sport: "Football", category: "football", tone: "#d6e6f7", ink: "dark" },
  { id: "dragon", name: "Dragon Print", sport: null, category: null, tone: "#e4e4e1", ink: "dark" },
  { id: "white-teal", name: "White, Teal & Orange", sport: null, category: null, tone: "#d5ece6", ink: "dark" },
  { id: "teal", name: "Teal Stripe", sport: null, category: null, tone: "#cdeae4", ink: "dark" },
  { id: "blue-marbled", name: "Blue Marbled", sport: "Football", category: "football", tone: "#d3e9f4", ink: "dark" },
  { id: "cream-uniform", name: "Cream & Black", sport: null, category: null, tone: "#efe6d2", ink: "dark" },
  { id: "black-full-sleeve", name: "Black Full Sleeve", sport: null, category: null, tone: "#dedcd8", ink: "dark" },
];

export const jerseyById = (id: string) => jerseys.find((j) => j.id === id)!;

export const jerseySrc = (id: string, view: "front" | "back" | "pair", size: "s" | "l" = "l") => {
  const px = view === "pair" ? (size === "s" ? 640 : 1200) : size === "s" ? 520 : 1000;
  return `/images/jerseys/${id}-${view}-${px}.webp`;
};

/** srcset for a cut-out, with intrinsic sizes for layout. */
export function jerseySet(id: string, view: "front" | "back" | "pair") {
  if (view === "pair") {
    return { src: jerseySrc(id, view, "l"), srcSet: `${jerseySrc(id, view, "s")} 640w, ${jerseySrc(id, view, "l")} 1200w`, width: 1200, height: 1240 };
  }
  return { src: jerseySrc(id, view, "l"), srcSet: `${jerseySrc(id, view, "s")} 255w, ${jerseySrc(id, view, "l")} 490w`, width: 490, height: 1000 };
}

/** Where a jersey card links: its product page, else its category, else all products. */
export function jerseyLink(j: Jersey) {
  const product = productUrls[j.id];
  if (product) return { href: product, label: "View product", mapped: true };
  if (j.category) return { href: categories[j.category].href, label: `View ${categories[j.category].label}`, mapped: false };
  return { href: pages.products.href, label: "View products", mapped: false };
}
