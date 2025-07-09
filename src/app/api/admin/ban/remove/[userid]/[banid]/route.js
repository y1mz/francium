import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { auditLogger } from "@/lib/auditLogger"
import { logger } from "@/lib/logger"
import { headers } from "next/headers"

export async function DELETE(req, { params }) {
    const { userid, banid } = await params

    const hed = await headers()
    const clientId = hed.get("x-client-id")

    const session = await ServerSession()

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!clientId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        if (session.user.role === "USER") {
            await logger("ERROR", "[ADMIN_BAN_REMOVAL]", `User with id: ${session?.user.id} tried to access to forbidden API.`, 
                (new Date().toDateString()), session?.user.id, clientId)
            return new NextResponse("Unauthorized", { status: 400 })
        }

        // Fetch user details
        const user = await db.user.findUnique({
            where: {
                id: userid
            }
        })

        const ban = await db.userBans.findFirst({
            where: {
                user: user,
                id: parseInt(banid),
                isActive: true
            },
            include: {
                user: true
            }
        })

        if (!ban) {
            return new NextResponse("Such ban does not exists", { status: 404 })
        }

        const server = await db.userBans.update({
            where: {
                userId: user.id,
                id: ban.id,
                isActive: true
            },
            data: {
                isActive: false
            }
        })

        await auditLogger("[USER_BAN_REMOVAL]", `The banned user with id: ${user.id}, has been unbanned by moderator with id: ${session?.user.id}`, (new Date().toDateString()), session?.user.id)
        return NextResponse.json(server)

    } catch (e) {
        await logger("ERROR", "[ADMIN_BAN_REMOVAL]", e.message, (new Date().toDateString()), session?.user.id, clientId)
        return new NextResponse("Internal Server Error", { status: 500 })
    }

}