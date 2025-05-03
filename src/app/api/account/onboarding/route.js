import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { logger } from "@/lib/logger"

export async function PATCH(req) {
  const session = await ServerSession()

  const clientId = req.headers.get("x-client-id")

  if (!session) {
      return new NextResponse("Unauthorized", { status: 400 })
  }

  try {
    const { id, newUsername } = await req.json()

    if (id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 400 })
    }

    if (newUsername.includes(" ")) {
      throw new Error("Username can't include spaces.")
    }

    const server = await db.user.update({
      where: {
        id: id
      },
      data: {
        name: newUsername,
        prefs: {
          update: {
            where: {
              userId: id
            },
            data: {
              isOnboardingComplete: true
            }
          }
        }
      },
      include: {
        prefs: true
      }
    })

    return NextResponse.json(server)

  } catch (e) {
    await logger("ERROR", "[ONBOARDING_USERNAME_UPDATE]", e.message, (new Date()), session.user.id, clientId)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
