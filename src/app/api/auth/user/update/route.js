import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req) {
    const session = await ServerSession()
    try {
        const { username, email } = await req.json()

        if (!session) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        if (!username && !email) {
            return new NextResponse("Username and email is required", { status: 401 })
        }

        const server = await db.user.update({
            where: {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name
            },
            data: {
                name: username,
                email: email
            }
        })
        return NextResponse.json(server)
    } catch (e) {
        console.log("[USER_UPDATE]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}