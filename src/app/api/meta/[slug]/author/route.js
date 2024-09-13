import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { slug } = params

    try {
        const server = await db.shortLinks.findUnique({
            where: {
                slug: slug,
                isAuthorPublic: true
            },
            include: {
                creator: true
            }
        })

        if (!server) {
            return new NextResponse("Such link doesn't exists", { status: 404 })
        }

        return NextResponse.json({
            username: server.creator.name,
            avatar: server.creator.image
        })
    } catch (e) {
        console.log("[SHORT_ROUTE_GET][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}