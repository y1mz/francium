"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
    DropdownMenuLabel }
    from "@/components/ui/dropdown-menu"
import Link from "next/link"

import { LogOut, Cog, LayoutTemplate, LogIn, Dock, SquareCheckBig, Shapes } from "lucide-react"

import { useSession, signIn, signOut } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { cn } from "@/lib/utils";

function UserButton() {
    const { data: session } = useSession()
    const { onOpen } = useModal()

    if (session) {
        const userNameFirst = session.user.name.substring(0,1).toUpperCase()
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="relative group" variant="ghost" size="main">
                        <Avatar className="h-7 w-7 items-center">
                            <AvatarImage src={session.user.image}/>
                            <AvatarFallback
                                className="h-8 w-8 items-center">{session.user.name.substring(0, 1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span
                            className={cn(
                                "absolute -top-10 left-1/2 -translate-x-1/2",
                                "px-3 py-2 rounded text-sm",
                                "bg-popover text-popover-foreground",
                                "opacity-0 group-hover:opacity-100",
                                "transition-opacity whitespace-nowrap pointer-events-none"
                            )}
                        >
                            User Menu
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className="items-center flex">
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={session.user.image}/>
                                <AvatarFallback>{userNameFirst}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg ml-2">{session.user.name}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    {session.user?.role !== "USER" && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    <Dock className="h-4 w-4" />
                                    <p className="ml-2">Modereation Dashboard</p>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href={"/settings"}>
                            <Cog className="h-4 w-4" />
                            <p className="ml-2">Settings</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/check" className="flex">
                            <SquareCheckBig className="h-4 w-4" />
                            <p className="ml-2">Link checker</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/collections"}>
                            <Shapes className="h-4 w-4" />
                            <p className="ml-2">Collections</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/links"}>
                            <LayoutTemplate className="h-4 w-4" />
                            <p className="ml-2">My links</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="text-red-500 h-4 w-4" />
                        <p className="text-red-500 ml-2">Sign Out</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <Button className="relative group active:scale-95" variant="ghost" size="main" onClick={() => signIn()}>
            <LogIn className="h-5 w-5"/>
            <span
                className={cn(
                    "absolute -top-10 left-1/2 -translate-x-1/2",
                    "px-3 py-2 rounded text-sm",
                    "bg-popover text-popover-foreground",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity whitespace-nowrap pointer-events-none"
                )}
            >
                Sign-in / Sign-up
            </span>
        </Button>
    )
}

export default UserButton