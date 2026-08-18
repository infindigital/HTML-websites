/**
 * All RS Chef'z content, transcribed from the existing site
 * (config/products.ts, config/gobi.ts, brand copy). Nothing invented.
 */

export const AMAZON_URL =
  'https://www.amazon.in/stores/RSChefz/page/55B0C3F8-FE1A-4327-BE19-97F52D44C69D?lp_asin=B0D5CP554F&ref_=ast_bln&store_ref=bl_ast_dp_brandlogo_sto';

export const brand = {
  name: "RS Chef'z",
  tagline: 'Authentic Flavour. Crafted to Perfection.',
  location: 'Mangaluru, India',
};

export const nav = [
  { id: 'intro', label: 'Intro' },
  { id: 'products', label: 'Products' },
  { id: 'process', label: 'Process' },
  { id: 'story', label: 'Story' },
  { id: 'shop', label: 'Shop' },
];

export const products = [
  {
    slug: 'gobi-manchurian-masala',
    key: 'gobi',
    name: 'Gobi Manchurian Masala',
    shortName: 'Gobi Manchurian',
    index: '01',
    tagline: 'Crispy. Spicy. Restaurant-style.',
    body:
      'A 3 in 1 blend for Gobi, Mushroom and Paneer. One pack, multiple favourites — Manchurian, Fry or Tikka.',
    dishes: ['Gobi', 'Mushroom', 'Paneer'],
    ratio: { masala: '50g', food: '700g' },
    accent: '#dc5000',
    front: './assets/products/gobi-manchurian/front.webp',
    back: './assets/products/gobi-manchurian/back.webp',
  },
  {
    slug: 'three-in-one-masala',
    key: 'threeInOne',
    name: '3 in 1 Masala',
    shortName: '3 in 1',
    index: '02',
    tagline: 'One masala. Three favourites.',
    body:
      'Perfect for Chicken 65, Fish Fry and Gobi Manchurian. One pack covers Kabab, Fry and Tikka styles.',
    dishes: ['Chicken 65', 'Fish Fry', 'Gobi Manchurian'],
    ratio: { masala: '500g', food: '7.5kg' },
    accent: '#dc5000',
    front: './assets/products/three-in-one/front.webp',
    back: './assets/products/three-in-one/back.webp',
  },
];

export const process = [
  { index: '01', title: 'Blend', body: 'Measure the masala to the cleaned vegetable, chicken or fish. One printed ratio, no guesswork.' },
  { index: '02', title: 'Rest', body: 'Coat and let it sit. The blend draws in and the coating sets before it ever meets the oil.' },
  { index: '03', title: 'Fry', body: 'Deep fry, air fry or pan fry. A coating that stays crisp and restaurant-style, ready in minutes.' },
];

export const ingredients = [
  { id: 'chilli', name: 'Chilli', img: './assets/products/gobi-manchurian/ing-chilli.webp' },
  { id: 'turmeric', name: 'Turmeric', img: './assets/products/gobi-manchurian/ing-turmeric.webp' },
  { id: 'ginger', name: 'Ginger', img: './assets/products/gobi-manchurian/ing-ginger.webp' },
  { id: 'spices', name: 'Natural Spices', img: './assets/products/gobi-manchurian/ing-spices.webp' },
];

export const promises = ['No artificial colours', 'No preservatives', 'No artificial flavours'];

export const story = {
  label: 'The Story',
  heading: "Born in Mangaluru's kitchens.",
  body: ['Blended the way chefs blend.', 'Cooked in yours, in minutes.'],
};

export const certs = ['FSSAI Licensed', 'Proudly a Product of India'];
