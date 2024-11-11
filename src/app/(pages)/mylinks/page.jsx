import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import AboutHeader from "@/components/about/header"
import LinkBox from "@/components/shorter/link-box"
import LinkNewBox from "@/components/shorter/link-new-box"
import { Separator } from "@/components/ui/separator"

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import {Button} from "@/components/ui/button"
import LinksSearchButton from "@/components/shorter/links-search"

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
    const url = "/mylinks"
    if (!p) {
        return redirect(url + "?p=1")
    }
    const page = p
    const itemsPerPage = 8

    let pagesNumber = (links.length % itemsPerPage) >= 1 ? Math.floor((links.length / itemsPerPage) + 1) : links.length / itemsPerPage
    if (Math.floor(pagesNumber) === 0) {
        pagesNumber = Math.floor(pagesNumber) + 1
    }

    const pages = Array.from({ length: pagesNumber }, (_, i) => i + 1)
    const pagess = pages.filter((number) => number < 5)

    // Redirect to latest page if page number is invalid
    if (parseInt(page) > pagesNumber) {
        return redirect(url + `?p=${pagesNumber}`)
    }
    if (parseInt(page) <= 0) {
        return redirect(url + "?p=1")
    }

    const pagedLinks = shortedLinks.slice((page - 1) * itemsPerPage, page * itemsPerPage)

    return (
        <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-20">
            <AboutHeader title="My Links" />
            <div className="flex flex-col gap-2 py-5">
                <div className="flex flex-wrap sm:justify-between">
                    <h2 className="text-2xl font-bold py-1">Links you've shorted</h2>
                    <LinksSearchButton shortedLink={shortedLinks}/>
                </div>
                <Separator className="bg-gray-700 dark:bg-white/20" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {!session.user.banned && <LinkNewBox />}
                        {pagedLinks.map((link) => (
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
            </div>
            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button variant={page == 1 && "disabled"} asChild>
                                <PaginationPrevious href={url + `?p=${parseInt(page) - 1}`} />
                            </Button>
                        </PaginationItem>
                        {pagess.map((number) => (
                            <PaginationItem key={number}>
                                <PaginationLink
                                    href={url + `?p=${number}`}
                                    isActive={page == number}
                                >
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {pagesNumber > 5 &&
                            <>
                                {parseInt(page) !== 5 && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}
                                {parseInt(page) >= 5 &&
                                    <>
                                        <PaginationItem>
                                            <PaginationLink
                                                href={url + `?p=${page}`}
                                                isActive={true}
                                            >
                                                {parseInt(page)}
                                            </PaginationLink>
                                        </PaginationItem>
                                    </>
                                }
                            </>
                        }
                        <PaginationItem>
                            <Button variant={parseInt(page) == pagesNumber && "disabled"} asChild>
                                <PaginationNext href={url + `?p=${parseInt(page) + 1}`}/>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}

export default MyLinksPage