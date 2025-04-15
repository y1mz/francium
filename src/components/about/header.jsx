"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

function AboutHeader({ title }) {
    const [enableGr, setEnableGr] = useState(true)

    useEffect(() => {
        const LocalOptionsString = window.localStorage.getItem("localSettings")
        const LocalOptionsParsed = JSON.parse(LocalOptionsString)

        setEnableGr(LocalOptionsParsed.enableGradient)
    }, []);


    return (
        <header className={cn("w-full min-h-[30vh] rounded-b-2xl shadow-lg",
            enableGr ? "bg-gradient-to-br from-purple-300 to-indigo-300 dark:from-purple-900 dark:to-indigo-800" : "bg-white/10"
            )}
        >
            <h1 className="justify-center items-center text-center font-bold text-4xl pt-24 md:pt-32">{title}</h1>
        </header>
    )
}

export default AboutHeader