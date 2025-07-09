import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"
import { readConfig } from "@/lib/readConfig"

import SettingsSidebar from "@/components/settings/settings-sidebar"
import CookiesBanner from "@/components/body/cookie-banner"
import { SettingsMobileSidebar } from "@/components/settings/settings-mobile-sidebar"

async function SettingsLayout({ children }) {
    const session = await ServerSession()
    const config = readConfig()

    if (!session) {
        return redirect(`${process.env.AUTH_URL}/sign-in?callbackUrl=${process.env.AUTH_URL}/settings`)
    }

    return (
        <main className="bg-[#E1E5F4] dark:bg-[#080e1e] flex w-full h-[100vh] transition-all duration-300 overflow-y-hidden">
            <SettingsSidebar 
                config={config}
            />
            <SettingsMobileSidebar 
                config={config}
            />
            <div className="w-full overflow-y-scroll">
                {children}
            </div>
            <CookiesBanner />
        </main>
    )
}

export default SettingsLayout