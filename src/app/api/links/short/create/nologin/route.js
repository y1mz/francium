import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { CheckUrl } from "@/lib/checkUrl"
import { getWebsiteMetadata } from "@/lib/getWebsiteMetadata"
import { logger } from "@/lib/logger";

export async function POST(request) {
    const nonLoginMemberUUID = request.headers.get("nonLoginUUID")

    if (!nonLoginMemberUUID) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { link } = await request.json()

        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }

        let nonLoginMemberLinks = await db.shortLinks.findMany({
            where: {
                nonAuthId: nonLoginMemberUUID
            }
        })

        if (nonLoginMemberLinks.length >= 10) {
            return new NextResponse("Link limit has reached, please log-in to continue.", { status: 403 })
        }

        // Run filter before going further
        const filterStatus = CheckUrl(link.split("/").slice(2,3)[0])
        if (filterStatus === 1) {

            await logger("WARNING", "[CREATE_SHORT_URL_NON_LOGIN]", `UserId: (${nonLoginMemberUUID}) tried to short a banned URL: (${link})`,
                (new Date()), "Unauthorized", nonLoginMemberUUID)
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

            await logger("WARNING", "[CREATE_SHORT_URL_NON_LOGIN]", `UUID: (${UUID}) already exists, creating new UUID.`,
                (new Date()), "Unauthorized", nonLoginMemberUUID)
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
        await logger("ERROR", "[CREATE_SHORT_URL_NON_LOGIN]", e.message, (new Date()), "Unauthorized", nonLoginMemberUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}