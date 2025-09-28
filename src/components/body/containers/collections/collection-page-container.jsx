"use client"

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

import CollectionsHeader from "@/components/collections/collection-header"
import LinkBox from "@/components/shorter/link-box"


function CollectionPageContainer({ collectionDetails, otherCollections, links, p }) {
    const sortedLinks = links.sort((a, b) => {
        return (new Date(b.createdAt).getTime()) - (new Date(a.createdAt).getDate())
    })

    return (
        <div className="pb-10">
            <CollectionsHeader 
                title={collectionDetails.name} 
                description={collectionDetails.description}
                id={collectionDetails.id}
                slug={collectionDetails.publicSlug}
                isCollection={true}
            />
            <div className="pb-12 px-5">
                <div className="flex flex-col gap-2 py-5">
                    {!links.length ? (
                    <p className="text-lg font-semibold text-center mt-5">
                            Nothing here yet
                    </p>
                ) : (
                    <div 
                        className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-3"
                    >
                        {sortedLinks.map((link, index) => (
                            <LinkBox
                                key={index}
                                LinkId={link.id}
                                title={link.name}
                                url={link.link}
                                shortUrl={link.slug}
                                cDate={link.createdAt}
                                active={link.active}
                                userCol={otherCollections}
                                isCollection={true}
                                currentCollection={collectionDetails}
                            />
                        ))}
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default CollectionPageContainer