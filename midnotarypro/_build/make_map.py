"""Generate assets/img/world-map.svg from the world-atlas TopoJSON package.

Usage: python3 _build/make_map.py <path-to-world-atlas/package>
(`npm pack world-atlas@2` and extract it to get that folder.)

Equal Earth projection. Countries come from the 110m file; small states that
only exist at 50m and appear in our country data are drawn as dot markers.
Each shape gets data-c="<slug>" so the explorer can link it to the lists.
"""
import html
import json
import math
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from countries import HAGUE, LEGALIZATION, NON_HAGUE_MENTIONED, slug  # noqa: E402

A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796
M = math.sqrt(3) / 2
W = 1000
SCALE = W / (2 * 2.7066)  # x range of Equal Earth at unit radius is +/-2.7066


def project(lon, lat):
    lam, phi = math.radians(lon), math.radians(lat)
    th = math.asin(M * math.sin(phi))
    th2, th6 = th * th, th ** 6
    x = 2 * math.sqrt(3) * lam * math.cos(th) / (3 * (9 * A4 * th6 * th2 + 7 * A3 * th6 + 3 * A2 * th2 + A1))
    y = th * (A4 * th6 * th2 + A3 * th6 + A2 * th2 + A1)
    return x * SCALE + W / 2, -y * SCALE


def decode(topo):
    sx, sy = topo["transform"]["scale"]
    tx, ty = topo["transform"]["translate"]
    arcs = []
    for arc in topo["arcs"]:
        x = y = 0
        pts = []
        for dx, dy in arc:
            x += dx
            y += dy
            pts.append((x * sx + tx, y * sy + ty))
        arcs.append(pts)
    return arcs


def ring(arcs, idx):
    pts = []
    for i in idx:
        a = arcs[i] if i >= 0 else arcs[~i][::-1]
        pts.extend(a if not pts else a[1:])
    return pts


def polys(geom):
    if geom["type"] == "Polygon":
        return [geom["arcs"]]
    if geom["type"] == "MultiPolygon":
        return geom["arcs"]
    return []


def path_d(arcs, geom, y0):
    out = []
    for poly in polys(geom):
        for r in poly:
            pts = [project(*p) for p in ring(arcs, r)]
            simp = []
            for x, y in pts:
                q = (round(x, 1), round(y - y0, 1))
                if not simp or q != simp[-1]:
                    simp.append(q)
            if len(simp) < 3:
                continue
            # Break the ring where it jumps across the antimeridian (e.g. Fiji)
            seg, wrapped = [], False
            for k, (x, y) in enumerate(simp):
                jump = k and abs(x - simp[k - 1][0]) > W / 2
                wrapped = wrapped or bool(jump)
                seg.append(("M" if (k == 0 or jump) else "L") + f"{x:g},{y:g}")
            out.append("".join(seg) + ("" if wrapped else "Z"))
    return "".join(out)


def centroid(arcs, geom):
    best = None
    for poly in polys(geom):
        pts = ring(arcs, poly[0])
        if best is None or len(pts) > len(best):
            best = pts
    lons = [p[0] for p in best]
    if max(lons) - min(lons) > 180:  # ring crosses the antimeridian
        lons = [x + 360 if x < 0 else x for x in lons]
    lon = sum(lons) / len(lons)
    lon = lon - 360 if lon > 180 else lon
    lat = sum(p[1] for p in best) / len(best)
    return project(lon, lat)


def main(pkg):
    wanted = {slug(n) for names in HAGUE.values() for n in names}
    wanted |= {slug(row[0]) for row in LEGALIZATION}
    wanted |= {slug(n) for n, _ in NON_HAGUE_MENTIONED}

    t110 = json.load(open(os.path.join(pkg, "countries-110m.json")))
    t50 = json.load(open(os.path.join(pkg, "countries-50m.json")))
    a110, a50 = decode(t110), decode(t50)
    y0 = project(0, 83.7)[1]  # crop the far north; Antarctica is dropped
    height = round(project(0, -56)[1] - y0)

    shapes, have = [], set()
    for g in t110["objects"]["countries"]["geometries"]:
        name = g["properties"]["name"]
        if name == "Antarctica":
            continue
        s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
        have.add(s)
        d = path_d(a110, g, y0)
        if d:
            cx, cy = centroid(a110, g)
            shapes.append(f'<path data-c="{s}" data-n="{html.escape(name)}" data-cx="{cx:.0f}" data-cy="{cy - y0:.0f}" d="{d}"/>')

    dots = []
    for g in t50["objects"]["countries"]["geometries"]:
        s = re.sub(r"[^a-z0-9]+", "-", g["properties"]["name"].lower()).strip("-")
        if s in wanted and s not in have:
            x, y = centroid(a50, g)
            dots.append(f'<circle data-c="{s}" data-cx="{x:.0f}" data-cy="{y - y0:.0f}" cx="{x:.1f}" cy="{y - y0:.1f}" r="3.2"/>')
            have.add(s)

    missing = sorted(wanted - have)
    if missing:
        print("WARNING: no map shape for", missing, file=sys.stderr)

    kc = project(-94.58, 39.10)
    dc = project(-77.04, 38.91)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {height}" '
        f'data-kc="{kc[0]:.1f},{kc[1] - y0:.1f}" data-dc="{dc[0]:.1f},{dc[1] - y0:.1f}" '
        f'class="world-map__svg" aria-hidden="true" focusable="false">'
        f'<g class="world-map__land">{"".join(shapes)}</g>'
        f'<g class="world-map__dots">{"".join(dots)}</g></svg>'
    )
    out = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "world-map.svg")
    with open(out, "w") as f:
        f.write(svg)
    print(f"wrote {out}: {len(svg) // 1024} KB, {len(shapes)} shapes, {len(dots)} dots, {W}x{height}")


if __name__ == "__main__":
    main(sys.argv[1])
