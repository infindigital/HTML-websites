# Imran PJ &amp; Rashina — Wedding Invitation (static build)

The **pre-built** invitation for Imran PJ &amp; Rashina, served at:

    https://invite.infindigital.net/imran-rashina

Wedding: 3 October 2026 · Sagar Auditorium, Panemangalore (Bantwal, Karnataka).

This folder holds the **compiled site only** (client-supplied build), not the
source. It was built with Vite `base: '/imran-rashina/'`, so every asset URL
already carries the `/imran-rashina/` prefix:

    index.html
    assets/…            (hashed JS + CSS + infin-logo)
    song.mp3, preview.jpg

## How it goes live

1. **Its own Vercel project** — import `infindigital/HTML-websites`, set
   **Root Directory = `imran-rashina`**, Framework Preset **Other**, and leave
   the build command empty (it is already built). Name the project
   **`imran-rashina`** so its URL is `imran-rashina.vercel.app`.
2. **The landing project forwards the path** — `wedding/vercel.json` already
   rewrites `/imran-rashina` and `/imran-rashina/*` to that deployment. The
   landing page itself is not changed.

Result: `https://invite.infindigital.net/imran-rashina` shows this invitation.

> Opening the raw `imran-rashina.vercel.app` URL directly will look unstyled —
> that is expected, because the app is built for the `/imran-rashina` path.
> Always test the real URL above.

## Swapping this for the next client (temporary slot)

- **Same URL** (`/imran-rashina`): replace the files in this folder with the new
  client's build (also built with `base: '/imran-rashina/'`) and redeploy the
  `imran-rashina` Vercel project. Nothing else changes.
- **A new URL** (e.g. `/aisha-omar`): add a sibling folder with that client's
  build (`base: '/aisha-omar/'`), create a new Vercel project for it, and add one
  more rewrite pair to `wedding/vercel.json` (copy the two `/imran-rashina` lines
  and swap the name).
