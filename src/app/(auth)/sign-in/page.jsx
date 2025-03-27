import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"
import { readConfig } from "@/lib/readConfig"

import SignInCard from "@/components/auth/sign-in-card"

// Make sure this page gets updated.
export const dynamic = "force-dynamic"

async function SignInPage({ searchParams }) {
    const session = await ServerSession()
    const { callbackUrl } = await searchParams
    const conf = readConfig()

    let searchParamsCallback = callbackUrl

    if (session) {
        return redirect("/")
    }

    return (
        <main
            className="flex justify-center items-center inset-0 h-dvh mx-auto w-full"
        >
            <div className={`max-w-md w-full`}>
                <SignInCard conf={conf} callbackUrl={searchParamsCallback} />
            </div>
        </main>
    )
}

export default SignInPage