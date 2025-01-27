import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://library-management-three-rouge.vercel.app",
      lastModified: "2025-27-01",
      changeFrequency: "yearly",
      priority: 1,
      images: ["/sitemap.png"],
    },
  ];
}
