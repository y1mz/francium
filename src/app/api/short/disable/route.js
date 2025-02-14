import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req) {
    const session = await ServerSession()

    if(!session) {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    try {
        const { id, slug, createdAt } = await req.json()

        const server = await db.shortLinks.update({
            where: {
                id: id,
                slug: slug,
                createdAt: createdAt
            },
            data: {
                active: false,
                disabledBy: session.user.id,
                disabledReason: "Disabled by owner.",
                disabledAt: new Date().toISOString()
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("[LINK_DISABLE][ERROR]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}