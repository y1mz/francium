import { db } from '@/lib/db'
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"

import UrlReportedContainer from '@/components/body/containers/redirecting-container'
import UrlExpiredContainer from "@/components/body/containers/redirect/urk-expired-container"

async function RedirectPage({ params }) {
    const { slug } = await params
    const currentDate = new Date()

    const redirectUrl = await db.shortLinks.findUnique({
        where: {
            slug
        },
        include: {
            reports: true
        }
    })

    if (!redirectUrl) {
        return notFound()
    }

    if (!redirectUrl.active) {
        return (
            <UrlExpiredContainer />
        )
    }

    if (redirectUrl.usageLimit && redirectUrl.usageLimit <= redirectUrl.usage) {
        return (
            <UrlExpiredContainer />
        )
    }

    if (redirectUrl.expiresAt >= currentDate) {
        let reported = redirectUrl.reports
        let usageA
        usageA = redirectUrl.usage + 1

        await db.shortLinks.update({
            where: {
                slug
            },
            data: {
                usage: usageA
            }
        })

        if (reported.length > 0) {
            let redirectUU = redirectUrl.link
            return (
                <UrlReportedContainer url={redirectUU} />
            )
        }

        return redirect(redirectUrl.link)
    } else {
        return (
            <UrlExpiredContainer />
        )
    }
}

export default RedirectPage