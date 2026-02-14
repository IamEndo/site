import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paydeck.org"),
  title: {
    default: "PayDeck | Open Source Cryptocurrency Point of Sale for Nexa",
    template: "%s | PayDeck",
  },
  description:
    "Accept Nexa cryptocurrency payments instantly with PayDeck. Open source, non-custodial POS terminal running on affordable ESP32 hardware. No contracts, no fees, full control of your funds.",
  keywords: [
    "Nexa",
    "Nexa payments",
    "cryptocurrency POS",
    "crypto point of sale",
    "ESP32 payment terminal",
    "non-custodial wallet",
    "open source POS",
    "accept crypto payments",
    "Nexa coin",
    "cryptocurrency checkout",
    "retail crypto payments",
    "merchant crypto solution",
    "self-custody payments",
    "decentralized payments",
  ],
  authors: [{ name: "PayDeck", url: "https://paydeck.org" }],
  creator: "PayDeck",
  publisher: "PayDeck",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://paydeck.org",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://paydeck.org",
    siteName: "PayDeck",
    title: "PayDeck | Open Source Cryptocurrency Point of Sale",
    description:
      "Accept Nexa payments instantly. Open source, non-custodial POS on affordable hardware. No contracts, no fees.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PayDeck - Open Source Nexa Point of Sale Terminal",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayDeck | Open Source Crypto POS",
    description:
      "Accept Nexa payments instantly. Non-custodial, open source, runs on affordable hardware.",
    images: ["/og.png"],
    creator: "@paydeckproject",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PayDeck",
  url: "https://paydeck.org",
  logo: "https://paydeck.org/apple-touch-icon.png",
  description: "Open source, non-custodial cryptocurrency point-of-sale for Nexa payments",
  sameAs: [
    "https://t.me/paydeckproject",
    "https://gitlab.com/IamEndo/paydeck",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    url: "https://t.me/paydeckproject",
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PayDeck",
  operatingSystem: "ESP32",
  applicationCategory: "FinanceApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: "Open source point-of-sale firmware for accepting Nexa cryptocurrency payments",
  url: "https://paydeck.org",
  downloadUrl: "https://gitlab.com/IamEndo/paydeck",
  softwareVersion: "1.0",
  author: {
    "@type": "Organization",
    name: "PayDeck",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initTheme = `(function(){
    try {
      var s = localStorage.getItem('theme');
      var d = s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', d);
    } catch(e) {}
  })();`;

  return (
    <html lang="en" suppressHydrationWarning className={`${sansFont.variable} ${monoFont.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initTheme }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-sm"
        >
          Skip to content
        </a>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="software-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}