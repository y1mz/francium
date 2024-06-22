import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Button } from "../ui/button"

import conf from "/config/siteconfig.json"

function Footer() {

    return (
        <footer 
            className="container backdrop-blur-2xl bg-white/20 dark:bg-white/10 shadow-2xl rounded-xl mx-auto
            px-5 w-[350px] md:w-[500px] py-5 fixed inset-x-0 bottom-4"
        >
            <div className="flex justify-between">
                <Button variant="ghost" size="main_text" asChild>
                    <Link href="/">
                        <p className="font-bold text-lg">{conf.SiteName}</p>
                    </Link>
                </Button>
                <div className="flex gap-1 text-center">
                    <Button variant="ghost" size="main_text" asChild>
                        <Link href={"/about"}>
                            About
                        </Link>
                    </Button>
                    <UserButton />
                    <ModeToggle />
                </div>
            </div>
        </footer>
    )
}

export default Footer