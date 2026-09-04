# -*- coding: utf-8 -*-
"""Optimize + SEO-rename every used source image into assets/img/ as WebP.

Reads data.py (single source of truth), converts every referenced image,
and emits _build/img_manifest.json mapping web-path -> [w, h] so the page
generator can set width/height attributes (zero cumulative layout shift).
"""
import os, sys, json
from PIL import Image, ImageOps, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)                       # nearprint/
SRC  = os.path.join(ROOT, "_extracted", "images", "nearprint_images")
OUT  = os.path.join(ROOT, "assets", "img")
sys.path.insert(0, HERE)
import data  # noqa: E402

manifest = {}

def src(name):
    """Resolve a source image by basename, tolerant of .jpg/.png mismatch."""
    p = os.path.join(SRC, name)
    if os.path.exists(p):
        return p
    base, _ = os.path.splitext(name)
    for ext in (".jpg", ".jpeg", ".png", ".webp"):
        alt = os.path.join(SRC, base + ext)
        if os.path.exists(alt):
            return alt
    return p  # let the caller raise a clear FileNotFoundError

def outdir(*parts):
    d = os.path.join(OUT, *parts)
    os.makedirs(d, exist_ok=True)
    return d

def record(webpath, im):
    manifest[webpath] = [im.width, im.height]

def load(name):
    im = Image.open(src(name))
    im = ImageOps.exif_transpose(im)
    return im

def fit_within(im, max_w, max_h):
    """Resize preserving aspect ratio to fit inside the box (no upscaling)."""
    w, h = im.size
    scale = min(max_w / w, max_h / h, 1.0)
    if scale < 1.0:
        im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    return im

def cover_crop(im, tw, th):
    """Resize + center-crop to exactly tw x th (fills the box)."""
    return ImageOps.fit(im, (tw, th), Image.LANCZOS, centering=(0.5, 0.45))

def save_webp(im, folder_parts, filename, quality, has_alpha=False):
    d = outdir(*folder_parts)
    path = os.path.join(d, filename)
    if has_alpha:
        if im.mode != "RGBA":
            im = im.convert("RGBA")
    else:
        if im.mode != "RGB":
            im = im.convert("RGB")
    im.save(path, "WEBP", quality=quality, method=6)
    web = "/assets/img/" + "/".join(folder_parts + [filename])
    record(web, im)
    return web

