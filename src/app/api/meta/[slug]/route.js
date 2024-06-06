import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req, { params }) {
    const uuid = params.slug

    if (!uuid) {
        return new NextResponse("UUID can't be empty", { status: 400 })
    }

    try {
        const server = await db.shortLinks.findUnique({
            where: {
                slug: uuid
            }
        })

        if (!server) {
            return new NextResponse("Such link doesn't exists", { status: 404 })
        }

        const response = {
            title: server.metaName,
            desc: server.metaDesc,
            url: server.link,
            img: server.metaImageUrl,
            icon: server.metaIconUrl
        }

        return NextResponse.json(response)
    } catch (e) {
        console.log("[SHORT_ROUTE_GET][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}