"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"

import Footer from "@/components/body/footer";

function MainPageLayout({ children }) {
    const { onOpen } = useModal()

    let cA;
    useEffect(() => {

        cA = localStorage.getItem("cookiesAccepted")
        if (window.location.pathname === "/") {
            if (!cA) {
                return onOpen("cookies")
            }
        }
    }, []);

    return (
        <section className="py-10">
            {children}
            <Footer />
        </section>
    )
}

export default MainPageLayout