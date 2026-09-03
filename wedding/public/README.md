# Public assets

Drop these two files into this `public/` folder. They are served from the
site root (e.g. `public/song.mp3` → `/song.mp3`).

## 1. `song.mp3` — background music  ⚠️ TODO: add this file

The looping background music. **Not included** — add your own royalty-free /
licensed track here as `public/song.mp3`.

- The app starts muted and begins playback on the first tap of the wax seal
  (browsers block autoplay). If the file is missing, the invitation still
  works — the music button simply stays silent until you add the track.
- Keep it small for fast loading on mobile / WhatsApp (a 2–4 MB MP3 is ideal).
- To use a different filename or format, update `audioSrc` in `src/config.js`.

## 2. `preview.jpg` — social share image  ✅ placeholder included

A **1200×630** image shown when the link is shared on WhatsApp, Facebook, etc.
A branded placeholder is already here — replace it with your own photo/design
at the same size and filename, or point `previewImage` in `src/config.js`
somewhere else.

> Do not use third-party/copyrighted content for either file.
