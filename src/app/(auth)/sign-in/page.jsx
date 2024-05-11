"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useSearchParams } from "next/navigation"

function SignInPage() {
    const { onOpen } = useModal()

    const searchParams = useSearchParams()
     useEffect(() => {
        const UrlStates = {
            callbackUrl : searchParams.get("callbackUrl")
        }

         onOpen("login", UrlStates)
     }, []);

    return (
        <div className="flex h-dvh w-full">

        </div>
    )
}

export default SignInPage