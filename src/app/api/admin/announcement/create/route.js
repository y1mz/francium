import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { ServerSession } from "@/lib/server-session"

export async function POST(req) {
    const session = await ServerSession()

    if (!session || session.user.role === "USER") {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    try {
        const { title, description, url, expDate } = await req.json()
        console.log(title, description, expDate)

        await db.announcements.updateMany({
            where: {
                isActive: true
            },
            data: {
                isActive: false,
                expiresAt: new Date().toISOString()
            }
        })

        if ((new Date(expDate)) <= (new Date())) {
            return new NextResponse("Invalid date", { status: 401 })
        }

        const expDateISO = new Date(expDate).toISOString()

        const server2 = await db.announcements.create({
            data: {
                title: title,
                description: description,
                expiresAt: expDateISO,
                url: url,
                isActive: true
            }
        })
        console.log(server2)

        return NextResponse.json(server2)

    } catch (e) {
        console.log("[ADMIN_CREATE_ANNOUNCEMENT][ERROR]", e.message)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}