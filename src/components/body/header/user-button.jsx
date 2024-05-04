"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

function UserButton() {
    return (
        <Button variant="ghost" size="main_text" asChild>
            <Link href={"/sign-in"}>Sign-in</Link>
        </Button>
    )
}

export default UserButton