import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { getWebsiteMetadata } from "@/lib/getWebsiteMetadata"
import { CheckUrl } from "@/lib/checkUrl"
import { logger } from "@/lib/logger"

export async function POST(request){
    const session = await ServerSession()
    const localUUID = request.headers.get("x-client-id")

    try {

        const { link, keyword, usageLimit, CustomExpDate, collectionId } = await request.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }
        if (!localUUID) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        let user = await db.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                links: true
            }
        })
        if (!user) {
            throw new Error("User has a session but it doesn't exists. Giving up.")
        }

        // Run filter before going further
        const filterStatus = CheckUrl(link.split("/").slice(2,3)[0])
        if (filterStatus === 1) {
            console.log(`[WARN][SHORT_ROUTE] UserId: ${user.id} tried to short a banned url: ${link}`)
            return new NextResponse("Tried to short a banned Url", { status: 402 })
        }

        let webMetadata = await getWebsiteMetadata(link)

        // Database task
        let UUID, expDate, slug
        if (!keyword) {
            UUID = generateUUID(5)
        } else {
            UUID = keyword
        }

        // Create new UUID if the current one already exists
        let existingUUID = await db.shortLinks.findUnique({
            where: {
                slug: UUID
            }
        })
        if (existingUUID) {
            console.log(`[WARN][SHORT_ROUTE] UUID (${UUID}) already exists, creating new UUID`)
            UUID = generateUUID(5)
        }

        expDate = CustomExpDate.length > 0 ? (new Date(new Date().setMonth(new Date().getMonth() + parseInt(CustomExpDate)))) : null
        let uusage = usageLimit.length > 0 ? parseInt(usageLimit) : null


        const server = async () => {
            const createAction = await db.shortLinks.create({
                data: {
                    name: webMetadata.title,
                    slug: UUID,
                    link: link,
                    metaName: webMetadata.title,
                    metaDesc: webMetadata.description,
                    metaIconUrl: webMetadata.icon,
                    metaImageUrl: webMetadata.image,
                    expiresAt: expDate,
                    usageLimit: uusage,
                    creatorId: user?.id
                }
            })
            return createAction
        }

        // Return the database response
        const serResult  = await server()

        let response = {
            url: `/${serResult.slug}`,
            fullUrl: serResult.link,
            title: serResult.name,
            desc: serResult.metaDesc,
            img: serResult.metaImageUrl,
            metaName: serResult.metaName
        }

        // Add link to a collection if it's creted inside a collection
        if (collectionId) {
            const collectionDetails = await db.linkCollections.findUnique({
                where: {
                    id: collectionId,
                    creatorId: session.user.id
                },
                include: {
                    links: true
                }
            })

            if (!collectionDetails) {
                return NextResponse.json(response)
            } else {
                await db.linkCollections.update({
                    where: {
                        id: collectionDetails.id,
                        name: collectionDetails.name,
                        creatorId: collectionDetails.creatorId
                    },
                    data: {
                        links: {
                            connect: serResult
                        }, 
                    },
                    include: {
                        links: true
                    }
                })
            }
        }

        return NextResponse.json(response)

    } catch (e) {
        await logger("ERROR", "[CREATE_CUSTOM_SHORT_URL]", e.message, (new Date()), session.user.id, localUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}