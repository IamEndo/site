import { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://paydeck.org/", changeFrequency: "monthly", priority: 1 },
    { url: "https://paydeck.org/#features" },
    { url: "https://paydeck.org/#how" },
    { url: "https://paydeck.org/#pricing" },
    { url: "https://paydeck.org/#faq" },
    { url: "https://paydeck.org/#contact" },
  ];
}
