"use client"

import CollectionBox from "@/components/collections/collection-box"
import CollectionsHeader from "@/components/collections/collection-header"

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

function CollectionsPageContainer({ collections, p }) {
    return (
        <div className="pb-10">
            <CollectionsHeader
                title="Collections"
                isCollection={false}
            />
            <div className="pb-12 px-5 mx-auto max-w-[1450px]">
                <div className="flex flex-col gap-2 py-5 px-5 lg:px-10 xl:px-15">
                    {!collections.length ? (
                        <p className="text-lg font-semibold text-center mt-5">
                            Nothing here yet
                        </p>
                    ) : (
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-auto gap-3"
                        >
                            {collections.map((item, index) => (
                                <CollectionBox
                                    key={index}
                                    collectionId={item.id}
                                    title={item.name}
                                    description={item.description}
                                    itemsCount={item.links?.length}
                                    isPublic={item.isPublic}
                                    slug={item.publicSlug}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CollectionsPageContainer