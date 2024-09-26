"use client"

import {
    Table, TableBody, TableCaption,
    TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2, ShieldOff } from "lucide-react"
import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink,
    PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { redirect } from "next/navigation"
import { useSearchParams } from "next/navigation"
import Link from "next/link";

function AdminLinksTab({ links }) {
    const Content = () => {
        const { onOpen } = useModal()
        const url = "/dashboard?page=links"
        const linksR = links.sort((a, b) => b.active - a.active)
        const searchParams = useSearchParams()

        // Add needed params to url on page load
        if (!searchParams.has("p") && searchParams.get("page") == "links") {
            return redirect(url + "&p=1")
        }
        const page = searchParams.get("p")

        // Pagination
        let pageNumber = (links.length & 6) >= 1 ? (links.length / 6) + 1 : links.length / 6
        if (Math.floor(pageNumber) === 0) {
            pageNumber = Math.floor(pageNumber) + 1
        }

        const pages = Array.from({ length: pageNumber }, (_, i) => i + 1)
        const pagess = pages.filter((number) => number < 5)

        if (parseInt(page) > Math.floor(pageNumber)) {
            return redirect(url + `&p=${Math.floor(pageNumber)}`)
        }
        if (parseInt(page) <= 0) {
            return redirect(url + "&p=1")
        }

        const pagedLinks = linksR.slice((page - 1) * 6, page * 6)

        const EditUserButton = ({ id, name, slug, createdAt}) => {
            const body = {
                id: id,
                name: name,
                slug: slug,
                createdAt: createdAt
            }
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost"
                                onClick={() => {onOpen("AdminlinkDel", body)}}
                        >
                            <Trash2 className="h-5 w-5 text-rose-600" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete Link</p>
                    </TooltipContent>
                </Tooltip>
            )
        }

        const DisableUrlIcon = ({ id, slug }) => {
            const body = {
                id: id,
                slug: slug
            }
            return (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost"
                                onClick={() => {onOpen("banLnk", body)}}
                        >
                            <ShieldOff className="h-5 w-5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Disable Link</p>
                    </TooltipContent>
                </Tooltip>
            )
        }

        return (
            <>
                <Table className="overflow-y-scroll no-scrollbar">
                    <TableCaption>Total links: {links.length}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">
                                Slug
                            </TableHead>
                            <TableHead className="w-[100px] max-w-[120px]">
                                Full Url
                            </TableHead>
                            <TableHead className="w-[140px]">
                                Url title
                            </TableHead>
                            <TableHead className="w-[150px]">
                                Creator username
                            </TableHead>
                            <TableHead>
                                Created at
                            </TableHead>
                            <TableHead>
                                Report count
                            </TableHead>
                            <TableHead>
                                Is Active
                            </TableHead>
                            <TableHead>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagedLinks.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.slug}
                                </TableCell>
                                <TableCell className="max-w-[120px]">
                                    <Link href={item.link} className="line-clamp-1 text-xs font-light hover:underline">
                                        {item.link}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    {item.creator.name}
                                </TableCell>
                                <TableCell>
                                    {new Date(item.createdAt).toDateString()}
                                </TableCell>
                                <TableCell>
                                    {item.reports.length}
                                </TableCell>
                                <TableCell>
                                    {item.active.toString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <EditUserButton
                                            id={item.id}
                                            name={item.name}
                                            slug={item.slug}
                                            createdAt={item.createdAt}
                                        />
                                        <DisableUrlIcon
                                            id={item.id}
                                            slug={item.slug}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button variant={parseInt(page) == 1 && "disabled"} asChild>
                                <PaginationPrevious href={url + `&p=${parseInt(page) - 1}`} />
                            </Button>
                        </PaginationItem>
                        {pagess.map((number) => (
                            <PaginationItem key={number}>
                                <PaginationLink
                                    href={url + `&p=${number}`}
                                    isActive={parseInt(page) == number}
                                >
                                    {number}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {Math.floor(pageNumber) > 5 &&
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
                                                href={url + `&p=${page}`}
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
                            <Button variant={parseInt(page) == Math.floor(pageNumber) && "disabled"} asChild>
                                <PaginationNext href={url + `&p=${parseInt(page) + 1}`}/>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </>
        )
    }

    return (
        <div className="w-full px-5">
            {links.length === 0 ? (<p className="text-lg font-bold text-center">No links shorted yet!</p>) : (
                <Content/>)}
        </div>
    )
}

export default AdminLinksTab