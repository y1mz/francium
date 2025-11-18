import { readConfig } from "@/lib/readConfig";

export default function sitemap() {
  const conf = readConfig();

  return [
    {
      url: `https://${conf.SiteUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `https://${conf.SiteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `https://${conf.SiteUrl}/check`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
