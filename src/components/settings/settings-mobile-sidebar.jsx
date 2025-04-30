"use client"

import {
    AtSign,
    CircleUser,
    CloudDownload,
    CloudUpload,
    Cog,
    Menu,
    Shield,
    ChevronsUpDown,
    Dock,
    BellRing, SquareCheckBig, Library, LayoutTemplate, LogOut
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
    Sheet,
    SheetContent,
    SheetHeader
} from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent
    , DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"

import { useState, useEffect } from "react"
import { useMobileSidebar } from "@/lib/hooks/useMobileSidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react";

function MobileSidebarToggle() {
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

function SettingsMobileSidebar() {
    const { isOpen, setOpen } = useMobileSidebar()
    const [isMounted, setMounted] = useState(false)
    const [currentPath, setCurrentPath] = useState("/settings")
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        setMounted(true)

        const handleResize = () => {
            if ((window.innerWidth >= 768) && isOpen) {
                setOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [isMounted])

    if (!isOpen) {
        return null
    }

    const handleRedirect = (url) => {
        setCurrentPath(url)
        router.push(url)
    }

    const UserButton = () => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="mt-auto" asChild>
                    <Button variant="ghost" className="flex gap-2 justify-start items-center">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session?.user.image} />
                            <AvatarFallback>{session?.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="text-left leading-tight">
                            <p className="turncate text-sm text-semibold">{session?.user.name}</p>
                            <span className="turncate text-xs">{session?.user.email}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="space-y-1" >
                    <DropdownMenuLabel className="flex gap-2 items-center">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={session?.user.image} />
                            <AvatarFallback>{session?.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{session?.user.name}</p>
                            <span>{session?.user.email}</span>
                        </div>
                    </DropdownMenuLabel>
                    {session?.user.role === "ADMIN" && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={"/dashboard"}>
                                    <Dock className="h-4 w-4"/>
                                    <p className="ml-2">Moderation Dashboard</p>
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <BellRing className="h-4 w-4" />
                        <p className="ml-2">Notifications</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/check" className="flex">
                            <SquareCheckBig className="h-4 w-4" />
                            <p className="ml-2">Link checker</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/links/collections"}>
                            <Library className="h-4 w-4" />
                            <p className="ml-2">Collections</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/links"}>
                            <LayoutTemplate className="h-4 w-4" />
                            <p className="ml-2">My Links</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={"/sign-out"}>
                            <LogOut className="text-red-500 h-4 w-4" />
                            <p className="text-red-500 ml-2">Sign Out</p>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Sheet open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <SheetContent
                side="left"
                className="flex h-full flex-col space-y-3"
            >
                <SheetHeader className="font-bold text-xl">
                    Vexxit Link Shortener
                </SheetHeader>
                <div className="flex flex-col h-full space-y-3">
                    <Button variant="sidebar" className={cn(currentPath === "/settings" && "bg-secondary shadow-sm")}
                            onClick={() => {
                                handleRedirect("/settings")
                            }}
                            asChild
                    >
                        <Link href={"/settings"}>
                            <Cog className="h-5 w-5 mr-3"/>
                            General
                        </Link>
                    </Button>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground px-4 truncate">Account</p>
                        <Button variant="sidebar"
                                className={cn(currentPath === "/settings/profile" && "bg-secondary shadow-sm")}
                                onClick={() => {
                                    handleRedirect("/settings/profile")
                                }}
                                asChild
                        >
                            <Link href={"/settings/profile"}>
                                <CircleUser className="h-5 w-5 mr-3"/>
                                Profile Settings
                            </Link>
                        </Button>
                        <Button variant="sidebar"
                                className={cn(currentPath === "/settings/account" && "bg-secondary shadow-sm")}
                                onClick={() => {
                                    handleRedirect("/settings/account")
                                }}
                                asChild
                        >
                            <Link href={"/settings/account"}>
                                <AtSign className="h-5 w-5 mr-3"/>
                                Account Settings
                            </Link>
                        </Button>
                        <Button variant="sidebar"
                                className={cn(currentPath === "/settings/privacy" && "bg-secondary shadow-sm")}
                                onClick={() => {
                                    handleRedirect("/settings/privacy")
                                }}
                        >
                            <Link href={"/settings/privacy"} className="flex">
                                <Shield className="h-5 w-5 mr-3"/>
                                Privacy Settings
                            </Link>
                        </Button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground px-4 truncate">Data</p>
                        <Button variant="sidebar"
                                className={cn(currentPath === "/settings/data/export" && "bg-secondary shadow-sm")}
                                onClick={() => {
                                    handleRedirect("/settings/data/export")
                                }}
                                asChild
                        >
                            <Link href="/settings/data/export">
                                <CloudDownload className="h-5 w-5 mr-3"/>
                                Export Data
                            </Link>
                        </Button>
                        <Button variant="sidebar"
                                className={cn(currentPath === "/settings/data/import" && "bg-secondary shadow-sm")}
                                onClick={() => {
                                    handleRedirect("/settings/data/import")
                                }}
                                asChild
                        >
                            <Link href="/settings/data/import">
                                <CloudUpload className="h-5 w-5 mr-3"/>
                                Import Data
                            </Link>
                        </Button>
                    </div>
                </div>
                <UserButton />
            </SheetContent>
        </Sheet>
    )
}

export { MobileSidebarToggle, SettingsMobileSidebar }