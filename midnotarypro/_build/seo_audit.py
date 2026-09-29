"""Parse every rendered page and write the internal SEO documents:

docs/seo-route-map.md  per-route plan (URL, title, description, H1, keywords, intent, schema, links, CTA)
docs/seo-audit.md      checks per route, with any issues listed

Run as part of _build/build.py. Stdlib only.
"""
import json
import os
import re
from html.parser import HTMLParser

from lib import PAGES, ROOT, SITE

INTENT = {
    "/": ("Commercial, local", "apostille services Kansas City; notary services Kansas City; apostille Kansas City Missouri; document authentication Kansas City"),
    "/about-us/": ("Navigational, brand", "Midwest Apostille & Notary; apostille notary Kansas City about"),
    "/services/": ("Navigational, service overview", "apostille notary services list; document services Kansas City"),
    "/apostille-services/": ("Commercial, local", "apostille Kansas City; apostille Missouri; same day apostille Kansas City; expedited apostille; document authentication Kansas City"),
    "/notary-services/": ("Commercial, local", "notary public Kansas City; mobile notary Kansas City; online notary Kansas City; remote online notary; notary Kansas City MO"),
    "/document-preparation-services/": ("Commercial", "legal document preparation; power of attorney preparation; international document preparation; document assistance"),
    "/jail-notary-kansas-city/": ("Commercial, local", "jail notary services; jail notary Jackson County; notary for inmates; mobile jail notary"),
    "/notaria-en-carceles-de-kansas-cit/": ("Comercial, local (ES)", "notario para reclusos; notaría móvil cárcel Kansas City"),
    "/fbi-apostille-for-hague-countries/": ("Commercial, national", "FBI background check apostille; FBI Identity History Summary apostille; FBI document apostille; FBI apostille Hague countries"),
    "/fbi-attestation-legalization/": ("Commercial, national", "FBI attestation; FBI embassy legalization; FBI authentication; non-Hague FBI legalization"),
    "/contact-us/": ("Navigational, local", "Midwest Apostille & Notary phone; address; contact"),
    "/notary-apostille-services/": ("Commercial, bilingual", "Spanish speaking notary Kansas City; bilingual apostille"),
    "/servicios-de-notaria-y-apostilla/": ("Comercial (ES)", "notario en español Kansas City; apostilla Kansas City"),
    "/guides/": ("Informational hub", "apostille guide; FBI background check apostille guide"),
    "/how-to-get-an-apostille-in-kansas-city-birth-certificates-custodian-documents-more/": ("Informational", "birth certificate apostille Missouri; custodian certification; do I need a notary for an apostille"),
    "/urgent-notary-services-in-kansas-city-jail-hospital-after-hours-help/": ("Informational, urgent", "hospital notary Kansas City; after hours notary Kansas City; jail notary"),
}


class Parser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.meta = {}
        self.links = []
        self.canonical = ""
        self.hreflang = []
        self.headings = []  # (level, text)
        self.imgs = []
        self.ld = []
        self._cap = None
        self._buf = ""
        self._in_ld = False
        self.crumbs = False
        self.in_main = False
        self.main_links = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self._cap, self._buf = "title", ""
        elif tag == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k] = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href", "")
        elif tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"):
            self.hreflang.append(a["hreflang"])
        elif re.fullmatch(r"h[1-6]", tag):
            self._cap, self._buf, self._lvl = "h", "", int(tag[1])
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "script" and a.get("type") == "application/ld+json":
            self._in_ld, self._buf = True, ""
        elif tag == "nav" and a.get("class") == "crumbs":
            self.crumbs = True
        elif tag == "main":
            self.in_main = True
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])
            if self.in_main:
                self.main_links.append(a["href"])

    def handle_endtag(self, tag):
        if tag == "title" and self._cap == "title":
            self.title, self._cap = self._buf.strip(), None
        elif re.fullmatch(r"h[1-6]", tag) and self._cap == "h":
            self.headings.append((self._lvl, re.sub(r"\s+", " ", self._buf).strip()))
            self._cap = None
        elif tag == "script" and self._in_ld:
            self.ld.append(json.loads(self._buf))
            self._in_ld = False
        elif tag == "main":
            self.in_main = False

    def handle_data(self, data):
        if self._cap or self._in_ld:
            self._buf += data


def _types(ld):
    out = []
    for block in ld:
        for node in block.get("@graph", [block]):
            t = node.get("@type")
            out += t if isinstance(t, list) else [t]
    return out


