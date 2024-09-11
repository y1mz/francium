"use client"

import {
    Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput,
    CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command"

import { useModal } from "./hooks/modal-hook"

function SearchLinksModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "searchLinks"


    if (isModalOpen) {
        const { links } = data
        console.log(data)
        return (
            <CommandDialog open={isModalOpen} onOpenChange={() => onClose()}>
                <CommandInput placeholder="Search Links..." />
                <CommandList>
                    <CommandEmpty>
                        No results found.
                    </CommandEmpty>
                    <CommandGroup heading="Shorted Links">
                        {links.map((link, index) => (
                            <CommandItem key={link.id}>
                                <span>{index + 1} - </span>
                                <span>{link.name}</span>
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