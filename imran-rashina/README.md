# Imran &amp; Rashina — Interactive Wedding Invitation

A single-page, mobile-first digital wedding invitation built as a shareable
link (opens beautifully on WhatsApp). Premium gold-foil-on-cream Islamic
aesthetic with looping music, falling leaves, scroll-reveal animations, a
scratch-to-reveal card, a live countdown, a venue map, **4 languages**
(English, Kannada, Hindi, Arabic) with right-to-left support, and a dark/light
mode.

Built with **React 18 + Vite** and **Framer Motion**. Cloned from the
`invite/` (Rayyan &amp; Inaya) template and personalised for Imran &amp; Rashina.

> **Served from a subpath:** `https://invite.infindigital.net/imran-rashina`
> (the studio landing page at `invite.infindigital.net/` is a separate project —
> the `wedding/` folder). That is why `vite.config.js` sets
> `base: '/imran-rashina/'`; see **Deploy** below.

---

## Quick start

```bash
cd imran-rashina
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173/imran-rashina/
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

Names, parentage, date, venue, verse, Bismillah and asset paths. **The couple
names are set to Imran &amp; Rashina; the full names, parents, date and venue are
still placeholders — replace every line marked `TODO` with the real details.**

```js
couple: { groomFirst: 'Imran', brideFirst: 'Rashina', monogram: 'I ✦ R', ... },
date:   { iso: '2026-08-30T19:30:00+05:30', labelUpper: 'SUNDAY, 30 AUGUST 2026', ... }, // TODO
venue:  { name: 'The Royal Palace', mapQuery: '…', ... }, // TODO
```

- The countdown reads `date.iso` (keep the `+05:30` offset for IST).
- The Google Map and the "Get Directions" button are built automatically from
  `venue.mapQuery` — no API key needed.
- Asset paths use `import.meta.env.BASE_URL` so they resolve under the
  `/imran-rashina` subpath — don't change them back to bare `/song.mp3`.

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
   **`src/index.css`** under the "per-language font swaps" section. Set
   `dir: 'rtl'` for right-to-left languages — the layout mirrors automatically.

The chosen language is saved to `localStorage` and restored on reload.

---

## How it's built

```
imran-rashina/
├─ index.html                 # meta / Open Graph tags, Google Fonts
├─ vite.config.js             # base: '/imran-rashina/'  ← subpath prefix
├─ src/
│  ├─ config.js               # ← couple, date, venue, assets
│  ├─ i18n.js                 # ← all translations (en/kn/hi/ar)
│  ├─ index.css               # design tokens + all styles
│  ├─ App.jsx                 # composes the sections
│  ├─ context/                # Theme, Language (RTL), Audio providers
│  └─ components/
│     ├─ ui/                  # MusicButton, LanguageSwitcher, ThemeToggle, …
│     └─ sections/            # SealIntro → MainInvitation → FamilyInvitation
│                             #   → ScratchCard → Countdown → Venue → Verse → Closing
└─ public/                    # song.mp3, preview.jpg
```

---

## Deploy — served at `invite.infindigital.net/imran-rashina`

This is a static Vite site. Because it lives on a **subpath** of a domain owned
by another project (the `wedding/` landing page), deploying is two parts:

### Part A — deploy this folder as its own Vercel project

1. In Vercel: **New Project → Import** this repo (`infindigital/HTML-websites`).
2. Set **Root Directory** to `imran-rashina`. Vercel auto-detects Vite
   (build: `npm run build`, output: `dist`).
3. **Deploy.** Because of the base path, the app lives at
   `https://<project>.vercel.app/imran-rashina/` (the bare root will 404 — that
   is expected; it is reached through the landing domain, below).

### Part B — route the subpath from the landing project

The `invite.infindigital.net` domain is attached to the **`wedding/`** project,
so only that project can forward the subpath. Add this to `wedding/vercel.json`
(it does **not** change the landing page — it only teaches the domain where
`/imran-rashina` goes). Replace the host with the Part A deployment's domain:

```json
{
  "rewrites": [
    { "source": "/imran-rashina",       "destination": "https://<project>.vercel.app/imran-rashina" },
    { "source": "/imran-rashina/:path*", "destination": "https://<project>.vercel.app/imran-rashina/:path*" }
  ]
}
```

Redeploy the landing project. `https://invite.infindigital.net/imran-rashina`
now serves this invitation.

> A simpler alternative that needs **no** change to the landing project is a
> subdomain — attach `imran-rashina.infindigital.net` directly to the Part A
> project (and set `base: '/'`). Use that if you'd rather not touch `wedding/`.

---

_Tip: the venue map is a keyless Google Maps embed; it renders on the public
web but may be blocked inside restricted sandboxes/preview environments._
