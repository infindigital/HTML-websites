"""Build the static site: python3 _build/build.py

Writes <route>/index.html for every page (URLs match the live site).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))

import page_home  # noqa: E402
import pages_inner  # noqa: E402


def main():
    built = [page_home.build()] + pages_inner.build_all()
    for p in built:
        print("built", p)


if __name__ == "__main__":
    main()
