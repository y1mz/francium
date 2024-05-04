"use client"

import { useEffect, useState } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"

import Footer from "@/components/body/footer";

function MainPageLayout({ children }) {
    const { onOpen } = useModal()
    useEffect(() => {
        const cA = localStorage.getItem("cookiesAccepted")
        if (window.location.pathname === "/") {
            if (!cA) {
                return onOpen("cookies")
            }
        }
    }, []);

    return (
        <section>
            {children}
            <Footer />
        </section>
    )
}

export default MainPageLayout