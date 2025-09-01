"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { useModal } from "../modals/hooks/modal-hook"

function CollectionBox({ collectionId, title, description, itemsCount, isPublic }) {
    const { onOpen } = useModal()

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20 hover:shadow-none transition-all duration-200 h-48 min-w-[300px] max-w-[350px] py-5"
        >
            <div className="space-y-1">
                <div>
                    <h2>{title}</h2>
                    {description && (<span>{description}</span>)}
                </div>
                <span>{itemsCount} items.</span>
            </div>
        </div>
    )
}

export default CollectionBox
