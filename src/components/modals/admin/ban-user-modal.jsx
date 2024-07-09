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

const BanUserModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "banUsr"
    const { data: session } = useSession()
    const { id, name, mail } = data
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError } = useForm()
    const [isError, setIsError] = useState()

    useEffect(() => {
        setValue("username", name)
        setValue("userid", id)
        setValue("email", mail)
    }, [isModalOpen]);

    const onSubmit = async (data) => {
        const feBody = JSON.stringify(data)
        const response = await fetch(`/api/admin/user/${id}`, {
            method: "PATCH",
            body: feBody
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
                        Ban User
                    </h2>
                    {isError && <ModalError message={isError} />}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 w-full">
                                <div className="flex gap-4">
                                    <div>
                                        <p className="font-bold">Username</p>
                                        <Input type="text" id="username" name="username" placeholder="Your fancy username"
                                                className="w-full" {...register("username")} disabled
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold">User id</p>
                                        <Input type="text" id="userid" name="userid" placeholder="Your email address"
                                            className="w-full" {...register("userid")} disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-bold">User email</p>
                                    <Input type="email" id="email" name="email" placeholder="Your email address"
                                        className="w-full" {...register("email")} disabled
                                    />
                                </div>
                                <div>
                                    <p className="font-bold">Ban reason</p>
                                    <Textarea 
                                        type="text" name="reason" placeholder="Ban reason here"
                                        className="w-full" {...register("reason")} required
                                    />
                                    <p className="font-bold">Banned until</p>
                                    <Input type="date" {...register("banDate")} required />
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

export default BanUserModal