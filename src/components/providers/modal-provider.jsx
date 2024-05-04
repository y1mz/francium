"use client"

import { useState, useEffect } from "react"

import CookiesModal from "@/components/modals/cookie-modal"
import LoginModal from "@/components/modals/login-modal"

function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }
    return (
        <>
            <CookiesModal />
            <LoginModal />
        </>
    )
}

export default ModalProvider