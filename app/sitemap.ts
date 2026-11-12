import { MetadataRoute } from "next";
import { docsNavigation } from "./docs/_data/navigation";

// No lastModified: the pages carry no reliable per-page modification date, and
// a build-time stamp on every URL is worse than none (crawlers learn to
// ignore it).
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paydeck.org";

  const docPages = docsNavigation
    .flatMap((section) => section.items)
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      changeFrequency: "monthly" as const,
      priority: item.href === "/docs" ? 0.8 : 0.6,
    }));

  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docPages,
  ];
}
