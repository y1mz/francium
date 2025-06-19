"use client"

import {
    Table, TableBody,
    TableCell, TableHead, TableHeader,TableRow,
    } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShieldBan, NotepadTextDashed } from "lucide-react"

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

    const ReadAppealButton = ({ userDetails, banDetails, isDisabled }) => {

        return (
            <>
                <Button size="icon" variant="ghost"
                        disabled={isDisabled}
                        className="disabled:text-muted-foreground"
                        onClick={() => {}}
                >
                    <NotepadTextDashed className="h-5 w-5" />
                </Button>
            </>
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
                            Ban Type
                        </TableHead>
                        <TableHead>
                            Banned at
                        </TableHead>
                        <TableHead>
                            Banned Until
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
                                {item.user.id}
                            </TableCell>
                            <TableCell>
                                <Avatar>
                                    <AvatarFallback>
                                        {item.user.name.substring(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                    <AvatarImage src={item.user.image} />
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                {item.user.name}
                            </TableCell>
                            <TableCell>
                                {item.user.email}
                            </TableCell>
                            <TableCell>
                                {item.type === "temp" ? "Temporary restriction" : "Permanent account termination"}
                            </TableCell>
                            <TableCell>
                                {new Date(item.bannedAt).toDateString()}
                            </TableCell>
                            <TableCell>
                                {item.type !== "perma" ? new Date(item.bannedUntil).toDateString() : "Permanent"}
                            </TableCell>
                            <TableCell>
                                {item.reason}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <ReadAppealButton
                                        userDetails={item.user}
                                        banDetails={item}
                                        isDisabled={!item.isAppeal}
                                    />
                                    <EditUserButton 
                                        id={item.user.id}
                                        name={item.user.name}
                                        banId={item.id}
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