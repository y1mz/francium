import Footer from "@/components/body/footer"

import { readConfig } from "@/lib/readConfig"
import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"

async function SettingsLayout({ children }) {
    const session = await ServerSession()
    const conf = readConfig()

    if (!session) {
        return redirect(`${process.env.AUTH_URL}/sign-in?callbackUrl=${process.env.AUTH_URL}/settings`)
    }

    return (
        <main className="pb-10 bg-[#E1E5F4] dark:bg-[#080e1e]">
            {children}
            <Footer conf={conf} />
        </main>
    )
}

export default SettingsLayout