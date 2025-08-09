"use client"

import LinksSearchButton from "@/components/shorter/links-search"
import LinkNewButton from "@/components/shorter/link-new-button"
import { MobileSidebarToggle } from "../collections/collections-mobile-sidebar"

import { cn } from "@/lib/utils"
import { useLocalSettings } from "@/lib/hooks/useLocalSettings"

function LinksHeader({ shortLinks, title, session }) {
    const { options } = useLocalSettings()

    return (
        <header className={cn("w-full min-h-[40vh] flex flex-col justify-between shadow-lg",
            options.enableGradient ? "bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-900 dark:to-indigo-800"
                : "bg-white/10"
        )}
        >
            <div>
              <nav className="flex gap-1.5 py-3 px-5">
                <MobileSidebarToggle />
              </nav>
              <div className="pt-24">
                  <h1 className="justify-center items-center text-center font-bold text-4xl">{title}</h1>
              </div>
            </div>
            <div className="mb-5 px-5 md:px-10 flex flex-wrap justify-between">
                <div>

                </div>
                <div className="flex gap-1">
                    {!session.user.banned && (<LinkNewButton />)}
                    <LinksSearchButton
                      shortedLink={shortLinks}
                    />
                </div>
            </div>
        </header>
    )
}

export default LinksHeader
