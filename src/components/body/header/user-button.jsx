"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
    DropdownMenuLabel }
    from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link"

import { LogOut, Cog, LayoutTemplate, LogIn, Dock, SquareCheckBig, Info } from "lucide-react"

import { useSession, signIn, signOut } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"

function UserButton() {
    const { data: session } = useSession()
    const { onOpen } = useModal()

    if (session) {
        const userNameFirst = session.user.name.substring(0,1).toUpperCase()
        return (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant="ghost" size="main">
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src={session.user.image} />
                                    <AvatarFallback className="h-8 w-8 items-center">{session.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            User menu
                        </TooltipContent>
                    </Tooltip>
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
                    {session.user?.role === "ADMIN" && (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard">
                                    <Dock className="h-4 w-4" />
                                    <p className="ml-2">Dashboard</p>
                                </Link>
                            </DropdownMenuItem>
                        </>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href="/check" className="flex">
                            <SquareCheckBig className="h-4 w-4" />
                            <p className="ml-2">Link checker</p>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpen("usrSettings")}>
                        <Cog className="h-4 w-4" />
                        <p className="ml-2">Settings</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={"/links"} className="flex">
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
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" size="main" onClick={() => signIn()}>
                    <LogIn className="h-5 w-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                Sign In
            </TooltipContent>
        </Tooltip>
    )
}

export default UserButton