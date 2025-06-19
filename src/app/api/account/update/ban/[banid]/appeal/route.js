import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function POST(req, { params }) {
    const { banid } = await params
    const session = await ServerSession()
    const localUUID = req.headers.get("x-client-id")

    if (!session || !localUUID) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()

        if (session.user.id !== body.userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const currentBan = await db.userBans.findUnique({
            where: {
                id: parseInt(banid),
                userId: session.user.id,
                isActive: true,
                isAppeal: false
            }
        })

        if (!currentBan) {
            return new NextResponse("Not found", { status: 404 })
        }

        await db.userBans.update({
            where: {
                id: currentBan.id,
                userId: session.user.id,
            },
            data: {
                isAppeal: true,
                appealDate: new Date(),
                appealContent: body.appealContent
            }
        })

        return new NextResponse("OK", { status: 200 })
    } catch (e) {
        await logger("ERROR", "[USER_BAN_APPEAL]", e.message, (new Date()), session.user.id, localUUID)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}