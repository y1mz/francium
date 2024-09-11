import { db } from "@/lib/db.js"
import { ServerSession } from "@/lib/server-session.js"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { email } = await req.json()
    const session = await ServerSession()

    if (!session) {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    const server = await db.user.findUnique({
        where: {
            email: email
        }
    })

    if (server) {
        return new NextResponse("Email Exists", { status: 401 })
    } else {
        return new NextResponse("Email avaliable", { status: 200 })
    }
}