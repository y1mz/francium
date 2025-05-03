"use client"

import {
    Table, TableBody, TableCaption,
    TableCell, TableHead, TableHeader,TableRow,
    } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuTrigger,
    DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ShieldAlert, User, UserCog, UserCheck } from "lucide-react"

import { useSession } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"

function AdminUsersTab({ users }) {
    const { data: session } = useSession()
    const { onOpen } = useModal()
    let usersR
    usersR = users.filter((user) => user.email !== session?.user?.email)
    usersR = usersR.filter((user) => {
        const bans = user.bans
        const activeBans = bans.filter((ban) => ban.isActive === true)

        return activeBans.length <= 0

    })

    const usrRoles = {
        "ADMIN": (
            <p className="flex text-red-500 items-center"><UserCog className="mr-1 h-4 w-4 text-red-500"/> Admin</p>
        ),
        "MOD": (
            <p className="flex text-indigo-400 items-center"><UserCheck className="mr-1 h-4 w-4 text-indigo-400"/> Moderator</p>
        ),
        "USER": (
            <p className="flex items-center"><User className="mr-1 h-4 w-4" /> User</p>
        )
    }

    const ChangeUserRoleButton = ({ id, email, role ,children }) => {
        const handleRoleUpdate = async (i, e, r) => {
            const response = await fetch(`/api/admin/user/${i}/role`, {
                method: "PATCH",
                body: JSON.stringify({
                    email: e,
                    role: r
                })
            })
            if (response.ok) {
                window.location.reload()
            }
        }
        return (
            <DropdownMenu>
                <DropdownMenuTrigger disabled={session?.user.role !== "ADMIN"}>
                    <Button variant="ghost" disabled={role !== "ADMIN"}>
                        {children}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleRoleUpdate(id, email, "MOD")}>
                        <UserCheck className="mr-auto h-4 w-4" />
                        <p>Moderator</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRoleUpdate(id, email, "USER")}>
                        <User className="mr-auto h-4 w-4" />
                        <p>User</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }

    const BanUserButton = ({ username, id, email, bans }) => {
        const modalData = {
            name: username,
            id: id,
            mail: email
        }
        const isButtonDisabled = bans.length > 0
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" 
                        onClick={() => onOpen("banUsr", modalData)}
                        disabled={isButtonDisabled}
                    >
                        <ShieldAlert className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Ban user</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <>
        <div className="max-w-sm hidden">
            <Label htmlFor="userId">Search by id</Label>
            <Input id="userId" type="text" placeholder="User ID" />
        </div>
            <Table>
                <TableCaption>Total users: {usersR.length}</TableCaption>
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
                            Created at
                        </TableHead>
                        <TableHead>
                            Links count
                        </TableHead>
                        <TableHead>
                            Role
                        </TableHead>
                        <TableHead>
                            Is Banned
                        </TableHead>
                        <TableHead>
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersR.map((item) => (
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
                                {new Date(item.createdAt).toDateString()}
                            </TableCell>
                            <TableCell>
                                {item.links.length}
                            </TableCell>
                            <TableCell>
                                <ChangeUserRoleButton id={item.id} email={item.email} role={item.role}>
                                    {usrRoles[item.role]}
                                </ChangeUserRoleButton>
                            </TableCell>
                            <TableCell>
                                {item.bans.length > 0 ? (<p>True</p>) : (<p>False</p>)}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <BanUserButton 
                                        username={item.name} 
                                        id={item.id} 
                                        email={item.email}
                                        bans = {item.bans}
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

export default AdminUsersTab