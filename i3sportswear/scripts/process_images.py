"""Build responsive WebP derivatives from the supplied iTHREE product PNGs.

Originals are never modified: every output is a trimmed, resized copy.
Usage: python3 scripts/process_images.py <dir-with-original-pngs>
"""
import json
import sys
from pathlib import Path

from PIL import Image

SRC = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "images"
WIDTHS = [240, 480, 960, 1440, 1920]

# Supplied file -> stable slug. Front/back split column is given only for
# images whose front and back views are fully separated by transparency.
JERSEYS = {
    "1 (1).png": ("noir-gold", None),
    "13.png": ("ivory-gold", "split"),
    "07.png": ("yellow-circuit", "split"),
    "08.png": ("sky-brush", None),
    "10 (1).png": ("coral-teal", "split"),
    "03.png": ("black-volt", None),
    "02.png": ("teal-stripe", None),
    "04.png": ("azure-geo", None),
    "05.png": ("ink-dragon", None),
    "09.png": ("storm-blue", "split"),
    "11.png": ("shatter-longsleeve", None),
    "12.png": ("crimson-wolf", None),
}


def save_set(im: Image.Image, base: Path, widths=WIDTHS):
    base.parent.mkdir(parents=True, exist_ok=True)
    for w in widths:
        if w > im.width * 1.05 and w != widths[0]:
            # never upscale; reuse the largest real size under the bigger name
            src = im
        else:
            src = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if w < im.width else im
        src.save(f"{base}-{w}.webp", "WEBP", quality=82, method=6)


def split_columns(alpha: Image.Image):
    """Return (left_box, right_box) around the widest empty column gap."""
    w, h = alpha.size
    cols = alpha.resize((w, 1), Image.BOX)
    occ = [cols.getpixel((x, 0)) > 2 for x in range(w)]
    best, start = (0, 0, 0), None
    for x, o in enumerate(occ + [True]):
        if not o and start is None:
            start = x
        elif o and start is not None:
            if x - start > best[0] and 0.2 * w < start < 0.8 * w:
                best = (x - start, start, x)
            start = None
    _, a, b = best
    mid = (a + b) // 2
    return (0, 0, mid, h), (mid, 0, w, h)


meta = {}
for name, (slug, mode) in JERSEYS.items():
    im = Image.open(SRC / name).convert("RGBA")
    if name == "11.png":
        # 11.png ships with a faint studio backdrop at alpha 38 around an opaque
        # kit; clear it (rescaling the anti-aliased edge) so it cuts out cleanly.
        im.putalpha(im.getchannel("A").point(lambda v: 0 if v <= 38 else min(255, round((v - 38) * 255 / 217))))
    bbox = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    im = im.crop(bbox)
    save_set(im, OUT / "jerseys" / slug)
    entry = {"w": im.width, "h": im.height}
    if mode == "split":
        for side, box in zip(("front", "back"), split_columns(im.getchannel("A"))):
            part = im.crop(box)
            part = part.crop(part.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
            # pad to a common square canvas so both faces share one plane size
            side_len = max(part.size)
            canvas = Image.new("RGBA", (side_len, side_len), (0, 0, 0, 0))
            canvas.paste(part, ((side_len - part.width) // 2, (side_len - part.height) // 2))
            canvas = canvas.resize((1536, 1536), Image.LANCZOS)
            (OUT / "lab").mkdir(parents=True, exist_ok=True)
            canvas.save(OUT / "lab" / f"{slug}-{side}.webp", "WEBP", quality=86, method=6)
            canvas.resize((768, 768), Image.LANCZOS).save(OUT / "lab" / f"{slug}-{side}-sm.webp", "WEBP", quality=84, method=6)
        entry["split"] = True
    meta[slug] = entry
    print(slug, entry)

(ROOT / "scripts" / "image-meta.json").write_text(json.dumps(meta, indent=2))
