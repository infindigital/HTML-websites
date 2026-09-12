# Wedding Invitation Studio — assets & setup

This marketplace is built and runs now with **placeholder posters** and the
existing **Muslim invitation engine** wired up as the live Muslim templates.
Everything below is what turns the placeholders into the finished product.

Nothing here blocks the site from working — drop assets in as they’re ready and
they light up automatically.

---

## 1. Fill these in first (5 minutes)

All business settings live in **`src/studio/config.js`**:

| Setting | Where | Current (placeholder) |
|---|---|---|
| **Studio / brand name** | `brandName`, `brandFull` | `AURELIA` |
| **WhatsApp number** (digits only, e.g. `919900851873`) | `whatsappNumber` | `910000000000` ← **must change** |
| **Prices** (placeholder tiers) | `priceTiers` | Essential 2999 / Signature 4999 / Cinematic 7999 |
| Contact email / Instagram | `email`, `instagram` | placeholders |

> Prices are **placeholders** — confirm your real numbers and edit the three
> tiers. Every card, detail page and WhatsApp message updates automatically.

The brand name in the browser tab lives in **`index.html`** (`<title>` + the
`og:`/`twitter:` tags) — change `AURELIA` there too.

---

## 2. Folder structure for assets

```
public/
  assets/
    muslim/      hindu/      christian/     ← posters + preview videos
    music/                                  ← audio tracks (optional per template)
  preview.jpg                               ← social-share image (og:image)
  song.mp3                                  ← current Muslim engine track
```

Use **meaningful filenames** that match each template’s slug, e.g.
`muslim/noor-preview.webp`, `hindu/rang.mp4`, `music/piano-strings.mp3`.

---

## 3. What each template needs

There are **18 templates** (6 Muslim, 6 Hindu, 6 Christian). For each you can
supply up to three files. All are optional — the site falls back gracefully.

| Asset | Path pattern | Recommended | Fallback if missing |
|---|---|---|---|
| **Poster** (card + detail image) | `/assets/<cat>/<slug>-preview.webp` | 800×1000 (4:5), WebP | Themed placeholder SVG (already generated) |
| **Preview video** | `/assets/<cat>/<slug>.mp4` | ≤1080p, H.264 MP4, 30–60s, with a poster frame | “Cinematic preview coming soon” + poster |
| **Music** | `/assets/music/<name>.mp3` | 128–192 kbps MP3, loopable | No music toggle shown |

**To attach a real asset**, open `src/studio/templates.js`, find the template,
and set the field (this is the *only* edit needed):

```js
mk({
  category: 'hindu', slug: 'rang', title: 'Rang', /* … */
  poster: '/assets/hindu/rang-preview.webp',   // real poster
  previewVideo: '/assets/hindu/rang.mp4',       // real video
  audioUrl: '/assets/music/sitar-tabla.mp3',    // real music
})
```

Slugs (for filenames): 
- **Muslim** — noor, qamar, andalus, firdaus, layl, ward
- **Hindu** — rang, saanjh, bandhan, amrit, utsav, kalyanam
- **Christian** — eternal, grace, aurora, cana, bloom, vow

---

## 4. About the invitation engine (important)

The existing animated invitation (wax-seal → verse → family → countdown →
scratch-to-reveal → venue → closing, with music and 4 languages) is **fully
data-driven** now — the couple’s names/monogram come from data, so the
the previous couple’s personal details are gone and any couple can be swapped in.

- **Muslim templates** drive this live engine (their “Watch invitation” opens
  it with that template’s demo couple). Its visual language is Islamic
  (Bismillah, a Qur’an verse, mihrab arch, crescent).
- **Hindu & Christian templates** deliberately do **not** reuse that engine —
  mixing religious symbols across faiths is exactly what your brief said to
  avoid. They currently show a “cinematic preview coming soon” screen.

**So for Hindu & Christian you have two paths:**
1. **Supply preview videos** (`/assets/hindu/<slug>.mp4`, etc.) — quickest; they
   play in the card/preview instantly. *(Recommended first step.)*
2. **Commission dedicated Hindu/Christian invitation engines** (a later build) —
   themed the same data-driven way. Say the word and I’ll build these.

---

## 5. Creative direction per category

Keep each world distinct. **Never** borrow another faith’s symbols.

### ☪ Muslim — *emerald · champagne · ivory*
- Islamic geometry, elegant arches, lantern light, subtle crescent, gold dust.
- Mood: sophisticated, minimal, cinematic. Elegant, not decoration-heavy.

### ॐ Hindu — *maroon · warm gold · ivory*
- Mandala geometry, floral detail, diya glow, temple/heritage architecture,
  petals, warm particles. Luxurious and wedding-focused — **not** a festival poster.

### ✝ Christian — *ivory · champagne · dusty rose · deep navy*
- Elegant florals, soft cinematic light, chapel-inspired architecture, tasteful
  cross, candlelight, soft bokeh, petals. Respectful and romantic.

---

## 6. Image-generation prompts (for posters / backgrounds)

If you generate imagery, these produce on-brand 4:5 posters. Replace the couple
line per template. **Do not** add real people’s faces or real logos.

**Muslim (e.g. Noor):**
> Luxury Muslim wedding invitation backdrop, deep emerald and champagne-gold,
> intricate Islamic geometric latticework and a slender arch, soft golden
> lantern light and floating gold dust, elegant and minimal, cinematic studio
> lighting, vertical 4:5, no text, no faces.

**Hindu (e.g. Rang):**
> Luxury Hindu wedding invitation backdrop, rich maroon and warm gold, delicate
> mandala patterns and marigold florals, glowing diya light and soft petals,
> heritage temple motifs, cinematic warm lighting, vertical 4:5, no text, no faces.

**Christian (e.g. Eternal):**
> Elegant Christian wedding invitation backdrop, ivory champagne with dusty rose
> and deep navy accents, soft florals and candlelight, chapel arch and gentle
> bokeh, romantic cinematic light, vertical 4:5, no text, no faces.

For **preview videos**, the same directions apply as 20–45s cinematic loops:
slow camera moves, soft particles, elegant type animation, premium easing — no
cheap flashy transitions.

---

## 7. Social share image

`public/preview.jpg` (1200×630) is the link-preview image used when the site is
shared on WhatsApp/social. Replace it with a branded studio image.

---

*Send me the files (or generate them) and I’ll wire each template, confirm the
prices/WhatsApp number, and can then build dedicated Hindu & Christian invitation
engines to match the Muslim one.*
