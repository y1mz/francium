"use client"

import { useEffect } from "react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useSession } from "next-auth/react"
import conf from "/config/siteconfig.json"

import Footer from "@/components/body/footer"

function MainPageLayout({ children }) {
    const { onOpen } = useModal()
    const { data: session } = useSession()

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
        <section className="pb-10">
            {children}
            <Footer SiteName={conf.SiteName} />
        </section>
    )
}

export default MainPageLayout