/**
 * Supplied iTHREE jersey artwork. Images are unaltered apart from trimming
 * and resizing (see scripts/process_images.py).
 *
 * Sport labels are assigned from each garment's cut and should be confirmed
 * by the business before launch.
 */
export type Jersey = {
  slug: string;
  sport: string;
  colourway: string;
  w: number;
  h: number;
  /** Image carries its own studio backdrop rather than transparency. */
  backdrop?: boolean;
};

export const jerseys: Jersey[] = [
  { slug: "noir-gold", sport: "Football", colourway: "Black / Gold", w: 1973, h: 1869 },
  { slug: "ivory-gold", sport: "Cricket", colourway: "Ivory / Gold / Black", w: 3790, h: 4077 },
  { slug: "yellow-circuit", sport: "Basketball", colourway: "Yellow / White", w: 4386, h: 4498 },
  { slug: "coral-teal", sport: "Volleyball", colourway: "White / Teal / Orange", w: 2431, h: 1810 },
  { slug: "sky-brush", sport: "Badminton", colourway: "Sky / White / Navy", w: 4597, h: 3226 },
  { slug: "black-volt", sport: "Training", colourway: "Black / Volt", w: 4597, h: 3226 },
  { slug: "storm-blue", sport: "Football", colourway: "Black / White / Cyan", w: 2257, h: 1631 },
  { slug: "teal-stripe", sport: "Football", colourway: "Teal / White", w: 4597, h: 3226 },
  { slug: "azure-geo", sport: "Training", colourway: "Azure / Navy", w: 4597, h: 3314 },
  { slug: "ink-dragon", sport: "Basketball", colourway: "White / Ink", w: 2147, h: 2174 },
  { slug: "crimson-wolf", sport: "Football", colourway: "Red / Black", w: 2633, h: 2492 },
  { slug: "shatter-longsleeve", sport: "Cricket", colourway: "Black / Grey / Red", w: 3053, h: 2772, backdrop: true },
];

export const bySlug = (slug: string) => jerseys.find((j) => j.slug === slug)!;

export const jerseySrc = (slug: string) => `/images/jerseys/${slug}`;

/** Sports chapter order for the "Built for every game" section. */
export const sports = [
  { name: "Football", slug: "noir-gold", line: "Built for the full ninety.", tint: "201 162 39" },
  { name: "Cricket", slug: "ivory-gold", line: "Built for the long innings.", tint: "217 208 190" },
  { name: "Basketball", slug: "yellow-circuit", line: "Built for the fast break.", tint: "224 185 28" },
  { name: "Volleyball", slug: "coral-teal", line: "Built for the rally.", tint: "31 163 154" },
  { name: "Badminton", slug: "sky-brush", line: "Built for the smash.", tint: "31 83 134" },
  { name: "Training", slug: "black-volt", line: "Built for every session.", tint: "133 163 96" },
];

/**
 * Jersey Lab kits: only artwork whose front and back views are fully
 * separated, so each face can be shown without cutting into the design.
 * Coordinates are fractions of the square face texture.
 */
export type LabKit = {
  slug: string;
  sport: string;
  palette: string[];
  crest: [number, number];
  name: [number, number];
  number: [number, number];
};

export const labKits: LabKit[] = [
  {
    slug: "storm-blue",
    sport: "Football",
    palette: ["#1D1F20", "#E1E8E9", "#1C9BD4"],
    crest: [0.585, 0.155],
    name: [0.47, 0.19],
    number: [0.47, 0.32],
  },
  {
    slug: "ivory-gold",
    sport: "Cricket",
    palette: ["#F1EFEC", "#D9C9A5", "#0A0A0A"],
    crest: [0.575, 0.135],
    name: [0.5, 0.17],
    number: [0.5, 0.245],
  },
  {
    slug: "yellow-circuit",
    sport: "Basketball",
    palette: ["#E0B91C", "#EDEFEE", "#161616"],
    crest: [0.565, 0.18],
    name: [0.5, 0.185],
    number: [0.5, 0.3],
  },
  {
    slug: "coral-teal",
    sport: "Volleyball",
    palette: ["#DBDBD9", "#1FA39A", "#BB3909"],
    crest: [0.6, 0.37],
    name: [0.49, 0.26],
    number: [0.49, 0.385],
  },
];
