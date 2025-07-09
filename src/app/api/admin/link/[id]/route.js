import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { auditLogger } from "@/lib/auditLogger"

export async function PATCH(req, { params }) {
    const session = await ServerSession()
    const linkId = Number(params.id)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { slug, authorId, clientId, reason } = await req.json()
        const slugR = slug.split("/").slice(3,4)[0]

        // Get user details
        const linkDetails = await db.shortLinks.findUnique({
            where: {
                id: linkId,
                slug: slugR
            }
        })

        // Delete the Shortened URL
        await db.shortLinks.delete({
          where: {
              id: linkId,
              slug: slugR,
              creatorId: authorId,
              nonAuthId: clientId
          }
        })

        // Create a warning for user
        await db.userBans.create({
          data: {
            userId: linkDetails.creatorId,
            ModeratorId: session.user.id,
            type: "WARNING",
            reason: reason,
            isActive: false
          }
        })

        // Log action
        await auditLogger("[URL_REMOVAL]", `URL With slug: ${slugR} has been removed by ModeratorId: ${session.user.id}`,
          (new Date().toDateString()), session.user.id)

        return NextResponse.json({
          status: "OK"
        })
    } catch (e) {
        console.log(e)
        return new NextResponse("Internal server error", { status: 500 })
    }
}
