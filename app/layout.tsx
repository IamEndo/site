// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://paydeck.org"),
  title: {
    default: "PayDeck — Cryptocurrency Point-of-Sale (Nexa)",
    template: "%s | PayDeck",
  },
  description:
    "Open-source, non-custodial point-of-sale for instant Nexa payments. No contracts. No added fees. Built for retail.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://paydeck.org/",
    siteName: "PayDeck",
    title: "PayDeck — Cryptocurrency Point-of-Sale (Nexa)",
    description:
      "Open-source, non-custodial PoS for instant Nexa payments at checkout.",
    images: [
      {
        url: "/og.png", // export a 1200×630 image
        width: 1200,
        height: 630,
        alt: "PayDeck — Nexa point-of-sale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PayDeck — Cryptocurrency Point-of-Sale (Nexa)",
    description:
      "Open-source, non-custodial PoS for instant Nexa payments at checkout.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initTheme = `(function(){
    try {
      var s = localStorage.getItem('theme');
      var d = s ? s === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var c = document.documentElement.classList;
      d ? c.add('dark') : c.remove('dark');
    } catch(e) {}
  })();`;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initTheme }} />
      </head>
      <body className="bg-white text-slate-900 dark:bg-neutral-950 dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
}
