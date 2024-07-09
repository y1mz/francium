import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"

export async function PATCH(req, { params }) {
    const session = await ServerSession()
    const linkId = Number(params.id)

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    console.log(session)
    try {
        const { slug, reason } = await req.json()
        const slugR = slug.split("/").slice(3,4)[0]
        
        const server = await db.shortLinks.update({
            where: {
                id: linkId,
                slug: slugR
            },
            data: {
                active: false,
                disabledBy: session.user.id,
                disabledReason: reason,
                disabledAt: new Date()
            }
        })
        console.log(server)

        return NextResponse.json(server)
    } catch (e) {
        console.log(e)
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