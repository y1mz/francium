import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Info, Home } from "lucide-react"
import { buttonVariants } from "../ui/button"

function Footer({ conf }) {

    const AboutButton = () => {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={"/about"} className={buttonVariants({ variant: "ghost", size: "main" })}>
                        <Info className="h-5 w-5" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    About
                </TooltipContent>
            </Tooltip>
        )
    }

    const HomeButton = () => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/" className={buttonVariants({ variant: "ghost", size: "main_text"})}>
                        <p className="font-bold text-lg">{conf?.SiteName}</p>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {conf?.SiteName}
                </TooltipContent>
            </Tooltip>
        )
    }

    const HomeButtonSmall = () => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <Link href="/" className={buttonVariants({ variant: "ghost", size: "main_text" })}>
                        <Home className="h-5 w-5" />
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    {conf?.SiteName}
                </TooltipContent>
            </Tooltip>
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