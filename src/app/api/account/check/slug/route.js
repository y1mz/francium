import { db } from "@/lib/db.js"
import { ServerSession } from "@/lib/server-session.js"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { slug } = await req.json()
    const session = await ServerSession()

    if (!session) {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    const server = await db.shortLinks.findMany({
        where: {
            slug:slug
        }
    })

    if (server.filter((item) => item.slug === slug).length > 0) {
        return new NextResponse("NOT OK", { status: 201 })
    } else {
        return new NextResponse("OK", { status: 200 })
    }
}
