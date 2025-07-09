"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "../../ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Hash, AlertTriangle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

import { useModal } from "../hooks/modal-hook"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/hooks/use-toast"

const BanUserModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "banUsr"
    const { id, name, mail } = data
    const { register, reset, clearErrors
        , handleSubmit
        , formState: { errors, isSubmitting } } = useForm()
    const router = useRouter()

    const [isPerma, setIsPerma] = useState(false)

    useEffect(() => {
        reset()
        clearErrors()
    }, [isModalOpen])

    const handleClose = () => {
        router.refresh()
        onClose()
    }

    const onSubmit = async (data) => {
        const feBody = {
            usename: name,
            mail: mail,
            type: isPerma ? "PERMA" : "TEMP",
            reason: data.reason,
            banDate: !isPerma ? data.banDate : null
        }
        const response = await fetch(`/api/admin/ban/create/${id}`, {
            method: "PATCH",
            body: JSON.stringify(feBody),
            headers: {
                "x-client-id": window.localStorage.getItem("localUUID")
            }
        })
        if (!response.ok) {
            toast({
                title: "Something went wrong: 500",
                description: "There was an error, please try again",
                type: "destructive"
            })
        } else {
            router.refresh()
            onClose()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ban User
                    </DialogTitle>
                    <DialogDescription>Restrict violent users from application</DialogDescription>
                </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                        <Card className="border-0 shadow-none">
                            <CardContent className="space-y-4 rounded-lg bg-muted/50 p-4">
                                <h3 className="font-medium text-sm text-muted-foreground uppercase">User Information</h3>
                                <div className="space-y-3">
                                    <div className="flex gap-1 items-center">
                                        <User className="h-6 w-6 mr-2" />
                                        <div>
                                            <p className="text-sm">Username</p>
                                            <p className="text-sm text-muted-foreground">{name}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Mail className="h-5 w-5 mr-2" />
                                        <div>
                                            <p className="text-sm">E-mail</p>
                                            <p className="text-sm text-muted-foreground">{mail}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <Hash className="h-6 w-6 mr-2" />
                                        <div>
                                            <p className="text-sm">User ID</p>
                                            <p className="text-sm text-muted-foreground">{id}</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <p>Ban Reason</p>
                                <Textarea 
                                    className="w-full"
                                    placeholder="Provide a detailed ban reason here ..."
                                    {...register("reason", {
                                        required: true,
                                        minLength: {
                                            value: 5,
                                            message: "A minimum length of 5 characters required."
                                        },
                                        maxLength: {
                                            value: 155,
                                            message: "Ban reason can't exceed 155 characters."
                                        }
                                    })}
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                                            <p className="font-semibold">Permanent Ban</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">User will be permanently banned from the application</p>
                                    </div>
                                    <Switch id="perma-ban" checked={isPerma} onCheckedChange={setIsPerma} />
                                </div>
                                {!isPerma && (
                                    <div>
                                        <p>Banned Until</p>
                                        <Input 
                                            type="date" 
                                            {...register("banDate", {
                                                required: {
                                                    value: (!isPerma ? true : false)
                                                }
                                            })}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <DialogFooter className="mt-2">
                            <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                            <Button type="submit" >Apply Ban</Button>
                        </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    )
}

export default BanUserModal