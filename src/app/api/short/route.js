import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import getMetaData from "metadata-scraper"

export async function POST(request){
    const session = await ServerSession()
    try {
        const body = await request.json()
        const { link } = body

        console.log(body)

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }

        const user = await db.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if (!user) {
            throw new Error("User has a session but it doesn't exists. Giving up.")
        }

        console.log(user)

        const webMetadata = await getMetaData(link)
        const UUID = generateUUID(5)

        // Database task
        const defExpDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        const server = async () => {
            await db.shortLinks.create({
                data: {
                    name: webMetadata.title,
                    slug: UUID,
                    link: link,
                    metaName: webMetadata.title,
                    metaDesc: webMetadata.description,
                    metaIconUrl: webMetadata.icon,
                    metaImageUrl: webMetadata.image,
                    expiresAt: defExpDate,
                    creatorId: user.id
                }
            })
            const server = await db.shortLinks.findUnique({
                where: {
                    slug: UUID,
                    link: link
                }
            })
            return server
        }
        const serResult  = await server()
        console.log(serResult)
        const response = {
            url: `/${serResult.slug}`,
            title: serResult.name
        }
        console.log(response)

        return NextResponse.json(response)

    } catch (e) {
        console.log("[SHORT_ROUTE]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}