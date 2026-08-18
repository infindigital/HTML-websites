# RS Chef'z — Immersive 3D Product Experience

A premium, 3D-first website for **RS Chef'z** masalas, rebuilt from scratch as a
cinematic digital showroom. The physical masala pouches are the hero objects: a
single persistent WebGL canvas carries the two products through the whole page,
driven by scroll, pointer and drag, while accessible HTML content layers on top.

Visual system adapted from the supplied **`d2`** design spec (warm walnut canvas,
cream typography, ember accent, oversized uppercase display, editorial layout).

## Tech stack

- **Vite** + **React 19**
- **Three.js** + **React Three Fiber** + **@react-three/drei**
- **GSAP** + **ScrollTrigger** (scroll-driven reveals & product poses)
- **Lenis** (smooth scroll)

## Run it

```bash
cd rs-chefz
npm install        # install dependencies
npm run dev        # start dev server -> http://localhost:5173
```

Production build:

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve the build -> http://localhost:4173
```

The pre-built site is already in **`dist/`** — you can host that folder as-is on
any static host (Netlify, Vercel, GitHub Pages, S3, nginx). `base: './'` in
`vite.config.js` means it works from any subpath.

## Interaction

- **Scroll** drives the whole experience — the product transitions continuously
  from hero → lineup → each product → explorer → shop → final.
- **Move the pointer** for subtle parallax; **drag** to rotate the pack.
- **Reduced motion** (`prefers-reduced-motion`) disables smooth scroll and idle
  animation and presents a static product.

## Replacing the 3D model

The pack is procedural (`src/three/Packet.jsx`) and textured with the real pack
artwork under `public/assets/products/*/front.webp` + `back.webp`. To swap in a
real GLB:

1. Drop the model in `public/models/` (e.g. `rs-chefz-gobi.glb`).
2. In `Packet.jsx`, replace the `RoundedBox` body with
   `useGLTF('./models/rs-chefz-gobi.glb')`; the rig in `Scene.jsx` stays the same.

## Structure

```
src/
  three/      Scene.jsx, Packet.jsx, stage.js   (WebGL + scroll-driven poses)
  components/ Navigation, LoadingScreen, CustomCursor, Footer
  components/sections/  Hero, Lineup, ProductFocus, Explorer, Ritual,
                        Ingredients, Story, Promise, Shop, Final
  data/content.js       All RS Chef'z copy + Amazon URL
  styles/     tokens.css (d2 tokens), global.css, sections.css
public/assets/          Real RS Chef'z pack, ingredient & dish artwork
```

## Content & SEO

All product names, descriptions, process, story, promises and certifications
exist as crawlable HTML (`index.html` carries title, meta, Open Graph, Twitter,
canonical and JSON-LD Organization + Product schema; a `<noscript>` fallback
lists products and the Amazon link). Nothing is invented — copy is transcribed
from the existing RS Chef'z site.
