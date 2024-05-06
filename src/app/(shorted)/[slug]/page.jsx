import { db } from '@/lib/db'
import { redirect } from "next/navigation"

async function RedirectPage({ params }) {
    const slug = params.slug
    const currentDate = new Date()

    const redirectUrl = await db.shortLinks.findUnique({
        where: {
            slug
        },
    })

    console.log(redirectUrl)

    if (!redirectUrl) {
        return (
            <div>
                <p>Url not found.</p>
            </div>
        )
    }

    if (redirectUrl && redirectUrl.expiresAt >= currentDate) {

        let usageA
        usageA = redirectUrl.usage + 1

        await db.shortLinks.update({
            where: {
                slug
            },
            data: {
                usage: usageA
            }
        })

        return redirect(redirectUrl.link)
    } else {
        return (
            <div>
                <p>URL has expired</p>
            </div>
        )
    }
}

export default RedirectPage