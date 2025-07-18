import { Breadcrumb, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList, BreadcrumbItem } from "@/components/ui/breadcrumb"
import { House } from "lucide-react"
import { MobileSidebarToggle } from "@/components/settings/settings-mobile-sidebar"
import SettingsProfileContainer from "@/components/body/containers/settings/profile-container"

function ProfileSettingsPage() {

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
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/settings/profile">
                                Profile
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <SettingsProfileContainer />
        </div>
    )
}

export default ProfileSettingsPage