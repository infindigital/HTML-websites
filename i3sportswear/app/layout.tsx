import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/home/Header";
import Pointer from "@/components/home/Pointer";
import SmoothScroll from "@/components/SmoothScroll";
import { BRAND, EMAIL, INSTAGRAM, OPENING_HOURS, PHONE, SEO, SITE_URL } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SEO.title,
  description: SEO.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: BRAND.name,
    title: SEO.title,
    description: SEO.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "iTHREE Sports Wear custom team jerseys" }],
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: SEO.title, description: SEO.description, images: ["/og.jpg"] },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-512.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f5f5f2", colorScheme: "light" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      alternateName: [BRAND.legalName, "i3 Sports Wear"],
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/logo-480.png`,
      image: `${SITE_URL}/og.jpg`,
      description: SEO.description,
      telephone: PHONE.display,
      ...(EMAIL ? { email: EMAIL } : {}),
      address: { "@type": "PostalAddress", streetAddress: "A 1-290(4), Tharabari Amtoor, Golthamajal", addressLocality: "Bantwal", addressCountry: "IN" },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: OPENING_HOURS.schema.days, opens: OPENING_HOURS.schema.opens, closes: OPENING_HOURS.schema.closes },
      ],
      sameAs: [INSTAGRAM.href],
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: BRAND.name, publisher: { "@id": `${SITE_URL}/#organization` } },
  ],
};

/** Marks JS as available before first paint, so scroll reveals can start hidden without hiding content from no-JS visitors. */
const boot = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <link rel="preload" as="image" href="/images/jerseys/black-gold-front-1000.webp" imageSrcSet="/images/jerseys/black-gold-front-520.webp 255w, /images/jerseys/black-gold-front-1000.webp 490w" imageSizes="(min-width: 1024px) 30vw, 55vw" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Pointer />
        <Header />
        {children}
      </body>
    </html>
  );
}
