import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"

async function SettingsLayout({ children }) {
    const session = await ServerSession()

    if (!session) {
        return redirect(`${process.env.AUTH_URL}/sign-in?callbackUrl=${process.env.AUTH_URL}/settings`)
    }

    return (
        <main className="bg-[#E1E5F4] dark:bg-[#080e1e]">
            {children}
        </main>
    )
}

export default SettingsLayout