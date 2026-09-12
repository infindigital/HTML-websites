# Wedora Films - Wedding Invitation Studio

A premium, mobile-first **landing page** for cinematic wedding invitations. A
white, elegant design with a **3D hero** (Three.js), four signature invitation
designs, live interactive previews, and **WhatsApp ordering** at a flat **₹499**.

```
Landing → Preview a design (with music) → Order on WhatsApp
```

Built with **React 18 + Vite**, **React Router**, **Framer Motion** and
**@react-three/fiber** (Three.js).

---

## Quick start

```bash
cd wedding
npm install        # install dependencies
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the build → http://localhost:4173
```

> Set your **WhatsApp number** in `src/studio/config.js`, then see
> **[ASSETS-NEEDED.md](./ASSETS-NEEDED.md)** for the (optional) asset checklist.

---

## How it’s organised

```
src/
  studio/            ← data & design (single source of truth)
    config.js          brand (Wedora Films), WhatsApp number, price (₹499)
    themes.js          per-template colour palettes
    templates.js       the 4 designs (demo couples, copy, engine skins)
    whatsapp.js        builds the WhatsApp order links
    scroll.js          smooth in-page scrolling (HashRouter-safe)
    studio.css         white design system (scoped under .studio)
  pages/Landing.jsx  ← the single landing page
  components/studio/ ← Navbar, Footer, Hero3D, cards, preview modal, mobile CTA
  invitation/        ← the live cinematic invitation engine + per-design skins
  components/sections ← invitation sections (seal, verse, countdown, venue, …)
  context/           ← Theme, Language (i18n), Audio, Invitation (data override)
```

### The four designs

Two share the **live, data-driven invitation engine** in different colour worlds
(**Noor** - emerald; **Layali** - midnight blue); **Amara** and **Saanjh** show a
“preview coming soon” screen until a video (or a dedicated live build) is added.
Couple names are demo placeholders - the engine is data-driven, so a real
customer’s details drop straight in (`src/context/InvitationContext.jsx`).

Editing a design is a single entry in `src/studio/templates.js`.

---

## Deploy

Static site (e.g. Vercel with **Root Directory** = `wedding`). Routing uses
`HashRouter`, so deep links work on any static host with no rewrite config. The
3D hero is code-split and lazy-loaded so first paint stays fast.
