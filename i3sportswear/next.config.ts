import type { NextConfig } from "next";

// Static export: the site builds to plain HTML/CSS/JS in `out/` and can be
// hosted on any static host. Images are pre-optimised by
// scripts/process_images.py and served through lib/image-loader.ts.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [480, 960, 1440, 1920],
    imageSizes: [240],
  },
};

export default nextConfig;
