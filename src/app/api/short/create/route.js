import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { CheckUrl } from "@/lib/checkUrl"
import { getWebsiteMetadata } from "@/lib/getWebsiteMetadata"
import { logger } from "@/lib/logger"

export async function POST(request){
    const session = await ServerSession()
    const localUUID = request.headers.get("x-client-id")

    try {
        const { link } = await request.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }

        let user = await db.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                links: true,
            }
        })

        const userBans = await db.userBans.findMany({
            where: {
                userId: user.id,
                isActive: true
            }
        })

        if (userBans.length > 0) {
            return new NextResponse("You got banned", { status: 401 })
        }

        // Run filter before going further
        const filterStatus = CheckUrl(link.split("/").slice(2,3)[0])
        if (filterStatus === 1) {
            await logger("WARNING", `[CREATE_SHORT_URL]`, `UserId: (${user.id}) tried to short a banned URL: (${link})`,
                (new Date()), session.user.id, localUUID)
            return new NextResponse("Tried to short a banned Url", { status: 402 })
        }

        // Prevent user from dossing
        let lastShort = user.links?.reverse()[0]
        const postDifference = (new Date() - lastShort?.createdAt) / 1000

        if (postDifference < 10.0) {
            await logger("WARNING", "[CREATE_SHORT_URL]", `Userid: (${user.id}) acted so quickly.`, (new Date()), user.id, localUUID)
            return new NextResponse("Please try again 5 seconds later.", { status: 401 })
        }

        // Database task
        let UUID, expDate
        UUID = generateUUID(5)

        // Create new UUID if the current one already exists
        let existingUUID = await db.shortLinks.findUnique({
            where: {
                slug: UUID
            }
        })
        if (existingUUID) {
            await logger("WARNING", "[CREATE_SHORT_URL]", `UUID: (${UUID}) already exists, creating new UUID.`, (new Date()), session.user.id, localUUID)
            UUID = generateUUID(5)
        }

        // Fetch the metadata of url
        let webMetadata = await getWebsiteMetadata(link)

        expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))

        const server = async () => {
            await db.shortLinks.create({
                data: {
                    name: webMetadata.title,
                    slug: UUID,
                    link: link,
                    metaName: webMetadata?.ogTitle,
                    metaDesc: webMetadata?.ogDescription,
                    metaIconUrl: webMetadata?.icon,
                    metaImageUrl: webMetadata?.ogImage,
                    expiresAt: expDate,
                    creatorId: user?.id
                }
            })
            const srv = await db.shortLinks.findUnique({
                where: {
                    slug: UUID,
                    link: link
                }
            })
            return srv
        }

        // Return the database response
        const serResult  = await server()
        const response = {
            url: `/${serResult.slug}`,
            fullUrl: serResult.link,
            title: serResult.name,
            desc: serResult.metaDesc,
            img: serResult.metaImageUrl,
        }
        return NextResponse.json(response)

    } catch (e) {
        await logger("ERROR", "[CREATE_SHORT_URL]", e.message, (new Date()), session.user.id, localUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}