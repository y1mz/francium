import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Info, Home } from "lucide-react"
import {Button, buttonVariants} from "../ui/button"
import { cn } from "@/lib/utils"

function Footer({ conf }) {

    const AboutButton = () => {
        return (
            <Button className="relative group active:scale-95" variant="ghost" size="main" asChild>
                <Link href={"/about"}>
                    <Info className="h-5 w-5"/>
                    <span
                        className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2",
                            "px-3 py-2 rounded text-sm",
                            "bg-popover text-popover-foreground",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity whitespace-nowrap pointer-events-none"
                        )}
                    >
                    About
                </span>
                </Link>
            </Button>
        )
    }

    const HomeButton = () => {
        return (
            <Button variant="ghost" size="main_text" className="relative group active:scale-95" asChild>
                <Link href="/">
                    <p className="font-bold text-lg">{conf?.SiteName}</p>
                    <span
                        className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2",
                            "px-3 py-2 rounded text-sm",
                            "bg-popover text-popover-foreground",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity whitespace-nowrap pointer-events-none"
                        )}
                    >
                    {conf?.SiteName}
                </span>
                </Link>
            </Button>
        )
    }

    const HomeButtonSmall = () => {
        return (
            <Button variant="ghost" size="main_text" className="relative group active:scale-95" asChild>
                <Link href="/" className={buttonVariants({variant: "ghost", size: "main_text"})}>
                    <Home className="h-5 w-5"/>
                    <span
                        className={cn(
                            "absolute -top-10 left-1/2 -translate-x-1/2",
                            "px-3 py-2 rounded text-sm",
                            "bg-popover text-popover-foreground",
                            "opacity-0 group-hover:opacity-100",
                            "transition-opacity whitespace-nowrap pointer-events-none"
                        )}
                    >
                    {conf?.SiteName}
                </span>
                </Link>
            </Button>
        )
    }

    return (
        <footer
            className="bg-white/40 dark:bg-white/10 backdrop-blur-2xl shadow-2xl rounded-xl mx-auto
            px-5 w-[300px] sm:w-[350px] md:w-[500px] py-5 fixed inset-x-0 bottom-4 z-20"
        >
            <div className="flex justify-between">
                <div className="hidden sm:block">
                    <HomeButton />
                </div>
                <div className="block sm:hidden">
                    <HomeButtonSmall />
                </div>
                <div className="flex gap-1 text-center">
                    <AboutButton />
                    <ModeToggle />
                    <UserButton />
                </div>
            </div>
        </footer>
    )
}

export default Footer