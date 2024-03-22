import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Button } from "../ui/button"

function Footer() {
    return (
        <footer 
            className="container bg-[#1A2032] rounded-xl mx-auto 
            px-10 w-[350px] md:w-[500px] py-5 fixed inset-x-0 bottom-4"
        >
            <div className="flex justify-between">
                <Button variant="ghost" size="main" asChild>
                    <Link href="/">
                        <img src="/Francium.svg"/>
                    </Link>
                </Button>
                <div className="flex gap-1 text-center">
                    <Button variant="ghost" size="main_text" asChild>
                        <Link href="/about">
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