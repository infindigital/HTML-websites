/**
 * Business details: the single place to edit contact info, links and social proof.
 *
 * This homepage replaces only the WordPress homepage; every other page stays
 * on WordPress. Contact details, navigation and social links mirror the
 * original site. Only verified information belongs here: an empty value hides
 * its UI, and nothing is ever invented.
 */

/** Where the existing WordPress pages live. */
export const wpBase = "https://i3sportswear.com";
const wp = (path: string) => `${wpBase}${path}`;

export const site = {
  name: "iTHREE Sportswear",
  legalName: "iThree Sports Wear",
  url: "https://i3sportswear.com",
  title: "iTHREE Sportswear | Custom Team Jerseys & Sportswear, Bantwal",
  description:
    "iThree Sports Wear designs custom team jerseys and kits for football, cricket, volleyball, throwball, basketball and kabaddi, plus track suits and officials' uniforms. Your colours, crest, names and numbers. Amtoor, Golthamajal, Bantwal.",
  summary:
    "Custom performance wear engineered around your team. Jerseys, track suits and uniforms for football, cricket, volleyball, throwball, basketball and kabaddi.",

  contact: {
    // From the original website. Leave "" to hide an item.
    email: "", // TODO(business): the address shown on i3sportswear.com; not yet confirmed.
    phone: "+91 95910 88069",
    whatsapp: "919591088069", // digits only with country code
    hours: { days: "Monday to Saturday", time: "7:00 AM - 9:00 PM", short: "Mon–Sat · 7 AM–9 PM" },
    address: "A 1-290(4), Tharabari Amtoor, Golthamajal, Bantwal",
    location: "Amtoor, Golthamajal, Bantwal",
  },

  /** The WhatsApp link used on the original site. Keep exactly as is. */
  whatsappUrl:
    "https://api.whatsapp.com/send/?phone=919591088069&text=Hello+i3+Sports+Wear%2C&type=phone_number&app_absent=0",

  // Full profile URLs. Empty entries are hidden.
  social: [{ label: "Instagram", href: "https://www.instagram.com/i3_sportswear/" }],

  /**
   * Verified trust statistics. Leave empty to show the qualitative trust
   * signals instead. Example: { value: "12", label: "Years of experience" }
   */
  stats: [] as { value: string; label: string }[],

  /** Client / team logos (monochrome SVG or PNG in /public/clients). */
  clients: [] as { name: string; logo: string }[],

  /** Real testimonials only, with permission from the team quoted. */
  testimonials: [] as { quote: string; author: string; team: string }[],
};

export type NavLink = { label: string; href: string };

/**
 * The existing WordPress pages, same names and order as the original menu.
 * TODO(verify): confirm each path against the live WordPress menu.
 */
export const pages = {
  about: { label: "About Us", href: wp("/about-us/") },
  products: { label: "Products", href: wp("/products/") },
  contact: { label: "Contact Us", href: wp("/contact-us/") },
};

export const productLinks: NavLink[] = [
  { label: "Football", href: wp("/football/") },
  { label: "Cricket", href: wp("/cricket/") },
  { label: "Volleyball", href: wp("/volleyball/") },
  { label: "Throwball", href: wp("/throwball/") },
  { label: "Basketball", href: wp("/basketball/") },
  { label: "Kabaddi", href: wp("/kabaddi/") },
  { label: "Track & Suits", href: wp("/track-suits/") },
  { label: "Officials & Uniforms", href: wp("/officials-uniforms/") },
];

/** Original site menu: Home, About Us, Products (dropdown), Contact Us. */
export const menu: (NavLink & { children?: NavLink[] })[] = [
  { label: "Home", href: "/" },
  pages.about,
  { ...pages.products, children: productLinks },
  pages.contact,
];

export const telHref = `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`;

/** Best available route to a real conversation, in order of preference. */
export function contactHref(message?: string) {
  const { whatsapp, email } = site.contact;
  if (whatsapp) {
    // Same endpoint and number as the original site's button, with the brief pre-filled.
    if (!message) return site.whatsappUrl;
    return `https://api.whatsapp.com/send/?phone=${whatsapp}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
  }
  if (email) {
    const body = message ? `&body=${encodeURIComponent(message)}` : "";
    return `mailto:${email}?subject=${encodeURIComponent("Team kit enquiry")}${body}`;
  }
  return telHref;
}
