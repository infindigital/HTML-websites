import type { NextConfig } from "next";

// Static export: the site builds to plain HTML/CSS/JS in `out/` and can be
// hosted on any static host. Images are pre-optimised WebP files built by
// scripts/process_assets.py and served as-is with explicit srcset/sizes.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
