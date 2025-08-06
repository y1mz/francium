"use client"

import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader
} from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent
    , DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import CollectionsSidebarMenuElements from "./collections-sidebar-menu-elements"
import { Menu, PlusCircle } from "lucide-react"

import { useState, useEffect } from "react"
import { useMobileSidebar } from "@/lib/hooks/useMobileSidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useModal } from "../modals/hooks/modal-hook"

function MobileSidebarToggle({ config }) {
    const { setOpen, isOpen } = useMobileSidebar()

    return (
        <button
            className="md:hidden flex items-center gap-1.5 text-sm hover:text-foreground text-black dark:text-white transition-colors duration-100 p-1"
            onClick={() => setOpen(!isOpen)}
        >
            <Menu className="h-5 w-5"/>
        </button>
    )
}

function CollectionsMobileSidebar({ config, collections }) {
    const { isOpen, setOpen } = useMobileSidebar()
    const { onOpen } = useModal()

    useEffect(() => {

        const handleResize = () => {
            if ((window.innerWidth >= 768) && isOpen) {
                setOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
    })

    if (!isOpen) {
        return null
    }

    const NewCollectionButton = () => {
      return (
        <Button
          variant="sidebar"
          className="mt-auto active:scale-90 transition-transform duration-300"
          onClick={() => { onOpen("newCollection") }}
        >
          <PlusCircle className="h-5 w-5 mr-3" />
          New Collection
        </Button>
      )
    }

    return (
        <Sheet open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <SheetContent
                side="left"
                className="flex h-full flex-col gap-5"
            >
                <SheetHeader className="font-bold text-xl">
                    {config.SiteName}
                </SheetHeader>
                <CollectionsSidebarMenuElements />
                <NewCollectionButton />
            </SheetContent>
        </Sheet>
    )
}

export { MobileSidebarToggle, CollectionsMobileSidebar }
