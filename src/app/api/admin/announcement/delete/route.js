import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { ServerSession } from "@/lib/server-session"

export async function DELETE(req) {
    const session = await ServerSession()

    if (!session || session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    try {
        const { id } = await req.json()

        if (!id) {
            return new NextResponse("id can't be null", { status: 401 })
        }

        const server = await db.announcements.delete({
            where: {
                id: id,
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_DELETE_ANNOUNCEMENT][ERROR]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}