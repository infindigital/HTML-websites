import { WORDPRESS_URL } from "./site";

/**
 * Links to the existing WordPress pages. Absolute URLs on purpose: this
 * homepage is served separately, so "/about-us/" would not exist here.
 * Slugs follow the live site exactly (including "vollyball").
 */
const wp = (path: string) => `${WORDPRESS_URL}${path}`;

export type NavLink = { label: string; href: string };

export const pages = {
  home: { label: "Home", href: `${WORDPRESS_URL}/` },
  about: { label: "About Us", href: wp("/about-us/") },
  products: { label: "Products", href: wp("/products/") },
  contact: { label: "Contact Us", href: wp("/contact-us/") },
} satisfies Record<string, NavLink>;

/** Product categories, in the order of the live Products menu. */
export const categories = {
  football: { label: "Football", href: wp("/product-category/football/") },
  cricket: { label: "Cricket", href: wp("/product-category/cricket/") },
  volleyball: { label: "Volleyball", href: wp("/product-category/vollyball/") },
  throwball: { label: "Throwball", href: wp("/product-category/throwball/") },
  basketball: { label: "Basketball", href: wp("/product-category/basketball/") },
  kabaddi: { label: "Kabaddi", href: wp("/product-category/kabaddi/") },
  trackSuits: { label: "Track & Suits", href: wp("/product-category/track-suits/") },
  officials: { label: "Official & Uniforms", href: wp("/product-category/official-and-uniforms/") },
} satisfies Record<string, NavLink>;

export type CategoryKey = keyof typeof categories;

export const categoryList: (NavLink & { key: CategoryKey })[] = (Object.keys(categories) as CategoryKey[]).map((key) => ({
  key,
  ...categories[key],
}));

/** Main menu: Home, About Us, Products (dropdown), Contact Us. */
export const mainMenu: (NavLink & { children?: NavLink[] })[] = [
  pages.home,
  pages.about,
  { ...pages.products, children: categoryList },
  pages.contact,
];
