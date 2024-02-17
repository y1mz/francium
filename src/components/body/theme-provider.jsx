"use client"

import { ThemeProvider } from "next-themes"

function ThemesProvider({ children, ...props }) {
    return (
        <ThemeProvider {...props}>{children}</ThemeProvider>
    )
}

export default ThemesProvider