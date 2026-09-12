# Wedora Films — assets & setup

The landing page is live with **placeholder posters** and two working live
invitations. Drop real assets in as they’re ready — they light up automatically.

---

## 1. One thing still to set

Open **`src/studio/config.js`** and set your real **WhatsApp number**
(international format, digits only — e.g. `9199XXXXXXXX`):

```js
whatsappNumber: '910000000000',  // ← replace with your number
```

Already set for you: brand **Wedora Films**, flat price **₹499**. Optional:
`email`, `instagram` (shown in the footer).

---

## 2. The four designs

| Design | Look | Status | Needs |
|---|---|---|---|
| **Noor** | Emerald & gold | ✅ Live interactive invitation | (optional) real poster image |
| **Layali** | Midnight blue & gold | ✅ Live interactive invitation | (optional) real poster image |
| **Amara** | Blush, ivory & champagne | ⏳ Preview pending | a **preview video** (or a dedicated live build) |
| **Saanjh** | Marigold & maroon | ⏳ Preview pending | a **preview video** (or a dedicated live build) |

Noor and Layali are the same cinematic engine in two different colour worlds.
Amara and Saanjh show a “preview coming soon” screen until you either upload a
video or ask me to build dedicated live invitations for them.

---

## 3. Where to drop files

```
public/
  assets/
    noor-preview.webp     layali-preview.webp     ← optional real posters (800×1000, 4:5)
    amara-preview.webp    saanjh-preview.webp
    amara.mp4             saanjh.mp4              ← preview videos (≤1080p H.264, 20–45s)
  song.mp3                                        ← current music for the live invitations
  preview.jpg                                     ← social-share image (1200×630)
```

To attach a real asset, set the path on that template in
**`src/studio/templates.js`** (one line each):

```js
poster: '/assets/amara-preview.webp',
previewVideo: '/assets/amara.mp4',
audioUrl: '/assets/amara-music.mp3',
```

---

## 4. Image / video generation prompts

On-brand prompts for 4:5 posters and cinematic loops. No text, no faces, no logos.

**Noor — emerald & gold**
> Luxury wedding invitation backdrop, deep emerald and champagne gold, intricate
> geometric latticework and a slender arch, soft golden lantern light and floating
> gold dust, elegant and minimal, cinematic lighting, vertical 4:5.

**Layali — midnight & gold**
> Luxury wedding invitation backdrop, midnight sapphire blue and antique gold,
> starlit night sky with a fine crescent, delicate star lattice and soft gold
> constellations, regal and cinematic, vertical 4:5.

**Amara — blush & ivory**
> Elegant wedding invitation backdrop, ivory and champagne with dusty-rose
> accents, soft florals and candlelight, gentle chapel arch and warm bokeh,
> romantic cinematic light, vertical 4:5.

**Saanjh — marigold & maroon**
> Luxury wedding invitation backdrop, deep maroon and warm marigold gold, delicate
> mandala patterns and marigold florals, glowing diya light and soft petals,
> cinematic warm lighting, vertical 4:5.

For preview videos, use the same directions as 20–45s cinematic loops: slow camera
moves, soft particles, elegant type animation, premium easing.

---

*Send me the WhatsApp number and any assets (or ask me to generate them), and I’ll
wire everything up — and I can build dedicated live invitations for Amara & Saanjh
to match Noor and Layali.*
