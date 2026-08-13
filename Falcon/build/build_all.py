# -*- coding: utf-8 -*-
"""Build the complete Falcon Rotating static site into ../site/."""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))

import pages_core as core
import pages_more as more
from _common import BRANCHES, OUT


def main():
    os.makedirs(OUT, exist_ok=True)
    # Core
    core.build_home()
    core.build_about()
    core.build_services_index()
    core.build_service_construction()
    core.build_service_piling()
    core.build_service_rotating()
    core.build_service_excavation()
    core.build_equipment_rental()
    # More
    more.build_locations_index()
    for b in BRANCHES:
        more.build_location(b["slug"])
    more.build_contact()
    more.build_quote()
    more.build_blog()
    more.build_privacy()
    more.build_terms()
    more.build_404()
    more.build_sitemap()
    more.build_robots()
    print("Build complete →", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
