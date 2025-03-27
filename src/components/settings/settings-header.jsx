import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function SettingsHeader({ username, avatar }) {

    return (
        <header className="relative w-screen min-h-[30vh]
            bg-gradient-to-br from-purple-300 to-indigo-300
            dark:from-purple-900 dark:to-indigo-800 rounded-b-2xl shadow-lg"
        >
            <nav className="px-3 w-full flex items-center">
                <Button variant="icon">
                    <PanelLeft className="h-5 w-5" />
                </Button>
                <Separator orientation="vertical" className="mr-1 h-3 bg-white/80" />
            </nav>
            <h1 className="justify-center items-center text-center font-bold text-4xl pt-24 md:pt-32">Settings</h1>
            <div className="relative -bottom-10 md:-bottom-16 left-14 md:left-24">
                <Avatar className="h-24 w-24 md:w-48 md:h-48">
                    <AvatarFallback>{username.substring(0,1).toUpperCase()}</AvatarFallback>
                    <AvatarImage src={avatar} />
                </Avatar>
            </div>
        </header>
    )
}

export default SettingsHeader