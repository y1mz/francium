import { Breadcrumb, BreadcrumbLink,
    BreadcrumbSeparator, BreadcrumbList,
    BreadcrumbItem } from "@/components/ui/breadcrumb"

import GeneralSettingsContainer from "@/components/body/containers/settings/general-container"

import { House } from "lucide-react"

function SettingsPage() {

    return (
        <div className="space-y-5 px-5 py-5 md:px-10">
            <nav>
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