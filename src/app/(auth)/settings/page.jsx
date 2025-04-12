import SettingsHeader from "@/components/settings/settings-header"
import SettingsSidebar from "@/components/settings/settings-sidebar"

import { ServerSession } from "@/lib/server-session"

async function SettingsPage() {
    const session = await ServerSession()

    return (
        <main className="flex w-full h-[100vh] transition-all duration-300 overflow-y-hidden">
            <SettingsSidebar />
            <div className="overflow-y-scroll w-full">
                <SettingsHeader avatar={session.user.image}
                                username={session.user.name}
                />
            </div>
        </main>
    )
}

export default SettingsPage