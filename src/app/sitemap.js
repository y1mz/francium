import conf from "/config/siteconfig.json"

export default function sitemap() {
    return [
      {
        url: `https://${conf.SiteUrl}`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: `https://${conf.SiteUrl}/about`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `https://${conf.SiteUrl}/check`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    ]
  }