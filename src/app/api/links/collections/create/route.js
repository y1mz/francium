import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { logger } from "@/lib/logger"

export async function POST(req) {
  const session = await ServerSession()
  const localUUID = req.headers.get("x-client-id")

  try {
    const { name, description, emoji, isPublic } = await req.json()

    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
        email: session.user.email
      }
    })

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 })
    }

    let UUID
    UUID = generateUUID(6, true)

    const isExsistingDatabase = await db.linkCollections.findUnique({
      where: {
        publicSlug: UUID
      }
    })

    if (isExsistingDatabase) {
      await logger("WARNING", "[CREATE_COLLECTION]", `Slug: (${UUID}) already in use. Creating new one.`, (new Date()), session.user.id, localUUID)
      UUID = generateUUID(6, true)
    }

    const server = await db.linkCollections.create({
      data: {
        name: name,
        description: description,
        emoIcon: emoji,
        isPublic: isPublic,
        publicSlug: UUID,
        creatorId: session.user.id
      }
    })

    return NextResponse.json(server)

  } catch (e) {
      await logger("ERROR", "[CREATE_COLLECTION]", e.message, (new Date()), session.user.id, localUUID)
      return new NextResponse("Internal Server Error", { status: 500 })
  }
}
