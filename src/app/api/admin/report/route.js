import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req) {

}

export async function DELETE(req) {
    const session = await ServerSession()

    if (!session) {
        return new NextResponse("Unauthorized", { status: 400 })
    }

    try {
        const { id, slug } = await req.json()
        const server = await db.linkReports.update({
            where: {
                id: id,
                reportUrlSlug: slug
            }, 
            data: {
                reportProcessed: true
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log("[ADMIN_DELETE_REPORT][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}