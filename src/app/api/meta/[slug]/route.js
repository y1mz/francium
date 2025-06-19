import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { logger } from "@/lib/logger"

export async function GET(req, { params }) {
    const uuid = (await params).slug
    const session = await ServerSession()
    const localUUID = req.headers.get("x-client-id")

    if (!uuid) {
        return new NextResponse("UUID can't be empty", { status: 400 })
    }

    try {
        const server = await db.shortLinks.findUnique({
            where: {
                slug: uuid
            }
        })

        if (!server) {
            return new NextResponse("Such link doesn't exists", { status: 404 })
        }

        return NextResponse.json(server)
    } catch (e) {
        const SessionUser = session?.user ? session.user.id : "Unauthorized"

        await logger("ERROR", "[SHORT_ROUTE_CHECK]", e.message, (new Date()), SessionUser, localUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}