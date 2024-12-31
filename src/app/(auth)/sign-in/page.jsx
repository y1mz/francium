import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"
import conf from "&/siteconfig.json"

import SignInCard from "@/components/auth/sign-in-card"


async function SignInPage({ searchParams }) {
    const session = await ServerSession()
    const { callbackUrl } = await searchParams

    let searchParamsCallback = callbackUrl

    if (session) {
        return redirect("/")
    }

    return (
        <div
            className="flex justify-center items-center inset-0 h-dvh mx-auto w-full"
        >
            <div className={`max-w-md w-full`}>
                <SignInCard conf={conf} callbackUrl={searchParamsCallback} />
            </div>
        </div>
    )
}

export default SignInPage