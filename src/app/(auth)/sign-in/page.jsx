"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook";

function SignInPage() {
    const { onOpen } = useModal()

    useEffect(() => {
        onOpen("login")
    }, []);

    return (
        <div className="flex h-dvh">
            <div className="relative top-0 bottom-o left-0 right-0 max-w-[768px] mx-auto">

            </div>
        </div>
    )
}

export default SignInPage