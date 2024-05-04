import Link from "next/link"
import ModeToggle from "./header/theme-toggle"
import UserButton from "./header/user-button"
import { Button } from "../ui/button"

function Footer() {
    return (
        <footer 
            className="container dark:bg-[#1A2032] shadow-2xl bg-[#bfc6e8] rounded-xl mx-auto 
            px-10 w-[350px] md:w-[500px] py-5 fixed inset-x-0 bottom-4"
        >
            <div className="flex justify-between">
                <Button variant="ghost" size="main_text" asChild>
                    <Link href="/">
                        <p className="font-bold text-lg">Francium Project</p>
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