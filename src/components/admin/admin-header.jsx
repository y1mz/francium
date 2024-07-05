import Link from "next/link"

import { ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"
import UserButton from "../body/header/user-button"
import ModeToggle from "../body/header/theme-toggle"

function AdminHeader({ title }) {
    return (
        <header className="bg-white/50 dark:bg-white/10 backdrop-blur-md shadow-lg z-20 flex justify-between rounded-lg p-3 mx-5 md:mx-24 fixed inset-x-0 top-4">
            <Button variant="ghost" size="main_text" asChild>
                <Link href="/" className="flex gap-1">
                    <ChevronLeft /> <p>Back to {title}</p>
                </Link>
            </Button>
            <div className="flex gap-5">
                <UserButton />
                <ModeToggle />
            </div>
        </header>
    )
}

export default AdminHeader