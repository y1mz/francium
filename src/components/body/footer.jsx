import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "../ui/button"
import { Info, Home } from "lucide-react"

function Footer({ SiteName }) {

    const AboutButton = () => {
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="main" asChild>
                        <Link href={"/about"}>
                            <Info className="h-5 w-5" />
                        </Link>
                    </Button>
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
                    <Button variant="ghost" size="main_text" asChild>
                        <Link href="/">
                            <p className="font-bold text-lg">{SiteName}</p>
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {SiteName}
                </TooltipContent>
            </Tooltip>
        )
    }

    const HomeButtonSmall = () => {
        return (
            <Tooltip>
                <TooltipTrigger>
                    <Button variant="ghost" size="main_text" asChild>
                        <Link href="/">
                            <Home className="h-5 w-5" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {SiteName}
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