"use client"

import { useTypingEffect } from "@/lib/hooks/useTypingEffect"
import { Bebas_Neue } from "next/font/google"

const bebas = Bebas_Neue({
    weight: '400',
    subsets: ["latin"]
})

function HeaderEffect({ text }) {
    const headerTextToShow = useTypingEffect(text, 50)

    return (
        <h1 className={`text-center text-6xl font-bold pt-20 ${bebas.className}`}>{headerTextToShow}</h1>
    )
}

export default HeaderEffect