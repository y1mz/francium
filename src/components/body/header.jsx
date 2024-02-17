"use client"

import { Separator } from "../ui/separator"

import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"

function Header({ Title }) {
    return (
        <header className="min-w-full">
            <div className="px-5 sm:px-10 md:px-40 flex justify-between h-[50px] items-center">
                <div className="flex gap-5">
                    <p className="font-bold">{Title}</p>
                </div>
                <div className="flex gap-2">
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
            <Separator />
        </header>
    )
}

export default Header