def corner_bg(im):
    """Median-ish background colour sampled from the four corners."""
    rgb = im.convert("RGB")
    w, h = rgb.size
    s = max(2, min(w, h) // 20)
    boxes = [(0, 0, s, s), (w - s, 0, w, s), (0, h - s, s, h), (w - s, h - s, w, h)]
    cols = []
    for b in boxes:
        patch = rgb.crop(b)
        px = list(patch.getdata())
        r = sum(p[0] for p in px) // len(px)
        g = sum(p[1] for p in px) // len(px)
        bl = sum(p[2] for p in px) // len(px)
        cols.append((r, g, bl))
    cols.sort(key=lambda c: sum(c))
    return cols[len(cols) // 2]  # median by brightness

def logo_tile(im, tw, th, pad_x, pad_y):
    """Contain the logo on a uniform tile filled with its own background colour."""
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        flat = Image.new("RGB", im.size, (255, 255, 255))
        flat.paste(im, mask=im.split()[3])
        im = flat
    bg = corner_bg(im)
    inner = fit_within(im.convert("RGB"), tw - 2 * pad_x, th - 2 * pad_y)
    canvas = Image.new("RGB", (tw, th), bg)
    x = (tw - inner.width) // 2
    y = (th - inner.height) // 2
    canvas.paste(inner, (x, y))
    return canvas

# ---------------------------------------------------------------------------
print(">> Products")
prod_count = 0
for svc in data.SERVICES:
    seen = {}
    for g in svc["groups"]:
        for name, s in g["products"]:
            slug = data.slugify(name)
            if slug in seen:            # keep filenames unique within a folder
                seen[slug] += 1
                slug = "%s-%d" % (slug, seen[slug])
            else:
                seen[slug] = 1
            im = fit_within(load(s), 820, 820)
            save_webp(im, [svc["folder"]], slug + ".webp", 80)
            prod_count += 1
print("   %d product images" % prod_count)

print(">> Service cards")
for svc in data.SERVICES:
    im = fit_within(load(svc["card_img"]), 1000, 760)
    save_webp(im, ["cards"], svc["key"] + ".webp", 82)

print(">> Machines")
for m in data.MACHINES:
    im = fit_within(load(m["src"]), 900, 700)
    save_webp(im, ["machines"], data.slugify(m["name"]) + ".webp", 82)

print(">> Client logos")
for s in data.CLIENT_LOGOS:
    idx = s.split("_img")[1].split(".")[0]           # e.g. '07'
    tile = logo_tile(load(s), 320, 190, 26, 22)
    save_webp(tile, ["clients"], "client-%s.webp" % idx, 90)
print("   %d logos" % len(data.CLIENT_LOGOS))

print(">> Hero / facility / OG")
hero = load(data.HOME["hero_img"])
save_webp(cover_crop(hero, 1600, 900), ["brand"], "hero-1600.webp", 82)
save_webp(cover_crop(hero, 1000, 563), ["brand"], "hero-1000.webp", 82)
save_webp(cover_crop(hero, 640, 480),  ["brand"], "hero-640.webp", 80)
fac = load(data.ABOUT["facility_img"])
save_webp(fit_within(fac, 760, 1040), ["brand"], "facility.webp", 82)

# ---- Branded OG image (1200x630) -----------------------------------------
def find_font(bold=True, size=52):
    cands = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/local/lib/python3.11/dist-packages/PIL/fonts/DejaVuSans.ttf",
    ]
    for p in cands:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    try:
        import PIL
        base = os.path.join(os.path.dirname(PIL.__file__), "fonts", "DejaVuSans.ttf")
        if os.path.exists(base):
            return ImageFont.truetype(base, size)
    except Exception:
        pass
    return None

INK = (23, 35, 47)
og = Image.new("RGB", (1200, 630), INK)
# right-side hero panel, dimmed
panel = cover_crop(hero, 620, 630)
og.paste(panel, (580, 0))
shade = Image.new("RGBA", (620, 630), (23, 35, 47, 150))
og.paste(shade, (580, 0), shade)
# gradient seam
seam = Image.new("RGBA", (220, 630), (0, 0, 0, 0))
sd = ImageDraw.Draw(seam)
for i in range(220):
    a = int(255 * (1 - i / 220))
    sd.line([(i, 0), (i, 630)], fill=(23, 35, 47, a))
og.paste(seam, (580, 0), seam)
# CMYK accent bar
draw = ImageDraw.Draw(og)
for i, c in enumerate([(38, 183, 222), (231, 49, 133), (250, 208, 11), (34, 30, 31)]):
    draw.rectangle([70 + i * 46, 150, 70 + i * 46 + 34, 166], fill=c)
# logo mark
try:
    mark = Image.open(os.path.join(ROOT, "_extracted", "logo_extract", "badge_clean.png")).convert("RGBA")
    mh = 150
    mw = round(mark.width * mh / mark.height)
    mark = mark.resize((mw, mh), Image.LANCZOS)
    og.paste(mark, (70, 210), mark)
    tx = 70 + mw + 28
except Exception:
    tx = 70
f_brand = find_font(True, 58)
f_tag = find_font(True, 30)
f_sub = find_font(False, 26)
if f_brand:
    draw.text((tx, 232), "NEARPRINT", font=f_brand, fill=(255, 255, 255))
    draw.text((tx, 300), "Your Print Partner", font=f_tag, fill=(250, 208, 11))
if f_sub:
    draw.text((70, 402), "Printing • Signage • Branding • Packaging", font=f_sub, fill=(210, 218, 224))
    draw.text((70, 440), "Corporate Gifts across the UAE", font=f_sub, fill=(210, 218, 224))
    draw.text((70, 510), "nearprint.ae", font=find_font(True, 30), fill=(38, 183, 222))
og_path = os.path.join(outdir("brand"), "nearprint-og.jpg")
og.save(og_path, "JPEG", quality=86, optimize=True)
manifest["/assets/img/brand/nearprint-og.jpg"] = [1200, 630]

print(">> Logo mark (transparent)")
mark = Image.open(os.path.join(ROOT, "_extracted", "logo_extract", "badge_clean.png")).convert("RGBA")
for w in (320, 160):
    mh = round(mark.height * w / mark.width)
    r = mark.resize((w, mh), Image.LANCZOS)
    r.save(os.path.join(outdir("brand"), "nearprint-mark-%d.png" % w), "PNG", optimize=True)
    save_webp(r, ["brand"], "nearprint-mark-%d.webp" % w, 92, has_alpha=True)

print(">> Extra editorial images")
for label, s in [("event-counter", "page08_img03.jpg"),
                 ("event-easel", "page10_img14.jpg"),
                 ("packaging-detail", "page13_img18.jpg")]:
    im = fit_within(load(s), 1000, 760)
    save_webp(im, ["extra"], label + ".webp", 80)

# ---------------------------------------------------------------------------
mpath = os.path.join(HERE, "img_manifest.json")
with open(mpath, "w") as fh:
    json.dump(manifest, fh, indent=0, sort_keys=True)
print("\nTOTAL outputs: %d  ->  manifest: %s" % (len(manifest), mpath))
