"use client"
import { DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbItem } from "@/components/ui/breadcrumb"

import { Sun, Moon, Dock, ChevronDown, House } from "lucide-react"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [localUUID, setLocalUUID] = useState("")

    useEffect(() => {
        setLocalUUID(window.localStorage.getItem("localUUID"))

    }, [])

    const ThemeSwitcher = () => {
        return (
            <div className="bg-[#D4D8E7] dark:bg-gray-700 rounded-lg p-1 flex">
                <Button variant="ghost"
                        className={cn("h-8", theme === "system" && "bg-secondary")}
                        onClick={() => setTheme("system")}
                >
                    <Dock className="w-4 h-4 md:mr-2"/>
                    <p className="hidden md:block">System</p>
                </Button>
                <Button variant="ghost"
                        className={cn("h-8", theme === "light" && "bg-secondary")}
                        onClick={() => {
                            setTheme("light")
                        }}
                >
                    <Sun className="w-4 h-4 md:mr-2"/>
                    <p className="hidden md:block">Light</p>
                </Button>
                <Button variant="ghost"
                        className={cn("h-8 transition-colors duration-300", theme === "dark" && "bg-secondary")}
                        onClick={() => {
                            setTheme("dark")
                        }}
                >
                    <Moon className="h-4 w-4 md:mr-2"/>
                    <p className="hidden md:block">Dark</p>
                </Button>
            </div>
        )
    }

    const LanguageSwitcher = () => {

        return (
            <DropdownMenu>
                <DropdownMenuTrigger className="flex" asChild>
                    <Button variant="ghost" className=" ">
                        <p className="mr-2">🇺🇸</p>
                        English (U.S.A)
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        <p className="mr-2">🇺🇸</p>
                        English (U.S.A)
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    return (
        <div className="space-y-5 px-5 py-5 md:px-10">
            <nav>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <House className="h-4 w-4" />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={"/settings"}>
                                Settings
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <section className="space-y-6">
                <h1 className="font-bold text-3xl md:text-4xl">Site Settings</h1>
                <p></p>
                <div className="space-y-4 px-2">
                    <div>
                        <h2 className="font-semibold text-2xl">Appearance</h2>
                        <p className="text-xs text-muted-foreground">Change how website looks and feels to your liking</p>
                    </div>
                    <div className="flex gap-4 items-center px-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Theme: </p>
                        <ThemeSwitcher/>
                    </div>
                    <div className="flex gap-4 items-center px-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Enable header gradients: </p>
                        <Switch />
                    </div>
                </div>
                <div className="space-y-4 px-2">
                    <div>
                        <h2 className="font-semibold text-2xl">Localization</h2>
                        <p></p>
                    </div>
                    <div className="flex gap-4 items-center px-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Language: </p>
                        <LanguageSwitcher />
                    </div>
                </div>
                <div className="space-y-4 px-2">
                    <div className="gap-4 items-center">
                        <h2 className="font-semibold text-2xl">Client</h2>
                        <p className="text-xs text-muted-foreground">Manage client-side settings.</p>
                    </div>
                    <div className="flex gap-4 px-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium flex flex-col">
                            Log errors locally:
                            <span className="text-xs text-muted-foreground">
                            Logs errors and warnings locally for debugging.
                        </span>
                            <span className="text-xs text-muted-foreground">
                            Disabling this will delete all the logged data.
                        </span>
                        </p>
                        <Switch/>
                    </div>
                    <div className="flex gap-4 px-2">
                        <p className="text-gray-700 dark:text-gray-300 font-medium">Client UUID: </p>
                        <pre className="bg-muted px-1 select-all rounded-lg">
                        <code className="font-mono text-sm">{localUUID}</code>
                    </pre>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default SettingsPage