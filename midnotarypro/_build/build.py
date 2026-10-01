"""Build the static site: python3 _build/build.py

Writes <route>/index.html for every page (URLs match the live site), plus
sitemap.xml, robots.txt and the internal SEO documents in docs/.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

import page_home  # noqa: E402
import pages_inner  # noqa: E402
import pages_countries  # noqa: E402
import pages_docs  # noqa: E402
import pages_intl  # noqa: E402
import pages_legal  # noqa: E402
import pages_local  # noqa: E402
import pages_new  # noqa: E402
import seo_audit  # noqa: E402
from lib import write_sitemap  # noqa: E402


def main():
    built = ([page_home.build()] + pages_inner.build_all() + pages_new.build_all()
             + pages_local.build_all() + pages_docs.build_all() + pages_countries.build_all() + pages_intl.build_all() + pages_legal.build_all())
    for p in built:
        print("built", p)
    print("sitemap urls:", write_sitemap())
    n, issues = seo_audit.audit()
    for path, iss in issues.items():
        for i in iss:
            print(f"SEO  {path}: {i}")
    print(f"SEO issues: {n}")
    return 1 if n else 0


if __name__ == "__main__":
    sys.exit(main())
