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

        const emailCheck = await db.user.findFirst({
            where: {
                email: email
            }
        })

        const usernameCheck = await db.user.findUnique({
            where: {
                name: username
            }
        })

        if (emailCheck) {
            if (emailCheck.email !== session.user.email) {
                return new NextResponse("Credentials already used", { status: 401 })
            }
        }
        console.log("profile check")
        if (usernameCheck) {
            if (usernameCheck.name !== session.user.name) {
                return new NextResponse("Credentials already used", { status: 401 })
            }
        }
        console.log("profile check")

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