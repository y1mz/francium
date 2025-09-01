"use client"

import CollectionsPageHeader from "@/components/collections/collections-page-header"
import CollectionBox from "@/components/collections/collection-box"

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
            <CollectionsPageHeader />
            <div className="pb-12 px-5">
                <div className="space-y-2 py-5">
                    {!collections.length ? (
                        <p className="text-lg font-semibold text-center mt-5">
                            Nothing here yet
                        </p>
                    ) : (
                        <div
                            className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-3"
                        >
                            {collections.map((item, index) => (
                                <CollectionBox
                                    key={index}
                                    collectionId={item.id}
                                    title={item.name}
                                    description={item.description}
                                    itemsCount={item.links?.length}
                                    isPublic={item.isPublic}
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