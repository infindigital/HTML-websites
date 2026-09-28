# iTHREE Sportswear — website

A cinematic, single-page brand site for iTHREE Sportswear, built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger), Framer Motion, Lenis and React Three Fiber.

It builds to **plain static HTML/CSS/JS** in `out/`, so it can be hosted on any static host (Netlify, Vercel, Cloudflare Pages, cPanel, S3, …).

## Run and build

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

Upload the contents of `out/` to the web host.

## Before launch: fill in business details

Everything the site says about the business lives in **`lib/site.ts`**. Nothing is invented: every empty value hides its UI.

| Field | What it shows |
| --- | --- |
| `contact.whatsapp` / `email` / `phone` | Where "Get a quote", "Talk to our team", "Send this brief" and the footer lead. **Until one is filled in, these buttons only scroll to the quote section.** |
| `contact.location` | Footer location |
| `social[].href` | Footer social links and schema.org `sameAs` |
| `stats` | Verified numbers for the trust section (otherwise qualitative signals are shown) |
| `clients` | Monochrome client logo wall (hidden when empty) |
| `testimonials` | Testimonial section (hidden when empty; real quotes only) |

Sport labels for each jersey are in `lib/products.ts`. They were assigned from each garment's cut and should be confirmed.

## Assets

Source files supplied by iTHREE stay untouched in this folder (`website logo.png`, the master video, `i3sportswear.zip`). Web versions in `public/` were generated from them:

- `scripts/process_images.py <folder of original PNGs>` builds the responsive WebP sets (240–1920px), the front/back textures for the Jersey Lab, and records image sizes. Jerseys are only trimmed and resized, never recoloured or edited.
- `scripts/process_video.py "<master video>.mp4"` builds `public/video/hero-720.webm` (VP9), `hero-720.mp4` (H.264) and `hero-480.mp4` (mobile), all without audio and with fast start, plus the stills in `public/images/stills/` and `public/og.jpg`. It also removes the small watermark in the master film's lower-right corner. Set `WATERMARK = None` in the script when processing a clean export.

`next/image` uses a custom loader (`lib/image-loader.ts`) that maps requested widths onto those pre-generated files.

## Structure

```
app/            layout (SEO metadata, JSON-LD), page, global tokens + type system
components/     one file per section; lab/ holds the WebGL stage and its CSS fallback
lib/            site config, product data, GSAP setup, hooks, image loader
public/         optimised images, video, icons, social image
```

## Motion and accessibility notes

- `prefers-reduced-motion` removes smooth scrolling, pinned sequences, parallax and autoplay. Every section renders in its final, readable state.
- Below 1024px, pinned sequences become vertical editorial layouts, WebGL is replaced by a CSS flip card, and the custom cursor is off.
- WebGL (Three.js) loads only on desktop, only when the Jersey Lab approaches, and pauses when off-screen.
- The hero film has a visible pause control.
