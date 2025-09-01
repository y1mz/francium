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
import { Ellipsis, Trash2, PenTool, CircleMinus, LibraryBig, CirclePlay, Globe, Clipboard, ClipboardCheck } from "lucide-react"
import Link from "next/link"

function CollectionLinkBox({ LinkId, title, url, shortUrl, cDate, active, userCol, currentCol }) {
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
        const response = await fetch("/api/links/short/disable", {
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
        const response = await fetch("/api/links/short/disable", {
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

    const handleMove = async () => {
        // Function to move link from one collection to another
    }

    const otherCollections = userCol.filter((collection) => collection.id !== currentCol.id)
    const latestCollections = otherCollections.slice(0, 3)

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20 shadow-lg hover:shadow-none transition-all duration-200 h-48 max-w-[350px] py-5"
        >
            <div className="flex flex-col px-0 md:px-5">
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
            <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between items-end">
                <DropdownMenu className="mr-auto">
                        <DropdownMenuTrigger>
                            <Button variant="ghost" size="icon" className="group relative">
                                <Ellipsis className="h-6 w-6" />
                                <span
                                    className={cn(
                                        "absolute -top-10 left-1/2 -translate-x-1/2",
                                        "px-3 py-2 rounded text-xs font-normal",
                                        "bg-popover text-popover-foreground",
                                        "opacity-0 group-hover:opacity-100",
                                        "transition-opacity whitespace-nowrap pointer-events-none"
                                    )}
                                >
                                    More options
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => onOpen("renameUrl", urlData)}>
                                <PenTool className="h-4 w-4 mr-2" />
                                Rename Url
                            </DropdownMenuItem>
                            {userCol.length > 0 && (
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <LibraryBig className="h-4 w-4 mr-2" />
                                        Move to collection
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        {latestCollections.map((collection, index) => (
                                            <DropdownMenuItem 
                                                key={index}
                                                onClick={() => handleAddCollection(LinkId, collection.id, collection.name)}
                                            >
                                                {collection.name}
                                            </DropdownMenuItem>
                                        ))}
                                        {userCol.length > 3 && (
                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Ellipsis className="h-4 w-4 mr-2" />
                                                    <p>More</p>
                                                </DropdownMenuItem>
                                            </>
                                        )}
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                            )}
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
                        {copied ? (
                                <Button className="bg-green-500" variant="ghost" size="icon">
                                    <ClipboardCheck className="h-6 w-6" />
                                </Button>
                            ) : (
                                <Button disabled={!active} variant="ghost" size="icon" onClick={() => handleCopy()} className="relative group">
                                    <Clipboard className="h-6 w-6" />
                                    <span
                                    className={cn(
                                        "absolute -top-10 left-1/2 -translate-x-1/2",
                                        "px-3 py-2 rounded text-xs font-normal",
                                        "bg-popover text-popover-foreground",
                                        "opacity-0 group-hover:opacity-100",
                                        "transition-opacity whitespace-nowrap pointer-events-none"
                                    )}
                                    >
                                        Copy Url
                                    </span>
                                </Button>
                            )}
                        <Button variant="ghost" size="icon" asChild className="group relative">
                            <Link href={url} target="_blank">
                                <Globe className="h-6 w-6" />
                                <span
                                className={cn(
                                    "absolute -top-10 left-1/2 -translate-x-1/2",
                                    "px-3 py-2 rounded text-xs font-normal",
                                    "bg-popover text-popover-foreground",
                                    "opacity-0 group-hover:opacity-100",
                                    "transition-opacity whitespace-nowrap pointer-events-none"
                                )}
                            >
                                Open Url
                            </span>
                            </Link>
                        </Button>
                    </div>
            </div>
        </div>
    )
}

export default CollectionLinkBox