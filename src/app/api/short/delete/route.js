import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"

export async function DELETE(req) {
    const session = await ServerSession()

    try {
        const { id, slug, createdAt } = await req.json()

        if(!session) {
            return new NextResponse("Unauthorized", { status: 400 })
        }

        const server = await db.shortLinks.delete({
            where: {
                id,
                slug,
                createdAt,
                creatorId: session.user.id
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log(e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}