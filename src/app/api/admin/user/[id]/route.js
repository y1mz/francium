import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { auditLogger } from "@/lib/auditLogger"
import { logger } from "@/lib/logger"
import { headers } from "next/headers"

export async function PATCH(req, { params }) {
    const { id } = await params
    const userId = id
    const session = await ServerSession()
    const hed = await headers()

    const clientId = hed.get("x-client-id")

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.role === "USER") {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!clientId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { usename, mail, reason, type, banDate } = await req.json()

        const user = await db.user.findUnique({
            where: {
                id: userId,
                name: usename,
                email: mail
            },
            include: {
                bans: true
            }
        })

        if (!user) {
            await logger("ERROR", "[ADMIN_USER_BAN]", `[ERROR] User with id: ${userId} doesn't exists`, session.user?.id, clientId)
            return new NextResponse("User not found", { status: 404 })
        }

        const server = await db.userBans.create({
            data: {
              userId: user.id,
              ModeratorId: session.user.id,
              type: type,
              reason: reason,
              bannedUntil: banDate
            }
        })

        auditLogger("[USER_BAN]", `User ${user.name} has been banned by ModeratorId: ${session.user.id} for reason of ${reason}`,
          (new Date().toDateString()), session.user.id)

        return NextResponse.json({
          status: "OK"
        })

    } catch (e) {
        console.log("[ADMIN_USER_BAN][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
