import AboutHeader from "@/components/about/header"

import Markdown from "markdown-to-jsx"
import { getPageContent } from "@/lib/getPageMetadata"
import conf from "/config/siteconfig.json"

export const metadata = {
    title: `About | ${conf.SiteName}`
}

function AboutPage() {
    const pageContent = getPageContent("about")

    return (
        <div>
            <AboutHeader title="About" />
            <div className="mx-auto max-w-[768px] px-5 pb-10">
                <article className="prose dark:prose-invert md:prose-lg lg:prose-xl">
                    <Markdown>{pageContent.content}</Markdown>
                </article>
            </div>
        </div>
    )
}

export default AboutPage