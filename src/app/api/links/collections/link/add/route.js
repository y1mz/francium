import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function POST(req) {
    const session = await ServerSession()
    const localUUID = req.headers.get("x-client-id")

    try {
        const { collectionId, linkId } = await req.json()

   if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!localUUID) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 })
    }

    const linkDetails = await db.shortLinks.findUnique({
        where: {
            id: linkId,
           creatorId: session.user.id
        }
    })

    if (!linkDetails) {
        return new NextResponse("Short Url doesn't exists", { status : 404 })
    }

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
        return new NextResponse("Collection doesn't exists", { status : 404 })
    }

    // Check if link is already in the collection
    const isLinkIn = collectionDetails.links.some((link) => link.id === linkDetails.id)

    if (isLinkIn) {
        return new NextResponse("OK", { status: 201 })
    } else {
        const server = await db.linkCollections.update({
            where: {
                id: collectionDetails.id,
                name: collectionDetails.name,
                creatorId: collectionDetails.creatorId
            },
            data: {
                links: {
                    connect: linkDetails
                }
            },
            include: {
                links: true
            }
        })

        return NextResponse.json(server)
    }

    } catch (e) {
        await logger("ERROR", "[COLLECTION_CREATE_API]", e.message, (new Date()), session.user.id, localUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}