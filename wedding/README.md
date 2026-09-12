# Wedding Invitation Studio

A premium, mobile-first **wedding invitation template marketplace** — a luxury
digital catalogue where couples browse cinematic invitation designs across three
traditions, preview them with music, see the price, and order on WhatsApp.

```
Landing → Choose your celebration → Template → Preview + price → Order on WhatsApp
```

Three collections, each with its own visual language (no shared religious
symbols):

- ☪ **Muslim** — emerald · champagne · ivory
- ॐ **Hindu** — maroon · warm gold · ivory
- ✝ **Christian** — ivory · champagne · dusty rose · navy

Built with **React 18 + Vite**, **React Router** and **Framer Motion**.

---

## Quick start

```bash
cd wedding
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build → http://localhost:4173
```

> **Before going live**, set your brand name, WhatsApp number and prices in
> `src/studio/config.js`. See **[ASSETS-NEEDED.md](./ASSETS-NEEDED.md)** for the
> full setup + asset checklist.

---

## How it’s organised

```
src/
  studio/            ← marketplace data & design (single source of truth)
    config.js          brand, WhatsApp number, pricing tiers
    themes.js          per-religion colour/accent/symbol tokens
    templates.js       the 18-template catalogue (demo couples, copy, prices)
    whatsapp.js        builds the WhatsApp order links
    studio.css         marketplace design system (scoped under .studio)
  pages/             ← Landing, Collection, Category, TemplateDetail
  components/studio/  ← Navbar, Footer, cards, preview modal, tiles, mobile CTA
  invitation/        ← the live cinematic invitation engine (InvitationExperience)
  components/sections ← invitation sections (seal, verse, countdown, venue, …)
  context/           ← Theme, Language (i18n), Audio, Invitation (data override)
```

### The invitation engine is data-driven

The animated invitation (wax-seal → verse → family → countdown →
scratch-to-reveal → venue → closing, with music and 4 languages) reads the
couple’s names, monogram, date and venue from data — so **demo names are just
placeholders and a real customer’s details drop straight in** (see
`src/context/InvitationContext.jsx` and `src/config.js`). Muslim templates drive
this live engine; Hindu & Christian previews await their own videos/engines
(see ASSETS-NEEDED.md).

Adding a template is a single entry in `src/studio/templates.js` — no component
edits.

---

## Deploy

Deploys as a static site (e.g. Vercel with the project **Root Directory** set to
`wedding`). Routing uses `HashRouter`, so deep links work on any static host with
no rewrite config.
