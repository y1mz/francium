"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Hash, AlertTriangle } from "lucide-react"

import { useModal } from "../hooks/modal-hook"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/hooks/use-toast"

function AdminBanAppealModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "aBanAppeal"

    const { user, ban } = data
    const router = useRouter()

    if (!isModalOpen) {
        return null
    }
    

    const handleClose = () => {
        router.refresh()
        onClose()
    }

    const handleAccept = async () => {
        const response = await fetch(`/api/admin/ban/update/${user?.id}/${ban.id}`, {
            headers: {
                "x-client-id": window.localStorage.getItem("localUUID")
            },
            method: "DELETE"
        })

        if (response.ok) {
            toast({
                title: "User's appeal has been accepted."
            })
            return handleClose()
        }

        if (!response.ok) {
            toast({
                type: "destructive",
                title: "There was an error: 500",
                description: "There was an error, please try again."
            })
        }
    }

    const handleReject = async () => {
        const response = await fetch(`/api/admin/ban/update/${user?.id}/${ban.id}`, {
            headers: {
                "x-client-id": window.localStorage.getItem("localUUID")
            },
            method: "PATCH"
        })

        if (response.ok) {
            toast({
                title: "User's appeal has been rejected."
            })
            return handleClose()
        }

        if (!response.ok) {
            toast({
                type: "destructive",
                title: "There was an error: 500",
                description: "There was an error, please try again."
            })
        }
    }

    return (
        <Dialog open={isModalOpen}  onOpenChange={() => handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ban Appeal from {user?.name}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Card className="border-0 shadow-none">
                        <CardContent className="space-y-4 rounded-lg bg-muted/50 p-4">
                            <h3 className="font-medium text-sm text-muted-foreground uppercase">User Information</h3>
                            <div className="space-y-3">
                                <div className="flex gap-1 items-center">
                                    <Mail className="h-5 w-5 mr-2" />
                                    <div>
                                        <p className="text-sm">E-mail</p>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <Hash className="h-5 w-5 mr-2" />
                                    <div>
                                        <p className="text-sm">User ID</p>
                                        <p className="text-sm text-muted-foreground">
                                            {user?.id}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <AlertTriangle className="h-5 w-5 mr-2" />
                                    <div>
                                        <p className="text-sm">Ban reason</p>
                                        <p className="text-sm text-muted-foreground">
                                            {ban?.reason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-3">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">User's appeal message</h3>
                        <Card className="border-0 shadow-none">
                            <CardContent className="rounded-lg p-2 bg-muted/30">
                                <p className="font-mono text-md">
                                    {ban?.appealContent}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="mr-auto" variant="ghost"
                        onClick={() => {onClose()}}
                    >
                        Cancel
                    </Button>
                    <Button variant="destructive"
                        onClick={() => {
                            handleReject()
                        }}
                    >
                        Reject Appeal
                    </Button>
                    <Button
                        onClick={() => {
                            handleAccept()
                        }}
                    >
                        Accept Appeal
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AdminBanAppealModal