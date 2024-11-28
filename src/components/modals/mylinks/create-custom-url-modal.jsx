"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ModalError from "@/components/body/modal-error"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"

const CustomUrlModal = () => {
    const { onOpen, isOpen, onClose, type } = useModal()
    const { data: session } = useSession()
    const isModalOpen = isOpen && type === "newUrl"
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors, reset } = useForm()
    const { toast } = useToast()

    useEffect(() => {
        clearErrors()
        reset()

        if (!session) {
            return onClose()
        }

    }, [isModalOpen])

    const handleClose = () => {
        reset()
        return onClose()
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/short/create/custom", {
                method: 'POST',
                body: JSON.stringify({
                    link: data.uLink,
                    keyword: data.uLinkKeyword
                })
            })
            if (!response.ok) {
                if (response.status === 402) {
                    return setError("uLink", { type: "focus", message: "Url is banned, please try again with a different one"} )
                } else {
                    throw new Error(`Submitting Error: ${response.statusText}`)
                }
            }
            const resBody = await response.json()
            // Create a new modal called "custom-url-success-modal.jsx" and open it up when it finishes
            onOpen("newUrlSuc", { shortUrlD: resBody })

        } catch (e) {

            // Create a error logging api and implement it over there.

            toast({
                title: "Error",
                description: "There was an error, please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Create Short Url
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Short your long urls with custom keywords.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="uLink">Long Url</Label>
                                <Input type="url" id="uLink" name="uLink"
                                       placeholder="Link to be shortened" {...register("uLink", {required: true})} />
                                {errors.uLink && <p className="text-sm text-red-600">{errors.uLink.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="uLinkKeyword">Url keyword (optional)</Label>
                                <p className="text-sm text-muted-foreground">
                                    Create short urls with custom keywords.
                                </p>
                                <Input type="text" id="uLinkKeyword" name="uLink"
                                       placeholder="Example: short, custom ..." {...register("uLinkKeyword", {  required: false, minLength: 3, maxLength:10 })} />
                                {errors.uLinkKeyword && <p className="text-sm text-red-600">{errors.uLinkKeyword.message}</p>}
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                                <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                                <Button type="submit" className="md:w-1/3" disabled={isSubmitting}>Short!</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <DialogFooter className="mt-2">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default CustomUrlModal