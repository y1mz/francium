"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useSearchParams } from "next/navigation"

import conf from "&/siteconfig.json"

function SignInPage() {
    const { onOpen } = useModal()
    const config = conf.Auth

    const searchParams = useSearchParams()
    useEffect(() => {
        const UrlStates = {
            callbackUrl : searchParams.get("callbackUrl"),
            configuration: config
        }
        
            onOpen("login", UrlStates)
    }, []);

    return (
        <div className="flex h-dvh w-full">

        </div>
    )
}

export default SignInPage