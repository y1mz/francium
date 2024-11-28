import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { CheckUrl } from "@/lib/checkUrl"
import { getWebsiteMetadata } from "@/lib/getWebsiteMetadata"
import { headers } from "next/headers"

export async function POST(request) {
    const session = await ServerSession()

    if (session) {
        return new NextResponse("Wrong API endpoint, please try again on '/api/create' endpoint.", { status: 400 })
    }

    try {
        const { link } = await request.json()
        const headersList = await headers()
        const nonLoginMemberUUID = headersList.get("nonLoginUUID")

        if (!nonLoginMemberUUID) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }

        let nonLoginMemberLinks = await db.shortLinks.findMany({
            where: {
                nonAuthId: nonLoginMemberUUID
            }
        })

        if (nonLoginMemberLinks.length >= 10) {
            return new NextResponse("Link limit has reached, please log-in to continue.", { status: 401 })
        }

        // Run filter before going further
        const filterStatus = CheckUrl(link.split("/").slice(2,3)[0])
        if (filterStatus === 1) {
            console.log(`[SHORT_ROUTE_NOLOGIN][WARN] UserId: ${nonLoginMemberUUID} tried to short a banned url: ${link}`)
            return new NextResponse("Tried to short a banned Url", { status: 402 })
        }

        let UUID, expDate

        UUID = generateUUID(5)
        let existingUUID = await db.shortLinks.findUnique({
            where: {
                slug: UUID
            }
        })
        if (existingUUID) {
            console.log(`[SHORT_ROUTE_NOLOGIN][WARN] UUID (${UUID}) already exists, creating new UUID`)
            UUID = generateUUID(5)
        }

        expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

        let webMetadata = await getWebsiteMetadata(link)

        const server = await db.shortLinks.create({
            data: {
                name: webMetadata.title,
                slug: UUID,
                link: link,
                metaName: webMetadata?.ogTitle,
                metaDesc: webMetadata?.ogDescription,
                metaIconUrl: webMetadata?.icon,
                metaImageUrl: webMetadata?.ogImage,
                expiresAt: expDate,
                nonAuthId: nonLoginMemberUUID
            }
        })

        return NextResponse.json({
            url: `/${server.slug}`,
            fullUrl: server.link,
            title: server.name,
            desc: server.metaDesc,
            img: server.metaImageUrl
        })

    } catch (e) {
        console.log("[SHORT_ROUTE_NOLOGIN][ERROR]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}