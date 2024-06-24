import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { NextResponse } from "next/server"
import { generateUUID } from "@/lib/generateUUID"
import { CheckUrl } from "@/lib/checkUrl"
import getMetaData from "metadata-scraper"

export async function POST(request){
    const session = await ServerSession()

    try {
        const body = await request.json()
        const { link } = body
        const contents = {
            title: body.title,
            custUrl: body.url,
            expDate: body.expDate,
        }

        if (!session) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!link) {
            return new NextResponse("link can't be empty", { status: 400 })
        }

        let user = await db.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                links: true
            }
        })
        if (!user) {
            throw new Error("User has a session but it doesn't exists. Giving up.")
        }

        // Run filter before going further
        const filterStatus = CheckUrl(link.split("/").slice(2,3)[0])
        if (filterStatus === 1) {
            console.log(`[WARN][SHORT_ROUTE] UserId: ${user.id} tried to short a banned url: ${link}`)
            return new NextResponse("Tried to short a banned Url", { status: 402 })
        }

        // Prevent user from dossing
        let lastShort = user.links?.reverse()[0]
        const postDifference = (new Date() - lastShort?.createdAt) / 1000

        if (postDifference < 5.0) {
            console.log(`[WARN][SHORT_ROUTE] User (${user?.name}) acted so quickly.`)
            return new NextResponse("Please try again 5 seconds later.", { status: 401 })
        }

        // Database task
        let UUID, expDate, UrlTitle, slug
        UUID = generateUUID(5)

        // Create new UUID if the current one already exists
        let existingUUID = await db.shortLinks.findUnique({
            where: {
                slug: UUID
            }
        })
        if (existingUUID) {
            console.log(`[WARN][SHORT_ROUTE] UUID (${UUID}) already exists, creating new UUID`)
            UUID = generateUUID(5)
        }

        // Fetch the metadata of url
        const webMetadata = await getMetaData(link)

        // Bunch of if else statements for custom urls
        if (contents.expDate) {
            expDate = contents.expDate
        } else {
            expDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        }

        if (contents.title) {
            UrlTitle = contents.title
        } else {
            UrlTitle = webMetadata.title
        }

        if (contents.custUrl) {
            const uLength = contents.custUrl?.length
            // Return 401 if custom url is too long
            if (uLength > 10) {
                console.log(`[SHORT_ROUTE][CURRENT URL][ERROR] Custom url (${contents.custUrl}) is too long. It needs to be shorter than 10 characters.`)
                return new NextResponse("Custom url is too long. It needs to be shorter than 10 characters.", { status: 401 })
            }

            slug = contents.custUrl
        } else {
            slug = UUID
        }

        const server = async () => {
            await db.shortLinks.create({
                data: {
                    name: UrlTitle,
                    slug: slug,
                    link: link,
                    metaName: webMetadata.title,
                    metaDesc: webMetadata.description,
                    metaIconUrl: webMetadata.icon,
                    metaImageUrl: webMetadata.image,
                    expiresAt: expDate,
                    creatorId: user?.id
                }
            })
            const srv = await db.shortLinks.findUnique({
                where: {
                    slug: UUID,
                    link: link
                }
            })
            return srv
        }

        // Return the database response
        const serResult  = await server()
        const response = {
            url: `/${serResult.slug}`,
            fullUrl: serResult.link,
            title: serResult.name,
            desc: serResult.metaDesc,
            img: serResult.metaImageUrl,
        }
        return NextResponse.json(response)

    } catch (e) {
        console.log("[SHORT_ROUTE][ERROR]", e)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}