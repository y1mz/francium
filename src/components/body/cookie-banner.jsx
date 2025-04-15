"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { generateUUID } from "@/lib/generateUUID"

import { Button } from "@/components/ui/button"
import Link from "next/link"

function CookiesBanner() {
    const [showBanner, setShowBanner] = useState(false)
    const { data: session } = useSession()

    useEffect(() => {
        // Write local UUID
        const cUUID = localStorage.getItem("localUUID")
        if (!cUUID && !session) {
            const UUID = generateUUID(15)
            localStorage.setItem("localUUID", UUID)
        }
        // Handle Cookie banner
        const cA = localStorage.getItem("cookiesAccepted")
        if (!cA && !session) {
            setTimeout(() => {
                setShowBanner(true)
            }, 2000)
        }

        // Handle local settings
        const LocalOptionsString = window.localStorage.getItem("localSettings")

        if (!LocalOptionsString) {
            window.localStorage.setItem("localSettings", JSON.stringify({
                "enableGradient" : true,
                "lang": "en-us",
                "logLocal": false
            }))
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookiesAccepted", "true")
        setShowBanner(false)
    }

    if (!showBanner) {
        return null
    }

    return (
        <div
            className="fixed bottom-24 md:bottom-4 inset-x-4 md:left-auto md:max-w-[400px] p-6 dark:bg-gray-900 bg-white
            shadow-lg rounded-lg animate-in slide-in-from-bottom-12 duration-300"
        >
            <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-xl">Cookies</h3>
                <p className="text-sm text-muted-foreground">
                    We use cookies to enhance your experience trough this website.
                    For more information, you can check our privacy policy from link down below.
                </p>
                <div className="w-full flex justify-between">
                    <Button variant="ghost" asChild>
                        <Link href={"/privacy"}>
                            Privacy Policy
                        </Link>
                    </Button>
                    <Button onClick={handleAccept}>
                        Accept Cookies
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CookiesBanner