"use client"

import { useEffect } from "react"
import { redirect } from "next/navigation"
import AboutHeader from "@/components/about/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function SignOutPage() {

    useEffect(() => {
        setTimeout(() => {
            redirect("/")
        }, 1200)
        redirect("/")
    }, []);

    function handleClick() {
        return redirect("/");
    }

    return (
        <div className={"mx-auto max-w-[768px] px-5"}>
            <AboutHeader
                title={"You're being redirected back to homepage."}
            />
            <div className={"w-full mx-auto px-20"}>
                <Button variant={"outline"} asChild className="justify-center w-full mt-20">
                    <Link href={"/"}>Click here if you're still on this page</Link>
                </Button>
            </div>
        </div>
    )
}

export default SignOutPage