import { ServerSession } from "@/lib/server-session"
import { notFound, redirect } from "next/navigation"
import { readConfig } from "@/lib/readConfig"
import { GetPagesContent } from "@/lib/OnboardingPageContents"

import OnBoardingCard from "@/components/auth/onboarding-card"

async function NewUserPage() {
    const session = await ServerSession()
    const conf = readConfig()
    const pages = GetPagesContent()

    // Return not found if page is disabled on settings
    if (!conf.Auth.EnableOnboarding) {
        return notFound()
    }

    // Redirect to homepage if onboarding has completed or user haven't logged in yet.
    if (!session || session.settings.isOnboardingComplete) {
        return redirect("/")
    }

    return (
        <div className="flex justify-center items-center inset-0 h-dvh mx-auto w-full">
            <OnBoardingCard pages={pages} />
        </div>
    )
}

export default NewUserPage