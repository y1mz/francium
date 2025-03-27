import SettingsHeader from "@/components/settings/settings-header"

import { ServerSession } from "@/lib/server-session"

async function SettingsPage() {
    const session = await ServerSession()

    return (
        <page>
            <SettingsHeader avatar={session.user.image} username={session.user.name} />
        </page>
    )
}

export default SettingsPage