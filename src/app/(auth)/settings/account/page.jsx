import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {House} from "lucide-react"
import { MobileSidebarToggle } from "@/components/settings/settings-mobile-sidebar"
import SettingsAccountContainer from "@/components/body/containers/settings/account-container"

import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { readConfig } from "@/lib/readConfig"

async function ProfileSettingsPage() {
    const config = readConfig()
    const session = await ServerSession()

    const Bans = await db.userBans.findMany({
        where: {
            userId: session.user.id
        }
    })

    return (
        <div className="space-y-5 px-5 py-5 md:px-10">
            <nav className="flex gap-1.5">
                <MobileSidebarToggle />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <House className="h-4 w-4"/>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={"/settings"}>
                                Settings
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/settings/account">
                                Account
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <SettingsAccountContainer siteConf={config} userBans={Bans} />
        </div>
    )
}

export default ProfileSettingsPage