import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@fontsource-variable/inter";
import "./globals.css";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "custom sportswear",
    "custom sports jerseys",
    "custom team jerseys",
    "custom football jerseys",
    "custom cricket jerseys",
    "custom basketball jerseys",
    "custom volleyball jerseys",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "iTHREE Sportswear custom team jerseys" }],
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/icon-512.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const sameAs = site.social.map((s) => s.href).filter(Boolean);
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/images/logo-480.png`,
      description: site.description,
      ...(sameAs.length ? { sameAs } : {}),
      ...(site.contact.email ? { email: site.contact.email } : {}),
      ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

/**
 * Runs before first paint: marks JS as available, applies the visitor's theme
 * choice for this session (dark unless they switched; ?theme=light forces
 * light) and preloads the matching hero still.
 */
const themeBoot = `(function(){var d=document.documentElement;d.classList.add('js');var t;try{t=new URLSearchParams(location.search).get('theme')||sessionStorage.getItem('ithree-theme')}catch(e){}if(t==='light')d.dataset.theme='light';var l=document.createElement('link');l.rel='preload';l.as='image';l.fetchPriority='high';l.href='/images/stills/hero-world-'+(t==='light'?'light-':'')+(matchMedia('(max-width: 1023px)').matches?'mobile':'desktop')+'.webp';document.head.appendChild(l)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Cursor />
        <Nav />
        {children}
      </body>
    </html>
  );
}
