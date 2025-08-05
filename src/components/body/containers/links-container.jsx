"use client"

import LinkBox from "@/components/shorter/link-box"
import LinksHeader from "@/components/body/links-header"

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

function LinkContainer({ links, p, session }) {
    const [searchResults, setSearchResults] = useState({})

    const shortedLinks = links.sort((a, b) => {
        let dateA = new Date(a.createdAt)
        let dateB = new Date(b.createdAt)

        return dateB.getTime() - dateA.getTime()
    })

    // Pagination

    const url = "/links"
    if (!p) {
        return redirect(url + "?p=1")
    }
    const page = p
    const itemsPerPage = 12

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
        <div className="pb-10">
            <LinksHeader shortLinks={shortedLinks} session={session} title="My Links" />
            <div className="pb-12 px-5">
                <div className="flex flex-col gap-2 py-5">
                    {!links.length ? (
                        <p className="text-lg font-semibold text-center mt-5">
                            Nothing here yet
                        </p>
                    ) : (
                        <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-3">
                            {pagedLinks.map((link) => (
                                <LinkBox
                                    key={link.id}
                                    LinkId={link.id}
                                    title={link.name}
                                    url={link.link}
                                    shortUrl={link.slug}
                                    cDate={link.createdAt}
                                    active={link.active}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    {links.length > itemsPerPage && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <Button variant={page == 1 && "disabled"} asChild>
                                        <PaginationPrevious href={url + `?p=${parseInt(page) - 1}`}/>
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
                                                <PaginationEllipsis/>
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
                    )}
                </div>
            </div>
        </div>
    )
}

export default LinkContainer