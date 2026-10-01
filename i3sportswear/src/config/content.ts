import { categories, type CategoryKey } from "./navigation";

/**
 * Homepage copy and section data. Kept short and factual: no statistics,
 * testimonials or claims that are not on the live site.
 */

export const heroSlides = [
  { id: "identity", lines: ["Wear your", "identity."], jersey: "black-gold", tone: "#e9dfc6", accent: "#b8932a" },
  { id: "game", lines: ["Built for", "your game."], jersey: "blue-geometric", tone: "#d3e5f6", accent: "#1f6fd1" },
  { id: "yours", lines: ["Make it", "yours."], jersey: "yellow-basketball", tone: "#f4e6a2", accent: "#c79a00" },
  { id: "team", lines: ["Your team.", "Your style."], jersey: "red-wolf", tone: "#f1d4ce", accent: "#c4251c" },
] as const;

/** The three promises from the live homepage. */
export const pillars = [
  { icon: "/images/icons/pillar-branded.png", title: "Branded Products", text: "Every kit finished with your crest, colours and sponsors." },
  { icon: "/images/icons/pillar-prices.png", title: "Friendly Prices", text: "Team pricing that works for clubs, schools and companies." },
  { icon: "/images/icons/pillar-process.png", title: "Easy Process", text: "Share your idea, approve the design, and we take it from there." },
];

export type Sport = {
  key: CategoryKey;
  line: string;
  /** Image shown for the sport: a jersey cut-out or a uniform photo. */
  image: { kind: "jersey"; id: string } | { kind: "photo"; src: string; srcSet: string };
};

export const sports: Sport[] = [
  { key: "football", line: "Built for the full ninety.", image: { kind: "jersey", id: "blue-brushstroke" } },
  { key: "cricket", line: "Made for long days in the field.", image: { kind: "jersey", id: "cream-uniform" } },
  { key: "volleyball", line: "Cut for every jump and rally.", image: { kind: "jersey", id: "white-teal" } },
  { key: "throwball", line: "Your colours, every match.", image: { kind: "jersey", id: "teal" } },
  { key: "basketball", line: "Sleeveless cuts. Bold numbers.", image: { kind: "jersey", id: "yellow-basketball" } },
  { key: "kabaddi", line: "Ready for the raid.", image: { kind: "jersey", id: "dragon" } },
  { key: "trackSuits", line: "Warm-ups, travel and training.", image: { kind: "jersey", id: "black-full-sleeve" } },
  {
    key: "officials",
    line: "Polos and uniforms for staff and events.",
    image: {
      kind: "photo",
      src: "/images/uniforms/polo-navy-1600.webp",
      srcSet: "/images/uniforms/polo-navy-800.webp 800w, /images/uniforms/polo-navy-1600.webp 1600w",
    },
  },
];

export const sportLabel = (key: CategoryKey) => categories[key].label;

/** "Make it yours": what can be customised, with the detail each step points at. */
export const customOptions = [
  { id: "colours", title: "Team Colours", text: "Any palette, matched to your club." },
  { id: "names", title: "Player Names", text: "Every player's name across the back." },
  { id: "numbers", title: "Numbers", text: "Squad numbers, front or back." },
  { id: "crest", title: "Team Crests", text: "Your crest on the chest." },
  { id: "sponsors", title: "Sponsors", text: "Room for sponsors across the front." },
  { id: "patterns", title: "Custom Patterns", text: "Prints and graphics drawn for your team." },
] as const;

export type CustomId = (typeof customOptions)[number]["id"];

/** The four steps illustrated on the live homepage. */
export const processSteps = [
  { title: "Choose your design", text: "Pick a design or bring your own idea, colours and logo.", image: "/images/process/step-1.webp" },
  { title: "Customize it", text: "Add team name, player names, numbers and sponsors.", image: "/images/process/step-2.webp" },
  { title: "Confirm your order", text: "Approve the final design, sizes and quantities.", image: "/images/process/step-3.webp" },
  { title: "Delivered to your team", text: "Your kits are produced and delivered, ready to play.", image: "/images/process/step-4.webp" },
];

/** About: the three qualities the live site leads with. */
export const qualities = [
  { title: "Performance", text: "Kits cut for movement, match after match." },
  { title: "Comfort", text: "Fabrics chosen to feel right from warm-up to final whistle." },
  { title: "Customization", text: "Colours, names, numbers and crests, all your own." },
];

/** Why choose iTHREE (points from the live site). `focus` crops the detail image. */
export const reasons = [
  { title: "Premium Fabric Quality", text: "Fabrics chosen for comfort through every match.", jersey: "blue-marbled", focus: "45% 30%" },
  { title: "Fully Customizable Designs", text: "Colours, names, numbers, crests and sponsors. All yours.", jersey: "black-gold", focus: "50% 22%" },
  { title: "Affordable Pricing", text: "Team kits at prices that work for clubs, schools and companies.", jersey: "teal", focus: "50% 30%" },
  { title: "Quick Production Time", text: "From approved design to delivery without the long wait.", jersey: "neon-green", focus: "50% 30%" },
  { title: "Expert Design Support", text: "Our designers turn your idea into a finished kit.", jersey: "dragon", focus: "45% 28%" },
  { title: "Reliable Customer Service", text: "Call or WhatsApp us, Monday to Saturday.", jersey: "red-wolf", focus: "50% 30%" },
];

/** Client logos supplied from the live homepage. */
export const clients = [
  { name: "MOBCO", src: "/images/clients/mobco.webp" },
  { name: "P A College of Engineering", src: "/images/clients/pace.webp" },
  { name: "Kismees", src: "/images/clients/kismees.webp" },
  { name: "Hana", src: "/images/clients/hana.webp" },
  { name: "RK ReliableKey", src: "/images/clients/rk-reliablekey.webp" },
  { name: "Oxford", src: "/images/clients/oxford.webp" },
];

/**
 * Testimonials: only real quotes from the live site, with permission.
 * The section stays hidden while this list is empty.
 */
export const testimonials: { quote: string; name: string; role: string }[] = [];
