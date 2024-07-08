"use client"
import { useEffect, useState } from "react"

import AboutHeader from "@/components/about/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PageRooter from "../page-footer"

function UrlExpiredContainer() {
    return (
        <div className="container mx-auto">
                <AboutHeader title={"Url has expired"} />
                <div className="w-full flex items-center justify-center py-16">
                    <Button variant={"outline"} asChild className="w-full max-w-md">
                        <Link href={"/"}>Return homepage</Link>
                    </Button>
                </div>
                <PageRooter />
            </div>
    )
}

function UrlReportedContainer({ url }) {
    const [seconds, setSeconds] = useState(5)
    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => {
                setSeconds(seconds - 1)
            }, 1000)
        } else {
            return window.location.replace(url)
        }
    }, [seconds])

    return (
        <div className="container mx-auto">
            <AboutHeader title={"Redirecting"} />
            <div className="w-full flex flex-col gap-2 items-center justify-center py-16">
                <p>
                    Redirecting to url: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {url}
                    </code> in {seconds} seconds.
                </p>
                <Button variant={"outline"} asChild className="w-full max-w-md">
                    <Link href={"/"}>Return homepage</Link>
                </Button>
            </div>
            <PageRooter />
        </div>
    )
}

export { UrlExpiredContainer, UrlReportedContainer }