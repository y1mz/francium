import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { logger } from "@/lib/logger"

export async function DELETE(req) {
  const session = await ServerSession()
  const localUUID = req.headers.get("x-client-id")

  try {
    const { slug } = await req.json()
    const { id } = await params

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }
    if (!localUUID) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 })
    }

    const toBeDeleted = await db.linkCollections.findUnique({
      where: {
        id: id,
        publicSlug: slug,
        creatorId: session.user.id
      }
    })

    if (!toBeDeleted) {
      return new NextResponse(`Collection with id: ${id} doesn't exist.`, { status: 404 })
    } else {
      await db.linkCollections.delete({
        where: toBeDeleted
      })
      return new NextResponse("OK", { status: 200 })
    }

  } catch (e) {
    await logger("ERROR", "[COLLECTION_DELETE_API]", e.message, (new Date()), session.user.id, localUUID)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
