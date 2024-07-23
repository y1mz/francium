import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req, { params }) {
    const session = await ServerSession()
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    } else if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { email, role } = await req.json()
        const id = params.id

        const roles = ["ADMIN", "MOD", "USER"]
        if (roles.indexOf(role) === -1) {
            return new NextResponse("Internal Server Error", { status: 500 })
        }

        const user = await db.user.findUnique({
            where: {
                id,
                email
            },
        })

        if (!user) {
            return new NextResponse("User not found", { status: 404 })
        }
        if (role === user.role) {
            return new NextResponse("", { status: 200 })
        }

        const server = await db.user.update({
            where: {
                id,
                email
            },
            data: {
                role: role
            }
        })
        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_UPDATE_ROLE][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}