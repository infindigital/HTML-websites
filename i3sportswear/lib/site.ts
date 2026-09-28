/**
 * Business details — the single place to edit contact info and social proof.
 *
 * Only verified information belongs here. Every empty value hides its UI:
 * no contact detail, statistic, client logo or testimonial is ever invented.
 */
export const site = {
  name: "iTHREE Sportswear",
  url: "https://i3sportswear.com",
  title: "iTHREE Sportswear — Custom Sportswear & Team Jerseys",
  description:
    "Custom performance wear engineered around your team. Custom football, cricket, basketball and volleyball jerseys designed with your colours, crest, names and numbers.",

  contact: {
    // TODO(business): fill in verified details. Leave "" to hide an item.
    email: "",
    phone: "", // display format, e.g. "+971 50 000 0000"
    whatsapp: "", // digits only with country code, e.g. "971500000000"
    location: "", // e.g. "Dubai, United Arab Emirates"
  },

  // Full profile URLs. Empty entries are hidden.
  social: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "TikTok", href: "" },
    { label: "LinkedIn", href: "" },
  ],

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

export const nav = [
  { label: "Sports", href: "#sports" },
  { label: "Customize", href: "#lab" },
  { label: "Our Story", href: "#identity" },
  { label: "Work", href: "#archive" },
];

/** Best available route to a real conversation, in order of preference. */
export function contactHref(message?: string) {
  const { whatsapp, email, phone } = site.contact;
  if (whatsapp) {
    const text = message ? `?text=${encodeURIComponent(message)}` : "";
    return `https://wa.me/${whatsapp}${text}`;
  }
  if (email) {
    const body = message ? `&body=${encodeURIComponent(message)}` : "";
    return `mailto:${email}?subject=${encodeURIComponent("Team kit enquiry")}${body}`;
  }
  if (phone) return `tel:${phone.replace(/[^\d+]/g, "")}`;
  return "#quote";
}

export const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
