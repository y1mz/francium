import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { auditLogger } from "@/lib/auditLogger"
import { logger } from "@/lib/logger"
import { headers } from "next/headers"

export async function PATCH(req, { params }) {
    const { userid, banid } = await params

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
        const banIntId = parseInt(banid)
        const banDetails = await db.userBans.findUnique({
            where: {
                id: banIntId,
                userId: userid,
                isAppeal: true,
            },
            include: {
                user: true
            }
        })

        if (!banDetails) {
            await logger("ERROR", "[ADMIN_BAN_APPEAL]", `[ERROR] Ban with id: ${banid} doesn't exists`, session.user?.id, clientId)
            return new NextResponse("Specified ban is not found", { status: 404 })
        }
        const userDetails = banDetails.user

        const server = await db.userBans.update({
            where: {
                id: banDetails.id,
                userId: userDetails.id
            },
            data: {
                isAApproved: false
            }
        })
        
        auditLogger("[USER_BAN_APPEAL]", `User ${userDetails.name}'s appeal has been rejected by ModeratorId: ${session.user.id}`,
            (new Date().toDateString()), session.user.id)

        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_BAN_APPEAL][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    const { userid, banid } = await params

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

                const banIntId = parseInt(banid)
        const banDetails = await db.userBans.findUnique({
            where: {
                id: banIntId,
                userId: userid,
                isAppeal: true,
            },
            include: {
                user: true
            }
        })

        if (!banDetails) {
            await logger("ERROR", "[ADMIN_BAN_APPEAL]", `[ERROR] Ban with id: ${banid} doesn't exists`, session.user?.id, clientId)
            return new NextResponse("Specified ban is not found", { status: 404 })
        }
        const userDetails = banDetails.user

        const server = await db.userBans.update({
            where: {
                id: banDetails.id,
                userId: userDetails.id
            },
            data: {
                isAApproved: true,
                isActive: false,
                bannedUntil: new Date().toISOString()
            }
        })
        
        auditLogger("[USER_BAN_APPEAL]", `User ${userDetails.name}'s appeal has been accepted by ModeratorId: ${session.user.id}`,
            (new Date().toDateString()), session.user.id)

        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_BAN_APPEAL][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}