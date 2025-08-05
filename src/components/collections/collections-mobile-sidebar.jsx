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

import { useState, useEffect } from "react"
import { useMobileSidebar } from "@/lib/hooks/useMobileSidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

function MobileSidebarToggle({ config }) {
    const { setOpen, isOpen } = useMobileSidebar()

    return (
        <button
            className="md:hidden flex items-center gap-1.5 text-sm hover:text-foreground text-muted-foreground transition-colors duration-100"
            onClick={() => setOpen(!isOpen)}
        >
            <Menu className="h-4 w-4"/>
            <Separator orientation="vertical" />
        </button>
    )
}

function CollectionsMobileSidebar({ config, collections }) {
    const { isOpen, setOpen } = useMobileSidebar()

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


    return (
        <Sheet open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <SheetContent
                side="left"
                className="flex h-full flex-col space-y-3"
            >
                <SheetHeader className="font-bold text-xl">
                    {config.SiteName}
                </SheetHeader>
                <CollectionsSidebarMenuElements />

            </SheetContent>
        </Sheet>
    )
}

export { MobileSidebarToggle, CollectionsMobileSidebar }
