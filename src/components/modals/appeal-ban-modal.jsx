"use client"

import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "@/components/ui/label"

import { useModal } from "./hooks/modal-hook"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "@/lib/hooks/use-toast"

function BanAppealModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "banAppeal"
    const { data: session } = useSession()
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError, watch } = useForm()
    const currentBan = isModalOpen && data.currentBan

    const handleClose = () => {
        onClose()
    }

    isModalOpen && console.log(currentBan)

    const onSubmit = async (data) => {
        const reqBody = JSON.stringify({
            id: currentBan.id,
            userId: session.user.id,
            appealContent: data.appeal
        })

        try {
            const response = await fetch(`/api/account/update/ban/${currentBan.id}/appeal`, {
                method: "POST",
                body: reqBody,
                headers: {
                    "x-client-id": window.localStorage.getItem("localUUID")
                }
            })

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Your appeal has been submitted."
                })
                return handleClose()
            }

        } catch (e) {
            toast({
                title: "Error",
                description: "There was an error. Please try again",
                variant: "destructive"
            })
            console.log(e)
        }

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Appeal your ban</DialogTitle>
                    <DialogDescription>
                        We all make mistakes. If you believe your account termination was a mistake please state that below.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="space-y-1">
                        <Label>Ban Appeal</Label>
                        <Textarea
                            placeholder="Your appeal here"
                            {...register("appeal", {
                                required: true,
                                minLength: { value: 5, message: "Appeal message is too short"},
                                maxLength: { value: 250, message: "Appeal message can't exceed 250 characters."}
                            })}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default BanAppealModal