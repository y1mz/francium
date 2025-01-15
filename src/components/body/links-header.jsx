"use client"

import LinksSearchButton from "@/components/shorter/links-search"
import LinkNewButton from "@/components/shorter/link-new-button"

function LinksHeader({ shortLinks, title }) {

    return (
        <div className="
            w-screen min-h-[40vh]
            bg-gradient-to-br from-purple-300 to-indigo-300
            dark:from-purple-900 dark:to-indigo-800 rounded-b-2xl shadow-lg
            flex flex-col justify-between"
        >
            <div className="pt-24 md:pt-32">
                <h1 className="justify-center items-center text-center font-bold text-4xl">{title}</h1>
            </div>
            <div className="mb-5 px-5 md:px-10 flex flex-wrap sm:justify-between">
                <div>
                    <p className="text-2xl font-bold py-1">Links you've shorted</p>
                </div>
                <div className="flex gap-1">
                    <LinkNewButton />
                    <LinksSearchButton shortedLink={shortLinks}/>
                </div>
            </div>
        </div>
    )
}

export default LinksHeader