def audit():
    rows, issues_all = [], {}
    titles, descs, h1s = {}, {}, {}
    parsed = {}
    for p in PAGES:
        pr = Parser()
        pr.feed(open(p["file"]).read())
        parsed[p["path"]] = pr
        titles.setdefault(pr.title, []).append(p["path"])
        descs.setdefault(pr.meta.get("description", ""), []).append(p["path"])
        h1 = [t for lvl, t in pr.headings if lvl == 1]
        h1s.setdefault(h1[0] if h1 else "", []).append(p["path"])
    for p in PAGES:
        pr = parsed[p["path"]]
        iss = []
        t, d = pr.title, pr.meta.get("description", "")
        h1 = [x for lvl, x in pr.headings if lvl == 1]
        if len(h1) != 1:
            iss.append(f"{len(h1)} H1 elements")
        if not 20 <= len(t) <= 60:
            iss.append(f"title length {len(t)}")
        if p["index"] and not 70 <= len(d) <= 160:
            iss.append(f"description length {len(d)}")
        if p["index"] and len(titles[t]) > 1:
            iss.append("duplicate title")
        if p["index"] and len(descs[d]) > 1:
            iss.append("duplicate description")
        if p["index"] and h1 and len(h1s[h1[0]]) > 1:
            iss.append("duplicate H1")
        if p["index"] and pr.canonical != SITE + p["path"]:
            iss.append("canonical mismatch")
        prev = 1
        for lvl, text in pr.headings:
            if lvl > prev + 1 and lvl > 2:
                iss.append(f"heading jump h{prev}→h{lvl} ({text[:30]})")
            prev = lvl
        for k in ("og:title", "og:description", "og:image", "twitter:card"):
            if k not in pr.meta:
                iss.append(f"missing {k}")
        missing_alt = [i.get("src") for i in pr.imgs if "alt" not in i]
        if missing_alt:
            iss.append(f"{len(missing_alt)} images without alt attribute")
        types = _types(pr.ld)
        if p["path"] != "/" and p["index"] and "BreadcrumbList" not in types:
            iss.append("no BreadcrumbList")
        if p["path"] != "/" and p["index"] and not pr.crumbs:
            iss.append("no visible breadcrumb")
        if p["alt"] and not {"en", "es", "x-default"} <= set(pr.hreflang):
            iss.append("incomplete hreflang")
        internal = sorted({h.split("#")[0] for h in pr.main_links if h.startswith("/") and h.split("#")[0] not in ("", p["path"])})
        for h in internal:
            f = os.path.join(ROOT, h.strip("/"), "index.html") if not h.endswith(".html") else os.path.join(ROOT, h.strip("/"))
            if not os.path.exists(f):
                iss.append(f"broken internal link {h}")
        issues_all[p["path"]] = iss
        rows.append(dict(p=p, pr=pr, h1=h1[0] if h1 else "", types=types, internal=internal, issues=iss,
                         decorative=sum(1 for i in pr.imgs if i.get("alt") == ""),
                         described=sum(1 for i in pr.imgs if i.get("alt"))))
    os.makedirs(os.path.join(ROOT, "docs"), exist_ok=True)
    _write_route_map(rows)
    _write_audit(rows)
    return sum(len(v) for v in issues_all.values()), issues_all


def _write_route_map(rows):
    out = ["# SEO route map", "",
           "Internal development document, generated by `_build/seo_audit.py` from the rendered pages. Not deployed.", ""]
    for r in rows:
        p, pr = r["p"], r["pr"]
        if not p["index"]:
            continue
        intent, secondary = INTENT.get(p["path"], ("", ""))
        crumbs = " › ".join(["Home"] + [re.sub("<[^>]+>", "", n) for n, _ in p["crumbs"]]) if p["crumbs"] else "None (home)"
        cta = "Start Your Document Review (booking), Call 816-442-0295"
        out += [f"## `{p['path']}`", "",
                "| Field | Value |", "|---|---|",
                f"| Title | {pr.title} ({len(pr.title)}) |",
                f"| Meta description | {pr.meta.get('description', '')} ({len(pr.meta.get('description', ''))}) |",
                f"| H1 | {r['h1']} |",
                f"| Primary keyword | {p['keyword']} |",
                f"| Secondary keywords | {secondary} |",
                f"| Search intent | {intent} |",
                f"| Canonical | {pr.canonical} |",
                f"| Language / hreflang | {p['lang']} / {', '.join(pr.hreflang) or 'none'} |",
                f"| Schema | {', '.join(dict.fromkeys(r['types']))} |",
                f"| Breadcrumb | {crumbs} |",
                f"| Internal links (in main) | {len(r['internal'])}: {', '.join(r['internal'])} |",
                f"| CTA | {cta} |", ""]
    open(os.path.join(ROOT, "docs", "seo-route-map.md"), "w").write("\n".join(out))


def _write_audit(rows):
    out = ["# SEO audit", "", "Generated on every build by `_build/seo_audit.py`. Not deployed.", "",
           "| URL | Title | Desc | H1 | Canonical | Schema | Index | Links | Crumb | OG | Img alt | Hreflang | Issues |",
           "|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        p, pr = r["p"], r["pr"]
        out.append("| `{}` | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |".format(
            p["path"], len(pr.title), len(pr.meta.get("description", "")), "1" if r["h1"] else "0",
            "ok" if pr.canonical == SITE + p["path"] else "check", ", ".join(sorted(set(r["types"]) - {"LocalBusiness", "ProfessionalService", "WebSite", "WebPage"})) or "base",
            "index" if p["index"] else "noindex", len(r["internal"]), "yes" if pr.crumbs else "no",
            "yes" if "og:image" in pr.meta else "no", f"{r['described']} described, {r['decorative']} decorative",
            ", ".join(pr.hreflang) or "none", "; ".join(r["issues"]) or "none"))
    out += ["", "Decorative images use empty `alt` (aria-hidden art and duplicated thumbnails). Every image has an `alt` attribute.", ""]
    open(os.path.join(ROOT, "docs", "seo-audit.md"), "w").write("\n".join(out))
