import { db } from '@/lib/db'
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"
import conf from "/config/siteconfig.json"

import AboutHeader from "@/components/about/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateMetadata({ params, searchParams }) {
    const slug = params.slug
    const webUrl = process.env.NODE_ENV === 'production'
        ? `${conf.SiteUrl}`
        : 'http://localhost:3000/'

    const metadata = await fetch(`${webUrl}/api/meta/${slug}`).then(res => res.json())
    return {
        title: metadata.title,
        description: metadata.desc,
        openGraph: {
            url: metadata.url,
            type: 'website',
            images: [
                {
                    url: metadata.img,
                    width: 800,
                    height: 600,
                    alt: `Preview for ${metadata.title}`,
                }
            ]
        },
        icons: {
          icon: [
              { url: metadata.icon },
          ]
        },
        robots: {
            index: false,
            follow: true,
            nocache: true
        }
    }
}

async function RedirectPage({ params }) {
    const slug = params.slug
    const currentDate = new Date()

    const redirectUrl = await db.shortLinks.findUnique({
        where: {
            slug
        },
    })

    if (!redirectUrl) {
        return notFound()
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
            <div className="container mx-auto">
                <AboutHeader title={"Url has expired"} />
                <div className="w-full flex items-center justify-center py-16">
                    <Button variant={"outline"} asChild className="w-full max-w-md">
                        <Link href={"/"}>Return homepage</Link>
                    </Button>
                </div>
            </div>
        )
    }
}

export default RedirectPage