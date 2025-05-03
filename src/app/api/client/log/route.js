import { logger } from "@/lib/logger"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function POST(req) {
    const data = await req.json()
    const logKey = req.headers.get("x-log-key")

    const apiKey = process.env.LOGGING_KEY
    const session = await ServerSession()

    // Reject the request if the api key is different.
    if (!logKey || (logKey !== apiKey)) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Reject the request if it's reporting for a different user
    if (data.userId && (data.userId !== session.user.id)) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    // Reject the request if data is blank
    if (!data) {
        return new NextResponse("Rejecting blank request", { status: 400 })
    }

    try {
        // Log errors
        await logger(data)

        return new NextResponse("OK", { status: 200 })
    } catch (e) {
        console.log(`[${new Date().toDateString()}][ERROR][ERROR_LOGGER]`, e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}