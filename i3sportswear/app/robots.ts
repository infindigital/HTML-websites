import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

/**
 * Mirrors the WordPress robots.txt. On i3sportswear.com WordPress serves its
 * own robots.txt and sitemap, so this file is NOT uploaded there; it only
 * applies to the Vercel preview. /wp-sitemap.xml works with WordPress core,
 * Yoast and Rank Math (the plugins redirect it to their own index).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: ["/", "/wp-admin/admin-ajax.php"], disallow: "/wp-admin/" },
    sitemap: `${SITE_URL}/wp-sitemap.xml`,
  };
}
