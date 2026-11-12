import type { Metadata } from "next";
import { SITE } from "./constants";

/**
 * Metadata for a docs page: adds a self-referencing canonical URL and
 * Open Graph / Twitter tags built from the page's own title and description,
 * so a shared docs link previews as that page rather than as the home page.
 */
export function docsMetadata(
  path: string,
  meta: { title: string; description: string }
): Metadata {
  const fullTitle = `${meta.title} | ${SITE.name} Docs`;
  return {
    ...meta,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: SITE.name,
      url: path,
      title: fullTitle,
      description: meta.description,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "PayDeck - Open Source Nexa Point of Sale Terminal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: meta.description,
      images: ["/og.jpg"],
    },
  };
}
