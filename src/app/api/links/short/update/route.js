import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"

export async function PATCH(req) {
    const session = await ServerSession()

    try {
        const { id, slug, createdAt, name, newTitle } = await req.json()

        if(!session) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        if (!newTitle) {
            return new NextResponse("OK", { status: 200 })
        }

        const currentUrl = await db.shortLinks.findUnique({
            where: {
                id,
                slug,
                name,
                createdAt,
                creatorId: session.user?.id
            }
        })

        if (!currentUrl) {
            return new NextResponse("Url Not Found", { status: 404 })
        }

        const server = await db.shortLinks.update({
            where: {
                id,
                slug,
                name,
                createdAt,
                creatorId: session.user?.id
            },
            data: {
                name: newTitle
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("[UPDATE_LINK_NAME][ERROR]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}