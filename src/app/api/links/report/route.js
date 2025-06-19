import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function POST(req) {
    const session = await ServerSession()
    let nonMUUID

    if (!session) {
        nonMUUID = headers().get("localUuid")
        if (!nonMUUID) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
    }

    try {
        const { url, reason } = await req.json()
        const slug = url.split("/").slice(3,4)[0]

        const server = await db.linkReports.create({
            data: {
                userId: session.user?.id,
                nonMemberUUID: nonMUUID,
                reportUrlSlug: slug,
                reportDesc: reason
            }
        })
        if (!server) {
            return new NextResponse("Short Url not found", { status: 404 })
        }

        return NextResponse.json(server)
    } catch (e) {
        const sessionUseId = session?.user ? session.user.id : "Unauthorized"

        await logger("ERROR", "[URL_REPORTER]", e.message, (new Date()), sessionUseId, nonMUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}