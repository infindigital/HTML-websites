# iTHREE Sportswear: homepage

The new homepage for https://i3sportswear.com/. Only the homepage lives here;
About, Products, the category pages, product pages and Contact stay on
WordPress, and every link points at those WordPress URLs.

Light editorial design built around the supplied photography. No 3D.

## Run and build

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
npm run lint    # type-check
```

## Where to edit things

| File | What it holds |
| --- | --- |
| `src/config/site.ts` | `SITE_URL`, `WORDPRESS_URL`, phone, email, address, opening hours, Instagram, WhatsApp, SEO title/description |
| `src/config/navigation.ts` | Menu and the eight WordPress category URLs |
| `src/config/productUrls.ts` | **WordPress product page for each jersey.** `null` = not mapped yet: the card links to its category (or all products) and carries `data-url-mapping="pending"` |
| `src/config/jerseys.ts` | The twelve supplied kits: names, sport (only where the supplied file name states it), panel colours |
| `src/config/content.ts` | Hero slides, promises, sports, customisation steps, process, why-choose, clients, testimonials |

Empty values hide their UI: no email is shown until `EMAIL` is set, and the
testimonials section stays hidden while `testimonials` is empty.

## Sections (components/home)

Header (mega menu, full-screen mobile menu) → Hero (four-slide campaign) →
Statement → JerseyShowcase (pinned horizontal archive on desktop, swipe on
phones) → SportsShowcase → Customize → Process → About → WhyChoose → Clients
(+ Testimonials when real quotes exist) → FinalCta → Contact → Footer, plus
the floating WhatsApp button.

The contact form has no server: it opens WhatsApp with the visitor's details
filled in, and says so.

## Assets

`scripts/process_assets.py` builds everything in `public/images/` from the two
supplied ZIPs (`jersey new photos.zip`, `remaining homepage photos.zip`):
background-removed front, back and pair cut-outs of each kit (the garments are
not edited), client logos, uniform photos and process illustrations. Re-run it
after replacing a ZIP.

## Motion and accessibility

GSAP ScrollTrigger + Lenis on desktop; native scrolling on touch. One pinned
section (the archive). The hero carousel pauses on hover, focus, off-screen
and hidden tabs and has a pause button. Under `prefers-reduced-motion` nothing
auto-plays or scrubs and all content is visible. The custom cursor and
magnetic buttons are desktop-only.
