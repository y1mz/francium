import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req, { params }) {
    const userId = params.id
    const session = await ServerSession()
    
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        if (session.user.role === "USER") {
            console.log(`[ADMIN_USER_BAN][ERROR] Unauthorized user (id: ${session.user?.id}) tried to access Admin route`)
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { usename, mail, reason, banDate } = await req.json()

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
            console.log(`[ADMIN_USER_BAN][ERROR] User with id: ${userId} doesn't exists`)
            return new NextResponse("User not found", { status: 404 })
        }
        if (user.bans.length > 0) {
            return new NextResponse("User already banned", { status: 200 })
        }

        const server = await db.userBans.create({
            data: {
                userId: user.id,
                adminUserId: session.user?.id,
                reason: reason,
                type: "",
                bannedUntil: new Date(banDate)
            }
        })
        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_USER_BAN][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}