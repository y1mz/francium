import conf from "/config/siteconfig.json"

function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/dashboard/',
      },
      sitemap: `https://${conf.SiteUrl}/sitemap.xml`,
    }
  }

export default robots