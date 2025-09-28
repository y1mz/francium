"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { FolderOpen, Ellipsis, Pencil, Trash } from "lucide-react"

import { useModal } from "../modals/hooks/modal-hook"

function CollectionBox({ collectionId, title, description, itemsCount, isPublic, slug }) {
    const { onOpen } = useModal()

    return (
        <div
            className="relative rounded-lg bg-white/10 hover:bg-white/20 hover:shadow-none transition-all duration-200 h-48 w-full px-3 py-5"
        >
            <div className="flex flex-col">
                <div>
                   <div className="flex gap-2 items-center">
                        <FolderOpen className="h-6 w-6" />
                        <h2 className="text-xl font-bold">{title}</h2>
                   </div>
                    {description && (
                        <span className="text-md">
                            {description}
                        </span>
                        )}
                </div>
                <span className="text-xs text-muted-foreground">
                    {itemsCount} items.
                </span>
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
                            <DropdownMenuItem
                                onClick={() => onOpen("collectionEdit", {
                                    id: collectionId,
                                    publicSlug: slug,
                                    name: title,
                                    description: description
                                })}
                            >
                                <Pencil className="h-4 w-4 mr-2" />
                                <p>Edit</p>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600"
                                onClick={() => onOpen("collectionDel", {
                                    id: collectionId,
                                    publicSlug: slug,
                                    name: title
                                }) }
                            >
                                <Trash className="h-4 w-4 mr-2" />
                                <p>Delete Collection</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex">
                        <Button variant="ghost2" asChild>
                            <Link href={`/collection/${slug}`}>
                                Open
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CollectionBox
