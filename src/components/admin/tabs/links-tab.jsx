"use client"

import {
    Table, TableBody, TableCaption,
    TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Trash2, ShieldOff } from "lucide-react"

import { useModal } from "@/components/modals/hooks/modal-hook"
import Link from "next/link";

function AdminLinksTab({ links }) {
    const { onOpen } = useModal()
    const linksR = links.sort((a, b) => b.active - a.active)

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
            <Table>
                <TableCaption>Total links: {links.length}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">
                            Slug
                        </TableHead>
                        <TableHead className="w-[100px]">
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
                    {linksR.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.slug}
                            </TableCell>
                            <TableCell>
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
        </>
    )
}

export default AdminLinksTab