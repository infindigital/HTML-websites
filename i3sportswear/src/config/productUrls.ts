/**
 * WordPress product page for each jersey in "Our custom jersey designs".
 *
 * A URL goes here only after the jersey photo has been compared with the
 * product page's own images and shows the exact same design (colours,
 * pattern, collar, sleeves, panels, logo placement). `null` = no verified
 * match: the card is shown but is not a link and has no "view" prompt.
 *
 * Verification, October 2026: the eight live "Official Jersey" products
 * (official-jersey-4 … official-jersey-11, listed below) are collared polo
 * shirts in maroon, navy, violet, taupe, slate, black and white, as shown
 * on the live homepage. None of the twelve supplied sports jerseys is a
 * polo, so none of them matches and every entry stays null.
 */
export const productUrls: Record<string, string | null> = {
  "black-gold": null,
  "neon-green": null,
  "red-wolf": null,
  "blue-brushstroke": null,
  "blue-geometric": null,
  dragon: null,
  "white-teal": null,
  "cream-uniform": null,
  teal: null,
  "yellow-basketball": null,
  "blue-marbled": null,
  "black-full-sleeve": null,
};

/**
 * The only product URLs that may be used for the "Official Jersey" designs.
 * Assign one to a jersey above only after a visual match on its product page.
 */
export const officialJerseyProductUrls = [
  "https://i3sportswear.com/product/official-jersey-11/",
  "https://i3sportswear.com/product/official-jersey-10/",
  "https://i3sportswear.com/product/official-jersey-9/",
  "https://i3sportswear.com/product/official-jersey-8/",
  "https://i3sportswear.com/product/official-jersey-7/",
  "https://i3sportswear.com/product/official-jersey-6/",
  "https://i3sportswear.com/product/official-jersey-5/",
  "https://i3sportswear.com/product/official-jersey-4/",
] as const;
