"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
    DropdownMenuLabel }
    from "@/components/ui/dropdown-menu"

import { LogOut, Cog, LayoutTemplate, User } from "lucide-react"

import { useSession, signIn, signOut } from "next-auth/react"

function UserButton() {
    const { data: session } = useSession()

    if (session) {
        const userNameFirst = session.user.name.substring(0,1).toUpperCase()
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="main">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={session.user.image} />
                            <AvatarFallback className="h-8 w-8 items-center">{session.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                        </Avatar>
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
                    <DropdownMenuItem onClick={() => console.warn("Not implemented")}>
                        <Cog className="h-4 w-4" />
                        <p className="ml-2">Settings</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.warn("Not implemented")}>
                        <LayoutTemplate className="h-4 w-4" />
                        <p className="ml-2">My links</p>
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
        <Button variant="ghost" size="main" onClick={() => signIn()}>
            <User />
        </Button>
    )
}

export default UserButton