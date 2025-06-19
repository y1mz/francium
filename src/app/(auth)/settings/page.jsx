import { Breadcrumb, BreadcrumbLink,
    BreadcrumbSeparator, BreadcrumbList,
    BreadcrumbItem } from "@/components/ui/breadcrumb"
import { MobileSidebarToggle } from "@/components/settings/settings-mobile-sidebar"
import { House } from "lucide-react"

import GeneralSettingsContainer from "@/components/body/containers/settings/general-container"

function SettingsPage() {

    return (
        <div className="space-y-5 px-5 py-5 md:px-10">
            <nav className="flex gap-1.5">
                <MobileSidebarToggle />
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
            <GeneralSettingsContainer />
        </div>
    )
}

export default SettingsPage