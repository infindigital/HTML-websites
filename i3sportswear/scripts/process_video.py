"""Build the web video encodes, stills and social image from the master film.

The supplied film carries a small generator watermark (a grey four-point star)
in its lower-right corner; the `delogo` filter fills that 64px box from its
surroundings. Set WATERMARK = None for a clean export.

Usage: python3 scripts/process_video.py "<master video>.mp4"
Requires: pip install pillow imageio-ffmpeg
"""
import subprocess
import sys
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

SRC = Path(sys.argv[1])
ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
FF = imageio_ffmpeg.get_ffmpeg_exe()
WATERMARK = "delogo=x=1128:y=568:w=64:h=64"  # position in the 1280x720 master
STILLS = {"hero-poster": 0, "identity": 3.5, "wall": 6.8}


def ff(*args):
    subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def vf(extra=""):
    chain = ",".join(f for f in (WATERMARK, extra) if f)
    return ["-vf", chain] if chain else []


(PUB / "video").mkdir(parents=True, exist_ok=True)
h264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]
ff("-i", SRC, *vf(), *h264, "-crf", "25", PUB / "video/hero-720.mp4")
ff("-i", SRC, *vf("scale=854:-2"), *h264, "-crf", "26", PUB / "video/hero-480.mp4")
ff("-i", SRC, *vf(), "-an", "-c:v", "libvpx-vp9", "-crf", "38", "-b:v", "0", "-row-mt", "1",
   "-deadline", "good", "-cpu-used", "2", PUB / "video/hero-720.webm")

stills = PUB / "images/stills"
stills.mkdir(parents=True, exist_ok=True)
for name, t in STILLS.items():
    frame = stills / f"_{name}.png"
    ff("-ss", str(t), "-i", SRC, *vf(), "-frames:v", "1", frame)
    im = Image.open(frame).convert("RGB")
    for w in (640, 1280):
        out = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if w < im.width else im
        out.save(stills / f"{name}-{w}.webp", quality=84, method=6)
    frame.unlink()

# 1200x630 social image: jersey wall on the right, logo on a dark field left.
wall = Image.open(stills / "wall-1280.webp").convert("RGB").resize((1200, 675), Image.LANCZOS).crop((0, 22, 1200, 652))
mask = Image.new("L", (1200, 1))
for x in range(1200):
    mask.putpixel((x, 0), int(max(0, min(255, 255 * (1 - (x - 380) / 520)))))
wall.paste(Image.new("RGB", (1200, 630), (5, 5, 5)), (0, 0), mask.resize((1200, 630)))
logo = Image.open(ROOT / "website logo.png").convert("RGBA")
logo = logo.crop(logo.getchannel("A").getbbox())
logo.thumbnail((360, 300), Image.LANCZOS)
og = wall.convert("RGBA")
og.alpha_composite(logo, (90, (630 - logo.height) // 2))
og.convert("RGB").save(PUB / "og.jpg", quality=86)
print("done")
