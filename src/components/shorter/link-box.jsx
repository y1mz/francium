"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent,
    DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Ellipsis, Trash2, PenTool, CircleMinus } from "lucide-react"
import Link from "next/link"

function LinkBox({ LinkId, title, url, shortUrl, cDate }) {
    const { onOpen } = useModal()
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 4000)
    }, [copied])

    const handleCopy = async () => {
        const currentUrl = window.location.origin
        await navigator.clipboard.writeText(`${currentUrl}/${shortUrl}`)
        setCopied(true)
    }

    const handleDelete = () => {
        const linkData = {
            id: LinkId,
            slug: shortUrl,
            link: url,
            name: title,
            createdAt: cDate
        }
        onOpen("linkDel", linkData)
    }

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20  shadow-lg hover:shadow-none tansition duration-200 h-48 px-12 md:px-0"
        >
            <div className="flex flex-col px-0 py-5 md:px-5">
                    {title ? (
                        <>
                            <h2 className="text-xl font-bold my-0">{title.split(" ").slice(0, 5).join(" ")}{title.split(" ").length > 5 && "..."}</h2>
                            <span className="font-light text-sm truncate">{url}</span>
                        </>
                    ) : (
                        <h2 className="text-xl font-bold my-0 line-clamp-3">
                            {url}
                        </h2>
                    )}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="flex justify-between items-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                    <Ellipsis className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <PenTool className="h-4 w-4 mr-2" />
                                    Rename Url
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <CircleMinus className="h-4 w-4 mr-2" />
                                    Disable Url
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-rose-600 dark:text-rose-800"
                                    onClick={() => handleDelete()}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Url
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex">
                            {copied ? <Button className="bg-green-500 hover:bg-green-300">Copied!</Button> : <Button variant="ghost2" onClick={() => handleCopy()}>Copy Url</Button>}
                            <Button variant="ghost2" asChild><Link href={url} target="_blank">Open Url</Link></Button>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default LinkBox