"use client"

import AboutHeader from "@/components/about/header"
import LinkCheckerBox from "@/components/shorter/link-checker"

function CheckUrlPage() {
    return (
        <div className="mx-auto max-w-[768px] px-5 py-10">
            <AboutHeader
                title="Get shortURl details"
            />
            <div className="flex flex-col py-10">
                <LinkCheckerBox />
            </div>
        </div>
    )
}

export default CheckUrlPage