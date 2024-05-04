"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook";

function SignInPage() {
    const { onOpen } = useModal()

     useEffect(() => {
         onOpen("login")
     }, []);

    return (
        <div className="flex h-dvh w-full">

        </div>
    )
}

export default SignInPage