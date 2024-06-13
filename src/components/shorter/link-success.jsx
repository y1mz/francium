"use client"

import { Button } from "@/components/ui/button"
// import { AspectRatio } from "@/components/ui/aspect-ratio"
import Link from "next/link"

import {useEffect, useState} from "react"
import conf from "/config/siteconfig.json"

function LinkSuccess({ title, url, short, img, desc }) {
    const [clicked, setClicked] = useState(false)
    const webUrl = process.env.NODE_ENV === 'production'
        ? `${conf.SiteUrl}`
        : 'http://localhost:3000'

    useEffect(() => {
        setTimeout(() => setClicked(false), 3500)
    }, [clicked]);

    const handleClick = () => {
        navigator.clipboard.writeText(`${webUrl}${short}`)
        setClicked(true)
    }
    return (
        <div className="justify-center items-center rounded-md bg-background border border-input">
            <div className="justify-center p-4">
                <h2 className="text-xl font-bold">Your link is ready!</h2>
                <div className="gap-5">
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-lg">{title}</p>
                        <p className="font-light text-sm">{desc}</p>
                        <span className="font-extralight text-xs">{url}</span>
                        <div className="flex flex-wrap gap-4">
                            {
                                clicked ? (
                                    <Button
                                        variant="outline"
                                        className={"flex-grow bg-green-400/80 hover:bg-green-400 hover:text-black text-black"}
                                        onClick={() => handleClick()}
                                    >
                                        Copied!
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outline"
                                        className={"flex-grow"}
                                        onClick={() => handleClick()}
                                    >
                                        Copy Link
                                    </Button>
                                )
                            }
                            <Button
                                variant="outline"
                                className={"flex-grow"} asChild
                            >
                                <Link href={short}>Visit Link</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkSuccess