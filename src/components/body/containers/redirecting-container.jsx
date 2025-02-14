"use client"

import { useEffect, useState } from "react"

import AboutHeader from "@/components/about/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PageRooter from "../page-footer"

function UrlReportedContainer({ url }) {
    const [seconds, setSeconds] = useState(5)
    useEffect(() => {
        setTimeout(() => {
            window.location.replace(url)
        }, 5000)
    }, [])

    return (
        <div className="w-full">
            <AboutHeader title={"Redirecting"} />
            <div className="w-full flex flex-col gap-2 items-center justify-center py-16">
                <p>
                    Redirecting to url: <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {url}
                    </code> in 5 seconds.
                </p>
                <Button variant={"outline"} asChild className="w-full max-w-md">
                    <Link href={"/"}>Return homepage</Link>
                </Button>
            </div>
            <PageRooter />
        </div>
    )
}

export default UrlReportedContainer