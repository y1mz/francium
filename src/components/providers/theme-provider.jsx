"use client"

import { ThemeProvider } from "next-themes"
import { TooltipProvider } from "../ui/tooltip"

function ThemesProvider({ children, ...props }) {
    return (
        <ThemeProvider {...props}>
            <TooltipProvider>
                {children}
            </TooltipProvider>
        </ThemeProvider>
    )
}

export default ThemesProvider