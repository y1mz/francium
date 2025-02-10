"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

function MainPageCookieProvider({ children }) {
    const { onOpen } = useModal()
    const { data: session } = useSession()

    let cA;
    useEffect(() => {

        cA = localStorage.getItem("cookiesAccepted")
        if (!session || !cA) {
            return onOpen("cookies")
        }
    }, [cA])

    if (!session.settings.isOnboardingComplete) {
        return redirect("/sign-in/onboarding")
    }

    return (
        <>
            {children}
        </>
    )
}

export default MainPageCookieProvider