import { db } from '@/lib/db'
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"

import { UrlExpiredContainer, UrlReportedContainer } from '@/components/body/containers/redirecting-container'

async function RedirectPage({ params }) {
    const slug = params.slug
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

    if (redirectUrl.active === false) {
        return notFound()
    }

    if (redirectUrl && redirectUrl.expiresAt >= currentDate) {
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
            return (
                <UrlReportedContainer url={redirectUrl.link} />
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