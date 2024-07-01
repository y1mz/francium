"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import ModalError from "@/components/body/modal-error"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

const CustomUrlModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "newUrl"
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/short/create", {
                method: 'POST',
                body: JSON.stringify({
                    link: data.uLink
                })
            })
            if (!response.ok) {
                if (response.status === 402) {
                    return setError("uLink", { type: "focus", message: "Url is banned, please try again with a different one"} )
                } else {
                    throw new Error(`Submitting Error: ${response.statusText}`)
                }
            }

            onClose()
            window.location.reload()

        } catch (e) {
            console.log("[SHORT_LINK_PUBLISH]", e.message)
            setError("uLink", { type: "focus", message: e.message})
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">
                        New Short Url
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <Input type="text" id="uLink" name="uLink" placeholder="Link to be shortened" {...register("uLink", { required: true })} />
                            {errors.uLink && <ModalError message={errors.uLink.message} />}
                            <Button type="submit" disabled={isSubmitting}>Short!</Button>
                        </div>
                    </form>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default CustomUrlModal