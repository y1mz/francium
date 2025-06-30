import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { auditLogger } from "@/lib/auditLogger"
import { logger } from "@/lib/logger"
import { headers } from "next/headers"

export async function PATCH(req, { params }) {
    const { userid } = await params

    const session = await ServerSession()
    const hed = await headers()

    const clientId = hed.get("x-client-id")

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    if (!clientId) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { usename, mail, reason, type, banDate } = await req.json()

        const user = await db.user.findUnique({
            where: {
                id: userid,
                name: usename,
                email: mail
            },
            include: {
                bans: true
            }
        })

        const activeBans = user.filter((user) => {
          const bans = user.bans

          const aBans = bans.filter((ban) => ban.isActive === true)
          return aBans.length <= 1
        })

        if (activeBans.length) {
          await db.userBans.updateMany({
            where: {
              isActive: true
            },
            data: {
              isActive: false
            }
          })
        }

        if (!user) {
            await logger("ERROR", "[ADMIN_BAN_CREATE]", `[ERROR] User with id: ${userid} doesn't exists`, session.user?.id, clientId)
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
        
        server
        
        return NextResponse.json({
          status: "OK"
        })

    } catch (e) {
        console.log("[ADMIN_BAN_CREATE][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
