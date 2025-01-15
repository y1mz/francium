import AboutHeader from "@/components/about/header"
import LinkCheckerBox from "@/components/shorter/checker/link-checker"

import conf from "/config/siteconfig.json"

export const metadata = {
    title: `Link Checkcer | ${conf.SiteName}`,
    description: `Check and verify urls comes from ${conf.SiteUrl}`,
}

function CheckUrlPage() {
    return (
        <div>
            <AboutHeader
                title="Check short-urls"
            />
            <div className="flex flex-col mx-auto max-w-[768px] px-5 py-10">
                <LinkCheckerBox />
            </div>
        </div>
    )
}

export default CheckUrlPage