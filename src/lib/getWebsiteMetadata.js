import * as cheerio from "cheerio"

async function getWebsiteMetadata(url) {
    const html = await fetch(url).then((res) => res.text())
    const rawHtml = cheerio.load(html)

    const webTitle = rawHtml("title").text() || rawHtml('meta[name="title"]').attr('content')
    const webdesc = rawHtml('meta[name="description"]').attr('content')
    const webOgName = rawHtml('meta[property="og:title"]').attr('content')
    const webOgDesc = rawHtml('meta[property="og:description"]').attr('content')
    const webOgImg = rawHtml('meta[property="og:image"]').attr('content')

    const webFaviconLink = rawHtml('head link[rel="icon"]').first().attr("href")
    let faviconUrl;
    if (webFaviconLink) {
        faviconUrl = new URL(webFaviconLink, url).toString()
    }

    return {
        title: webTitle,
        description: webdesc,
        icon: faviconUrl,
        ogTitle: webOgName,
        ogDescription: webOgDesc,
        ogImage: webOgImg
    }
}

export { getWebsiteMetadata }