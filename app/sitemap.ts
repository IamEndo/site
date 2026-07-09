import { MetadataRoute } from "next";
import { docsNavigation } from "./docs/_data/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paydeck.org";
  const lastModified = new Date();

  const docPages = docsNavigation
    .flatMap((section) => section.items)
    .map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/docs" ? 0.8 : 0.6,
    }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docPages,
  ];
}
