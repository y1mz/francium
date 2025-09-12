import { db } from '@/lib/db'
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import { ServerSession } from '@/lib/server-session'

import UrlReportedContainer from '@/components/body/containers/redirecting-container'

async function RedirectPage({ params }) {
    const { slug } = await params
    const currentDate = new Date()
    const session = await ServerSession()

    const redirectUrl = await db.shortLinks.findUnique({
        where: {
            slug: slug,
            active: true
        },
        include: {
            reports: true,
            visits: true
        }
    })

    if (!redirectUrl) {
        return notFound()
    }

    if (redirectUrl.usageLimit) {
      const totalVisits = (redirectUrl.usage) + (redirectUrl.visits?.length)
      if (totalVisits >= usageLimit) {
        return notFound()
      }
    }

    if (redirectUrl.expiresAt) {
      const isExpired = (new Date(redirectUrl.expiresAt)) <= currentDate

      if (isExpired) {
        return notFound()
      }
    }

    const reports = redirectUrl.reports

    // Create history if user is logged in
    if (session) {

      await db.shortLinkHistory.create({
        data: {
          userId: session.user.id,
          linkSlug: slug
        }

      })

    } else {

      let uptadedUsage = redirectUrl.usage + 1
      await db.shortLinks.update({
          where: {
              slug
          },
          data: {
              usage: usageA
          }
      })
    }

    // Redirect user to link
    if (reports.length) {
      return (
        <UrlReportedContainer url={redirectUrl.link} />
      )
    } else {
      return redirect(redirectUrl.link)
    }
}

export default RedirectPage
