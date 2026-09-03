# Azeem &amp; Noora — Interactive Wedding Invitation

A single-page, mobile-first digital wedding invitation built as a shareable
link (opens beautifully on WhatsApp). Premium gold-foil-on-cream Islamic
aesthetic with looping music, falling leaves, scroll-reveal animations, a
scratch-to-reveal card, a live countdown, a venue map, **4 languages**
(English, Kannada, Hindi, Arabic) with right-to-left support, and a dark/light
mode.

Built with **React 18 + Vite** and **Framer Motion**.

---

## Quick start

```bash
cd wedding
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173
```

Preview at phone width (~430px) using your browser's device toolbar.

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

---

## Assets

They live in `public/` (see `public/README.md`):

| File                 | What it is                        | Status                |
| -------------------- | --------------------------------- | --------------------- |
| `public/song.mp3`    | Looping background music          | ✅ included           |
| `public/preview.jpg` | 1200×630 social share image (OG)  | Placeholder included  |

Music playback (and every loop) starts **13 seconds in** to skip the intro —
adjust with `audioStartOffset` in `src/config.js` (`0` = from the start). The
invitation still works if the music file is ever removed; the button just
stays silent.

---

## Editing content

Almost everything is driven by two files.

### `src/config.js` — the facts

Names, parentage, date, venue, verse, Bismillah and asset paths. For example:

```js
couple: { groomFirst: 'Azeem', brideFirst: 'Noora', monogram: 'A ✦ N', ... },
date:   { iso: '2026-08-30T19:30:00+05:30', labelUpper: 'SUNDAY, 30 AUGUST 2026', ... },
venue:  { name: 'Indiana Convention Center', mapQuery: '…', ... },
```

- The countdown reads `date.iso` (keep the `+05:30` offset for IST).
- The Google Map and the "Get Directions" button are built automatically from
  `venue.mapQuery` — no API key needed.

### `src/i18n.js` — the wording (all languages)

Every visible string lives in a `translations` object keyed by language code
(`en`, `kn`, `hi`, `ar`). Editing a value changes that text instantly when the
language is selected. Any key missing from a language automatically falls back
to English.

> Names, the venue name/address, the Bismillah, and date numerals stay the same
> across languages by design — only wording is translated.

---

## Adding a language

1. Add the code to `languages` in **`src/config.js`**, e.g. `['en','kn','hi','ar','ta']`.
2. Add an entry to `LANGUAGE_META` in **`src/i18n.js`** with the native label and
   text direction:
   ```js
   ta: { code: 'ta', native: 'தமிழ்', english: 'TAMIL', dir: 'ltr' },
   ```
3. Add a matching block to `translations` with the same keys as `en`
   (untranslated keys fall back to English).
4. If the language uses a non-Latin script, add a font swap in
   **`src/index.css`** under the "per-language font swaps" section (mirroring
   the Hindi/Kannada `--label-font` / `--serif-font` overrides). Set `dir: 'rtl'`
   for right-to-left languages — the layout mirrors automatically.

The chosen language is saved to `localStorage` and restored on reload.

---

## How it's built

```
wedding/
├─ index.html                 # meta / Open Graph tags, Google Fonts
├─ src/
│  ├─ config.js               # ← couple, date, venue, assets
│  ├─ i18n.js                 # ← all translations (en/kn/hi/ar)
│  ├─ index.css               # design tokens + all styles
│  ├─ App.jsx                 # composes the sections
│  ├─ context/                # Theme, Language (RTL), Audio providers
│  └─ components/
│     ├─ ui/                  # MusicButton, LanguageSwitcher, ThemeToggle,
│     │                       #   FallingLeaves, ArchFrame, Reveal, Ornaments
│     └─ sections/            # the 8 sections, in order:
│                             #   SealIntro → MainInvitation → FamilyInvitation
│                             #   → ScratchCard → Countdown → Venue → Verse → Closing
└─ public/                    # song.mp3 (add), preview.jpg (placeholder)
```

Notes:

- **Music** uses a single looping `<audio>` element; playback starts on the
  first user gesture (the seal tap) because browsers block autoplay.
- **Falling leaves** are drawn on a full-screen `<canvas>` with
  `requestAnimationFrame`, and **pause when the visitor prefers reduced motion**.
- **Scroll reveals** use Framer Motion `whileInView` (once).
- **Scratch card** is an HTML5 `<canvas>` erased with
  `globalCompositeOperation = 'destination-out'`; it auto-reveals past ~50%.
- **Dark/light** and **language** both persist in `localStorage`.

---

## Deploy to Vercel

This is a static Vite site — it deploys with zero configuration.

**Option A — dashboard**

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** the repo.
3. Set **Root Directory** to `wedding/` (this folder). Vercel auto-detects Vite:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy** — you get a shareable `https://…vercel.app` link.

**Option B — CLI**

```bash
npm i -g vercel
cd wedding
vercel            # follow prompts (build: npm run build, output: dist)
vercel --prod     # promote to production
```

Any static host works too (Netlify, Cloudflare Pages, GitHub Pages): build with
`npm run build` and serve the `dist/` folder.

---

_Tip: the venue map is a keyless Google Maps embed; it renders on the public
web but may be blocked inside restricted sandboxes/preview environments._
