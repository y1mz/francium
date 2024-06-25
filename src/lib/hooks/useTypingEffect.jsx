"use client"

import { useEffect, useState } from "react"

const useTypingEffect = (text, duration) => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const items = text.split("")

    useEffect(() => {
        setCurrentPosition(0)
    }, [text])

    useEffect(() => {
        if (currentPosition >= items.length) {
            return
        }
        const intervalId = setInterval(() => {
            setCurrentPosition((prevPosition) => prevPosition + 1)
        }, duration)

        const cc = () => {
            clearInterval(intervalId)
        }
        return cc
    }, [currentPosition, items, duration])

    return items.slice(0, currentPosition).join("")
}

export { useTypingEffect }