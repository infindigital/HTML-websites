# Public assets

Drop these two files into this `public/` folder. They are served from the
site root (e.g. `public/song.mp3` → `/song.mp3`).

## 1. `song.mp3` — background music  ✅ included

The looping background music (added).

- The app starts silent and begins playback on the first tap of the wax seal
  (browsers block autoplay). If the file is ever missing, the invitation still
  works — the music button simply stays silent.
- Playback (and every loop) starts **13 seconds in**, skipping the track's
  intro. Change or remove this with `audioStartOffset` in `src/config.js`
  (set it to `0` to play from the very beginning).
- Keep it small for fast loading on mobile / WhatsApp (a 2–4 MB MP3 is ideal).
- To swap the track, replace this file (keep the name `song.mp3`), or point
  `audioSrc` in `src/config.js` at a different filename.

## 2. `preview.jpg` — social share image  ✅ placeholder included

A **1200×630** image shown when the link is shared on WhatsApp, Facebook, etc.
A branded placeholder is already here — replace it with your own photo/design
at the same size and filename, or point `previewImage` in `src/config.js`
somewhere else.

> Do not use third-party/copyrighted content for either file.
