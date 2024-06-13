import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import AboutHeader from "@/components/about/header"
import LinkBox from "@/components/shorter/link-box"

async function MyLinksPage() {
    const session = await ServerSession()
    if (!session) {
        return redirect("/")
    }

    const userContent = await db.user.findUnique({
        where: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email
        },
        include: {
            links: true
        }
    })
    const links = userContent.links

    return (
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-20">
            <AboutHeader title="My Links" />
            <div className="flex flex-col gap-2 py-5">
                <h2 className="text-2xl font-bold py-2">Links you've shorted</h2>
                {links.length === 0 ?
                    (
                        <p className="w-full text-center">There is nothing here.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {links.map((link) => (
                                <LinkBox
                                    key={link.id}
                                    LinkId={link.id}
                                    title={link.name}
                                    url={link.link}
                                    shortUrl={link.slug}
                                    cDate={link.createdAt}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MyLinksPage