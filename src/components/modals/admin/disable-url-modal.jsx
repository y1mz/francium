"use client"

import { Dialog, DialogContent, DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../../ui/textarea"
import ModalError from "@/components/body/modal-error"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const DisableUrlModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "banLnk"
    const { id, slug, name, authorId, createdAt, clientId } = data
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError } = useForm()
    const [isError, setIsError] = useState()

    useEffect(() => {
        setValue("slug", (window.location.origin + "/" + slug))
    }, [isModalOpen]);

    const feBody = data

    const onSubmit = async (data) => {

        const response = await fetch(`/api/admin/link/${id}`, {
            method: "PATCH",
            body: JSON.stringify({...feBody, ...data})
        })
        if (!response.ok) {
            setIsError(response.status + response.statusText)
        } else {
            onClose()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">
                        Disable url
                    </h2>
                    {isError && <ModalError message={isError} />}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 w-full">
                                <div className="flex gap-4">
                                    <div>
                                        <p className="font-bold">Short url</p>
                                        <Input type="text" name="slug"
                                                className="w-full" {...register("slug")} disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">Reason</p>
                                    <Textarea 
                                        type="text" name="reason" placeholder="Ban reason here"
                                        className="w-full" {...register("reason")} required
                                    />
                                </div>
                            <Button type="submit">Apply</Button>
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

export default DisableUrlModal