"use client"

import LinksSearchButton from "@/components/shorter/links-search"
import LinkNewButton from "@/components/shorter/link-new-button"
import { MobileSidebarToggle } from "../collections/collections-mobile-sidebar"

import { Home, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLocalSettings } from "@/lib/hooks/useLocalSettings"
import Link from "next/link"

function LinksHeader({ shortLinks, title, session }) {
    const { options } = useLocalSettings()

    return (
        <header className={cn("w-full h-[30vh] shadow-lg",
            options.enableGradient ? "bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-900 dark:to-indigo-800"
                : "bg-white/10"
        )}
        >
            <div className="w-full flex justify-between items-center pt-3 px-5">
              <nav className="flex items-center gap-1">
                <MobileSidebarToggle />
                <Link href="/">
                    <Home className="h-5 w-5" />
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link href="/links">
                    My Links
                </Link>
              </nav>
              <div className="flex gap-1.5">
                {!session.user.banned && (<LinkNewButton />)}
                 <LinksSearchButton
                      shortedLink={shortLinks}
                 />
              </div>
            </div>
            <div className="w-full h-full grid items-center px-5 md:px-10">
                <div>
                    <h1 className="font-bold text-4xl md:text-5xl">My Links</h1>
                </div>
            </div>
        </header>
    )
}

export default LinksHeader
