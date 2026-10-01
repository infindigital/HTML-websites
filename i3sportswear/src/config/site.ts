/**
 * Business details, from the live i3sportswear.com site. This is the only
 * place to edit contact information. An empty value hides its UI; nothing
 * here is invented.
 */

/** The production homepage (canonical URL). */
export const SITE_URL = "https://i3sportswear.com";

/** Where the existing WordPress pages live. Every inner-page link uses it. */
export const WORDPRESS_URL = "https://i3sportswear.com";

export const BRAND = {
  name: "iTHREE Sportswear",
  legalName: "iThree Sports Wear",
  tagline: "Your team. Your style. Your jersey.",
};

export const PHONE = { display: "+91 95910 88069", href: "tel:+919591088069" };

/** Shown as a mailto: link once the address from the live site is confirmed. */
export const EMAIL = "";

export const ADDRESS = {
  full: "A 1-290(4), Tharabari Amtoor, Golthamajal, Bantwal",
  lines: ["A 1-290(4), Tharabari Amtoor,", "Golthamajal, Bantwal"],
  short: "Amtoor, Golthamajal, Bantwal",
};

export const OPENING_HOURS = {
  days: "Monday to Saturday",
  time: "7:00 AM – 9:00 PM",
  short: "Mon–Sat · 7 AM–9 PM",
  schema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "07:00", closes: "21:00" },
};

export const INSTAGRAM = { handle: "@i3_sportswear", href: "https://www.instagram.com/i3_sportswear/" };

/** The WhatsApp link used on the live site. Keep exactly as is. */
export const WHATSAPP = {
  number: "919591088069",
  href: "https://api.whatsapp.com/send/?phone=919591088069&text=Hello+i3+Sports+Wear%2C&type=phone_number&app_absent=0",
};

/** Same WhatsApp destination with a pre-filled message. */
export function whatsappWith(message: string) {
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP.number}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
}

export const SEO = {
  title: "iTHREE Sportswear | Custom Team Jerseys & Sportswear, Bantwal",
  description:
    "Custom jerseys and team kits for football, cricket, volleyball, throwball, basketball and kabaddi, plus track suits and official uniforms. Your colours, names, numbers and crest, made by iThree Sports Wear, Bantwal.",
};
