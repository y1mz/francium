"use client"

import {
    Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
    CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Globe, Copy } from "lucide-react"

import Link from "next/link"
import { useModal } from "./hooks/modal-hook"

function SearchLinksModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "searchLinks"

    if (isModalOpen) {
        const { links } = data

        const handleCopy = async (shortUrl) => {
            const currentUrl = window.location.origin
            await navigator.clipboard.writeText(`${currentUrl}/${shortUrl}`)
        }

        return (
            <CommandDialog open={isModalOpen} onOpenChange={() => onClose()}>
                <CommandInput placeholder="Search Links..." />
                <CommandList>
                    <CommandEmpty>
                        No results found.
                    </CommandEmpty>
                    <CommandGroup heading="Shorted Links">
                        {links.map((link, index) => (
                            <CommandItem key={link.id} className="flex justify-between text-sm">
                                {link.name ? (
                                    <span className="line-clamp-1 pr-5">{link.name.split(" ").slice(0, 5).join(" ")}
                                        {link.name.split(" ").length > 5 && <span>...</span>}</span>
                                ) : (
                                    <span className="line-clamp-1 pr-5">{link.link}</span>
                                )}
                                <div className="flex gap-2">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleCopy(link.slug)}>
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Copy Url
                                        </TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={link.link}>
                                                    <Globe className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            Open link
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        )
    } else {
        return null
    }
}

export default SearchLinksModal