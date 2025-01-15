import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
    try {
        const currentDate = new Date().toISOString()

        const server = await db.announcements.findFirst({
            where: {
               expiresAt: {
                   gt: currentDate
               },
                isActive: true,
            }
        })

        if (!server) {
            return new NextResponse("Nothing", { status: 202 })
        } else {
            return NextResponse.json(server)
        }
    } catch (e) {
        console.log("[ANNOUNCEMENT_FETCH]", e.message)
    }
}