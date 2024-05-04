import AboutHeader from "@/components/about/header"

import Markdown from "markdown-to-jsx"
import { getPageContent } from "@/lib/getPageMetadata"

function AboutPage() {
    const pageContent = getPageContent("about")

    return (
        <div className="mx-auto max-w-[768px] px-5">
            <AboutHeader title="About this project" />
            <div>
                <article className="prose dark:prose-invert md:prose-lg lg:prose-xl">
                    <Markdown>{pageContent.content}</Markdown>
                </article>
            </div>
        </div>
    )
}

export default AboutPage