"use client"

import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "../ui/dropdown-menu"
import { ChevronsUpDown, LayoutTemplate,
    Library, Ellipsis, AtSign, History, Shapes, Trash, Pen, Search } from "lucide-react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useMobileSidebar } from "@/lib/hooks/useMobileSidebar"

function CollectionsSidebarMenuElements({ collections, isBanned }) {
  const [isMounted, setMounted] = useState(false)
  const [currentPath, setCurrentPath] = useState("/settings")
  const router = useRouter()
  const { isMobile } = useMobileSidebar()

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

  const CollectionButton = ({ slug, title }) => {

    return (
      <Button variant="sidebar" className={cn(currentPath === `/collection/${slug}` && "bg-secondary shadow-sm") + "group flex"}>
        <Link href={`/collection/${slug}`} className="w-full text-start"
          onClick={() => {
            handleRedirect(`/collection/${slug}`)
          }}
        >
          {title}
        </Link>
        {!isBanned && (
          <DropdownMenu>
            <DropdownMenuTrigger className="ml-auto">
             <div className="hidden group-hover:block">
                <Ellipsis className="h-5 w-5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
              <DropdownMenuItem>
                <Pen className="h-4 w-4 mr-2" />
                <p>Edit</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash className="h-4 w-4 mr-2" />
                <p>Delete Collection</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </Button>
    )
  }

  return (
    <div className="flex flex-col space-y-3 overflow-y-scroll">
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
            {isMobile && (
              <Button variant="sidebar" className={cn(currentPath === "/links/search" && "bg-secondary shadow-sm")}
                  onClick={() => {
                      handleRedirect("/links/search")
                  }}
                      asChild
              >
                  <Link href={"/links/search"}>
                      <Search className="h-5 w-5 mr-3" />
                      Search
                  </Link>
              </Button>
            )}
        </div>
        <div className="space-y-2 overflow-y-scroll">
          <p className="text-sm font-medium text-muted-foreground px-4 truncate">Collections</p>
            {collections.map((item, index) => (
              <CollectionButton
                key={index}
                title={item.name}
                slug={item.publicSlug}
              />
            ))}
        </div>
    </div>
  )
}

export default CollectionsSidebarMenuElements
