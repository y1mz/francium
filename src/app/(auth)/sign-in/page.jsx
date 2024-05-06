"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useSearchParams } from "next/navigation"

function SignInPage() {
    const { onOpen } = useModal()

    // To-do: Get params from URL and redirect them to auth modal inside useEffect.

     useEffect(() => {
         onOpen("login", UrlStates)
     }, []);

    return (
        <div className="flex h-dvh w-full">

        </div>
    )
}

export default SignInPage