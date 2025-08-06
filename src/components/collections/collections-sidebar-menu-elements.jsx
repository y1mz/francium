"use client"

import { Button } from "../ui/button"
import { ChevronsUpDown, LogOut, LayoutTemplate,
    Library, CircleUser,
    AtSign, History, Shapes } from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

function CollectionsSidebarMenuElements({ collections }) {
  const [isMounted, setMounted] = useState(false)
  const [currentPath, setCurrentPath] = useState("/settings")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  })

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [isMounted])

  const handleRedirect = (url) => {
      setCurrentPath(url)
      router.push(url)
  }

  return (
    <div className="flex flex-col space-y-3">
        <div className="space-y-2">
          <Button variant="sidebar" className={cn(currentPath === "/links" && "bg-secondary shadow-sm")}
              onClick={() => {
                  handleRedirect("/links")
              }}
                  asChild
          >
              <Link href={"/links"}>
                  <Library className="h-5 w-5 mr-3" />
                  My Links
              </Link>
          </Button>
            <Button variant="sidebar" className={cn(currentPath === "/links/history" && "bg-secondary shadow-sm")}
                onClick={() => {
                    handleRedirect("/links/history")
                }}
                    asChild
            >
                <Link href={"/links/history"}>
                    <History className="h-5 w-5 mr-3" />
                    Recently Visited
                </Link>
            </Button>
            <Button variant="sidebar" className={cn(currentPath === "/collections" && "bg-secondary shadow-sm")}
                onClick={() => {
                    handleRedirect("/collections")
                }}
                    asChild
            >
                <Link href={"/collections"}>
                    <Shapes className="h-5 w-5 mr-3" />
                    All Collections
                </Link>
            </Button>
        </div>
        <div className="space-y-2 overflow-y-scroll">
          <p className="text-sm font-medium text-muted-foreground px-4 truncate">Collections</p>
        </div>
    </div>
  )
}

export default CollectionsSidebarMenuElements
