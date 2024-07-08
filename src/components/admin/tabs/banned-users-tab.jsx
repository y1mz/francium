"use client"

import {
    Table, TableBody,
    TableCell, TableHead, TableHeader,TableRow,
    } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldBan } from "lucide-react"

import { useModal } from "@/components/modals/hooks/modal-hook"

function AdminBannedUsersTab({ users }) {
    const { onOpen } = useModal()

    const EditUserButton = ({ id, name, banId }) => {
        const body = {
            userId: id,
            name: name,
            banId: banId
        }
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost"
                        onClick={() => {onOpen("userBanDel", body)}}
                    >
                        <ShieldBan className="h-5 w-5 text-rose-600" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Unban user</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">
                            Id
                        </TableHead>
                        <TableHead className="w-8">
                            Avatar
                        </TableHead>
                        <TableHead className="w-[140px]">
                            Username
                        </TableHead>
                        <TableHead className="w-[150px]">
                            E-mail
                        </TableHead>
                        <TableHead>
                            Links Count
                        </TableHead>
                        <TableHead>
                            Banned at
                        </TableHead>
                        <TableHead>
                            Ban reason
                        </TableHead>
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {item.id}
                            </TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarFallback>
                                        {item.name.substring(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                    <AvatarImage src={item.image} />
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                {item.name}
                            </TableCell>
                            <TableCell>
                                {item.email}
                            </TableCell>
                            <TableCell>
                                {item.links.length}
                            </TableCell>
                            <TableCell>
                                {new Date(item.bans[0].bannedAt).toDateString()}
                            </TableCell>
                            <TableCell>
                                {item.bans[0].reason}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <EditUserButton 
                                        id={item.id}
                                        name={item.name}
                                        banId={item.bans[0].id}
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

export default AdminBannedUsersTab