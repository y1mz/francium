import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PanelLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function SettingsHeader({ username, avatar }) {

    return (
        <header className="relative w-full h-[30vh]
            bg-gradient-to-br from-purple-300 to-indigo-300
            dark:from-purple-900 dark:to-indigo-800 rounded-b-2xl shadow-lg"
        >
            <h1 className="justify-center items-center text-center font-bold text-4xl pt-32">Settings</h1>
            <div className="relative mt-[40px] md:mt-[50px]  ml-10 md:ml-16">
                <Avatar className="h-32 w-32">
                    <AvatarFallback>{username.substring(0,1).toUpperCase()}</AvatarFallback>
                    <AvatarImage src={avatar} />
                </Avatar>
            </div>
        </header>
    )
}

export default SettingsHeader