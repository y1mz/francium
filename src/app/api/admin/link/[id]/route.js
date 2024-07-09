import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"

export async function PATCH(req, { params }) {
    const session = await ServerSession()
    const linkId = params.id

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { slug, reason } = await req.json()

        const server = db.shortLinks.update({
            where: {
                id: linkId,
                slug: slug
            },
            data: {
                active: false,
                disabledBy: session.user.id,
                disabledReason: reason,
                disabledAt: new Date()
            }
        })

        return NextResponse.json(server)
    } catch (e) {
        console.log()
        return new NextResponse("Internal server error", { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    const session = await ServerSession()
    const linkId = params.id
    const linkIdInt = Number(linkId)

    if(!session) {
        return new NextResponse("Unauthorized", { status: 400 })
    }
    if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const { slug, createdAt } = await req.json()

        const server = await db.shortLinks.delete({
            where: {
                id: linkIdInt,
                slug,
                createdAt
            }
        })

        return NextResponse.json(server)
    } catch (e) {
        console.log(e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}