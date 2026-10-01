"""
Builds every image the homepage uses from the two supplied ZIPs:

    jersey new photos.zip          -> public/images/jerseys/
    remaining homepage photos.zip  -> clients/, uniforms/, process/, icons/

Jerseys: the studio background is removed (rembg, isnet-general-use) and each
photo is split into the front figure, the back figure and the pair. The
garments themselves are never edited. Re-run after replacing a ZIP:

    pip install "rembg[cpu]" pillow
    python3 scripts/process_assets.py
"""

import io
import os
import zipfile

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")

# Supplied file name -> stable id used by src/config/jerseys.ts
JERSEYS = {
    "Black and Gold Jersey Front and Back Views.png": "black-gold",
    "Black and Neon Green Sports Jersey Set.png": "neon-green",
    "Black and Red Wolf Sports Jersey Set.png": "red-wolf",
    "Blue Brushstroke Football Kit Mockup.png": "blue-brushstroke",
    "Blue Geometric Jersey Front and Back.png": "blue-geometric",
    "Dragon Print Athletic Jersey Front and Back.png": "dragon",
    "Front and Back Sports Uniform Showcase.png": "white-teal",
    "Sportswear Uniform Front and Back View.png": "cream-uniform",
    "Teal iTHREE Sports Jersey Showcase.png": "teal",
    "Yellow and White Basketball Jersey Showcase.png": "yellow-basketball",
    "iTHREE Blue Marbled Football Kit.png": "blue-marbled",
    "iTHREE Sportswear Jersey Showcase.png": "black-full-sleeve",
}

CLIENTS = {"2.png": "mobco", "3.png": "pace", "4.png": "kismees", "5.png": "hana", "6.png": "rk-reliablekey", "7.png": "oxford"}
POLOS = {"90.jpg": "maroon", "91.jpg": "navy", "92.jpg": "violet", "93.jpg": "taupe", "94.jpg": "slate", "95.jpg": "black", "96.jpg": "white"}
PROCESS = {
    "Untitled-design-2026-03-12T141456.736.png": "step-1",
    "Untitled-design-2026-03-12T141509.787.png": "step-2",
    "Untitled-design-2026-03-12T141523.774.png": "step-3",
    "Untitled-design-2026-03-12T141536.973.png": "step-4",
}
PILLARS = {
    "Untitled-design-2026-03-12T144635.231.png": "branded",
    "Untitled-design-2026-03-12T144648.291.png": "prices",
    "Untitled-design-2026-03-12T144658.410.png": "process",
}
ICONS = {
    "ball.png": "football",
    "cricket.png": "cricket",
    "vollyball.png": "volleyball",
    "game.png": "kabaddi",
    "basketball-ball-variant-1.png": "basketball",
    "pants.png": "track-suits",
    "uniform.png": "officials",
    "foot-ball.png": "throwball",
}


def save_webp(im, path, width=None, height=None, quality=86):
    im = im.copy()
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if height and im.height > height:
        im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)
    return im.size


def trim(im, pad=0):
    box = im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    im = im.crop(box)
    if pad:
        canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
        canvas.paste(im, (pad, pad))
        im = canvas
    return im


def members(zf):
    for info in zf.infolist():
        if not info.is_dir():
            yield os.path.basename(info.filename), zf.read(info)


def jerseys():
    from rembg import new_session, remove

    session = new_session("isnet-general-use")
    with zipfile.ZipFile(os.path.join(ROOT, "jersey new photos.zip")) as zf:
        for name, data in members(zf):
            if name not in JERSEYS:
                continue
            jid = JERSEYS[name]
            src = Image.open(io.BytesIO(data)).convert("RGB")
            cut = remove(src, session=session, alpha_matting=True,
                         alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=15)
            # The two figures are separated by an empty band near the centre.
            alpha = cut.getchannel("A")
            w, h = cut.size
            empty = [x for x in range(w // 3, 2 * w // 3)
                     if all(alpha.getpixel((x, y)) < 40 for y in range(0, h, 3))]
            split = (empty[0] + empty[-1]) // 2 if empty else w // 2
            front = trim(cut.crop((0, 0, split, h)))
            back = trim(cut.crop((split, 0, w, h)))
            pair = trim(cut, pad=8)
            d = os.path.join(OUT, "jerseys")
            for size in (520, 1000):
                save_webp(front, f"{d}/{jid}-front-{size}.webp", height=size)
                save_webp(back, f"{d}/{jid}-back-{size}.webp", height=size)
            for size in (640, 1200):
                save_webp(pair, f"{d}/{jid}-pair-{size}.webp", width=size)
            print(jid, "front", front.size, "back", back.size, "pair", pair.size)


def homepage():
    with zipfile.ZipFile(os.path.join(ROOT, "remaining homepage photos.zip")) as zf:
        for name, data in members(zf):
            im = Image.open(io.BytesIO(data))
            if name in CLIENTS:
                save_webp(trim(im.convert("RGBA"), pad=4), f"{OUT}/clients/{CLIENTS[name]}.webp", width=520, quality=90)
            elif name in POLOS:
                for size in (800, 1600):
                    save_webp(im.convert("RGB"), f"{OUT}/uniforms/polo-{POLOS[name]}-{size}.webp", width=size, quality=84)
            elif name in PROCESS:
                save_webp(trim(im.convert("RGBA"), pad=6), f"{OUT}/process/{PROCESS[name]}.webp", width=512, quality=90)
            elif name in PILLARS:
                im.convert("RGBA").save(f"{OUT}/icons/pillar-{PILLARS[name]}.png")
            elif name in ICONS:
                # Black line icons; the page tints them with a CSS mask.
                icon = trim(im.convert("RGBA"))
                icon.thumbnail((160, 160), Image.LANCZOS)
                os.makedirs(f"{OUT}/icons", exist_ok=True)
                icon.save(f"{OUT}/icons/sport-{ICONS[name]}.png", optimize=True)


if __name__ == "__main__":
    os.makedirs(os.path.join(OUT, "icons"), exist_ok=True)
    homepage()
    jerseys()
