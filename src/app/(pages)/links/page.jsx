import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import LinksContainer from "@/components/body/containers/links-container"

async function MyLinksPage({ searchParams }) {
    // Get user session and redirect to "/" if no session present.
    const session = await ServerSession()
    if (!session) {
        return redirect("/")
    }

    // Fetch user Content and sort it based on their date
    const userContent = await db.user.findUnique({
        where: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email
        },
        include: {
            links: true
        },
    })
    const links = userContent.links
    const shortedLinks = links.sort((a, b) => {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)

        return dateB.getTime() - dateA.getTime()
    })

    // Pagination
    const { p }  = await searchParams

    return (
        <LinksContainer links={shortedLinks} p={p} />
    )
}

export default MyLinksPage