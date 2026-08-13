import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://scorpion-amnh.org";

  return [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/people`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/people/lorenzo-prendini`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/lab-through-the-years`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/publications`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/publications/hemiscorpius-kurdistan-iraq`, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/research`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/arachnids`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/fieldwork`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/facilities`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/collections`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
