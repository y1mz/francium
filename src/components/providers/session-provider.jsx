"use client"

import { SessionProvider } from "next-auth/react"

function ServerSessionProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default ServerSessionProvider