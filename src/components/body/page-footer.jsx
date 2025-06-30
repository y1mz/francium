"use server"

import { Github, Info, SquareCheckBig } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import Link from "next/link"

import fs from "fs"
import path from "path"

function PageRooter() {
    const jsonPlace = path.resolve("package.json")
    const jsonContent = JSON.parse(fs.readFileSync(jsonPlace, "utf8"))

    return (
        <footer className="w-full py-5">
            <div className="mx-auto text-center">
                <div className="flex gap-3 justify-center items-center">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/about"><Info className="h-6 w-6"/> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            About
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="/check"><SquareCheckBig className="h-6 w-6"/> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Check Urls
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href="https://github.com/B4tuhanY1lmaz/francium"><Github className="h-6 w-6"/> </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            Source Code
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger>
                            <p className="font-bold text-sm text-black/60 dark:text-white/40 hover:underline">{jsonContent.version}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            #{jsonContent.codename} - {jsonContent.version}
                        </TooltipContent>
                    </Tooltip>
                </div>
                <p>Francium by <Link href="https://www.yyilmaz.com.tr" className="hover:underline font-bold">Batuhan Y. Yılmaz</Link></p>
            </div>
        </footer>
    )
}

export default PageRooter