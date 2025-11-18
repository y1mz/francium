import { readConfig } from "@/lib/readConfig";

function robots() {
  const conf = readConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dashboard/",
    },
    sitemap: `https://${conf.SiteUrl}/sitemap.xml`,
  };
}

export default robots;
