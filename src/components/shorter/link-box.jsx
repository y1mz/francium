"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "@/lib/hooks/use-toast"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent,
    DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub,
    DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu"
import { Ellipsis, Trash2, PenTool, CircleMinus, LibraryBig, CirclePlay } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function LinkBox({ LinkId, title, url, shortUrl, cDate, active }) {
    const { onOpen } = useModal()
    const [copied, setCopied] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 4000)
    }, [copied])

    const urlData = {
        id: LinkId,
        name: title,
        slug: shortUrl,
        createdAt: cDate
    }

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

    const handleDisable = async () => {
        const response = await fetch("/api/short/disable", {
            method: "PATCH",
            body: JSON.stringify({
                id: LinkId,
                slug: shortUrl,
                createdAt: cDate
            })
        })
        if (!response.ok) {
            toast({
                title: "Something went wrong",
                description: "We encountered an error. Please try again",
                type: "destructive"
            })
            router.refresh()
        } else {
            toast({
                title: "URL successfully disabled"
            })
            router.refresh()
        }
    }

    const handleActivate = async () => {
        const response = await fetch("/api/short/disable", {
            method: "POST",
            body: JSON.stringify(urlData)
        })

        if (response.ok) {
            router.refresh()
            toast({
                title: "URL successfully activated!"
            })
        }

        if (!response.ok) {
            toast({
                title: "There was an error",
                description: "Server had an error while processing the request, please try again",
                variant: "destructive"
            })
        }
    }

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20  shadow-lg hover:shadow-none tansition duration-200 h-48 px-12 md:px-0"
        >
            <div className="flex flex-col px-0 py-5 md:px-5">
                    {title ? (
                        <>
                            <h2 className={cn("text-xl font-bold my-0", !active && "text-muted-foreground")}>{title.split(/[- ]+/).slice(0, 4).join(" ")}{title.split(" ").length > 5 && "..."}</h2>
                            <span className={cn("font-light text-sm truncate", !active && "text-muted-foreground")}>{url}</span>
                        </>
                    ) : (
                        <h2 className="text-xl font-bold my-0 line-clamp-3">
                            {url}
                        </h2>
                    )}
                </div>
            <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="flex justify-between items-end">
                    <DropdownMenu className="mr-auto">
                        <DropdownMenuTrigger>
                            <Tooltip>
                                <TooltipTrigger className="mr-auto" asChild>
                                    <Button variant="ghost" size="icon">
                                        <Ellipsis className="h-6 w-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    More Options
                                </TooltipContent>
                            </Tooltip>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => onOpen("renameUrl", urlData)}>
                                <PenTool className="h-4 w-4 mr-2" />
                                Rename Url
                            </DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    <LibraryBig className="h-4 w-4 mr-2" />
                                    Add to collection
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    Coming Soon!
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            {active ? (
                                <DropdownMenuItem onClick={() => handleDisable()}>
                                    <CircleMinus className="h-4 w-4 mr-2" />
                                    Disable Url
                                </DropdownMenuItem>
                            ): (
                                <DropdownMenuItem onClick={() => handleActivate()}>
                                    <CirclePlay className="h-4 w-4 mr-2" />
                                    Activate Url
                                </DropdownMenuItem>
                            )}
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
                        {copied ? <Button className="bg-green-500 hover:bg-green-300">Copied!</Button> : <Button disabled={!active} variant="ghost2" onClick={() => handleCopy()}>Copy Url</Button>}
                        <Button variant="ghost2" asChild><Link href={url} target="_blank">Open Url</Link></Button>
                    </div>
                </div>
        </div>
        </div>
    );
}

export default LinkBox