import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"

export async function PATCH(req) {
  const session = await ServerSession()
  if (!session) {
      return new NextResponse("Unauthorized", { status: 400 })
  }

  try {
    const { id, newUsername } = await req.json()

    if (id !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 400 })
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
    console.log("[USERNAME_UPDATE]", e.message)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
