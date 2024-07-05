"use client"

import { CircleX, Trash2 } from "lucide-react"
import {
    Table, TableBody, TableCaption,
    TableCell, TableHead, TableHeader,TableRow,
    } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

function AdminReportsTab({ reports }) {
        
    const handleDeleteReport = async (id, slug) => {
        const body = {
            id: id,
            slug: slug
        }
        const response = await fetch("/api/admin/report", {
            method: "DELETE",
            body: JSON.stringify(body)
        })

        if (response.ok) {
            window.location.reload()
        }
    } 

    const Content = () => {
        return (
            <>
                <Table>
                    <TableCaption>A list of reported urls.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Slug
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Full Url
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Url Title
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Reported at
                            </TableHead>
                            <TableHead className="w-[200px]">
                                Reason
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead>
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((item) => (
                            <TableRow>
                                <TableCell>{item.reportUrlSlug}</TableCell>
                                <TableCell>
                                    <Link href={item.reportUrl.link} className="text-xs truncate font-light">
                                        {item.reportUrl.link}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {item.reportUrl.metaName}
                                </TableCell>
                                <TableCell>
                                    {new Date(item.createdAt).toDateString()}
                                </TableCell>
                                <TableCell>
                                    {item.reportDesc}
                                </TableCell>
                                <TableCell>
                                    Active
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" variant="ghost">
                                                    <CircleX className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Disable Url</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button size="icon" variant="ghost" onClick={() => handleDeleteReport(item.id, item.reportUrlSlug)}>
                                                    <Trash2 className="h-5 w-5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Delete report</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        )
    }

    return (
        <div className="w-full px-5 overflow-x-scroll">
            {reports.length === 0 ? (<p>Relax, no reports!</p>) : (<Content />)}
        </div>
    )
}

export default AdminReportsTab