"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent
, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import CollectionsSidebarMenuElements from "./collections-sidebar-menu-elements"
import { PlusCircle } from "lucide-react"

import { useEffect, useState } from "react"
import { useModal } from "../modals/hooks/modal-hook"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

function CollectionsSidebar({ config, collections, isBanned }) {
    const [isMobile, setMobile] = useState(false)
    const { onOpen } = useModal()

    useEffect(() => {

        if (window.innerWidth <= 768) {
            setMobile(true)
        }

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobile(false)
            } else {
                setMobile(true)
            }
        }

        window.addEventListener("resize", handleResize)
    })

    const LogoButton = () => {
        return (
            <Button variant="link" className="flex gap-3" asChild>
                <Link href={"/"}

                >
                    <p className="font-bold text-xl">{config.SiteName}</p>
                </Link>
            </Button>
        )
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

    // Don't forget to add the new collection button below!
    return (
        <div className={cn(
            "h-full w-[350px] transition-all duration-300 overflow-hidden",
            isMobile && "w-0",
            "dark:bg-[#242939] bg-[#D4D8E7]"
        )}>
            {isMobile ? null : (
                <nav className="flex flex-col gap-5 h-full w-full p-5">
                    <LogoButton />
                    <CollectionsSidebarMenuElements
                      collections={collections}
                      isBanned={isBanned}
                    />
                    {!isBanned && (
                      <NewCollectionButton />
                    )}
                </nav>
            )}
        </div>
    )
}

export default CollectionsSidebar
