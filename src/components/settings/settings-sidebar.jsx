"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent
, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"

import { ChevronsUpDown, LogOut, LayoutTemplate,
    Library, SquareCheckBig, BellRing, Dock, CircleUser,
    AtSign, Shield, Cog, CloudDownload, CloudUpload } from "lucide-react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

function SettingsSidebar({ config }) {
    const [isMounted, setMounted] = useState(false)
    const [isMobile, setMobile] = useState(false)
    const [currentPath, setCurrentPath] = useState("/settings")
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        setMounted(true)

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

    useEffect(() => {
        setCurrentPath(window.location.pathname)
    }, [isMounted]);

    const handleRedirect = (url) => {
        setCurrentPath(url)
        router.push(url)
    }

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

    const MenuElements = () => {
        "use client"
        return (
            <div className="flex flex-col space-y-3">
                <Button variant="sidebar" className={cn(currentPath === "/settings" && "bg-secondary shadow-sm")}
                    onClick={() => {
                        handleRedirect("/settings")
                    }}
                        asChild
                >
                    <Link href={"/settings"}>
                        <Cog className="h-5 w-5 mr-3" />
                        General
                    </Link>
                </Button>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground px-4 truncate">Account</p>
                    <Button variant="sidebar" className={cn(currentPath === "/settings/profile" && "bg-secondary shadow-sm")}
                        onClick={() => {
                            handleRedirect("/settings/profile")
                        }}
                            asChild
                    >
                        <Link href={"/settings/profile"}>
                            <CircleUser className="h-5 w-5 mr-3" />
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
                            <AtSign className="h-5 w-5 mr-3" />
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
                            <Shield className="h-5 w-5 mr-3" />
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
                            <CloudDownload className="h-5 w-5 mr-3" />
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
                            <CloudUpload className="h-5 w-5 mr-3" />
                            Import Data
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className={cn(
            "h-full w-[350px] transition-all duration-300 overflow-hidden",
            isMobile && "w-0",
            "dark:bg-[#242939] bg-[#D4D8E7]"
        )}>
            {isMobile ? null : (
                <nav className="flex flex-col gap-5 h-full w-full p-5">
                    <LogoButton />
                    <MenuElements />
                    <UserButton />
                </nav>
            )}
        </div>
    )
}

export default SettingsSidebar