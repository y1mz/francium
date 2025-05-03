import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function PATCH(req) {
    const session = await ServerSession()
    const clientId = req.headers.get("x-client-id")
    try {
        const { name, email } = await req.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!name && !email) {
            return new NextResponse("Username and email is required", { status: 401 })
        }

        const emailCheck = await db.user.findFirst({
            where: {
                email: email
            }
        })

        const usernameCheck = await db.user.findFirst({
            where: {
                name: name
            }
        })

        if (usernameCheck) {
            if (usernameCheck.name !== session.user.name) {
                return new NextResponse("Credentials already used", { status: 401 })
            }
        }

        const server = await db.user.update({
            where: {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name
            },
            data: {
                name: name,
            }
        })
        return NextResponse.json(server)
    } catch (e) {
        await logger("ERROR", "[USER_PROFILE_UPDATE]", e.message, (new Date()), session.user.id, clientId)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}