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

const UserSettingsModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "usrSettings"
    const { data: session } = useSession()
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError , getValues } = useForm()

    useEffect(() => {
        setValue("username", session?.user.name)
        setValue("email", session?.user.email)
    }, [isModalOpen]);

    const onSubmit = async (data) => {
        // Prevent default values
        const isUSame = data.username === session?.user.name
        const isESame = data.email === session?.user.email
        if ((isUSame + isESame) === 2) {
            return
        }

        const feBody = JSON.stringify(data)
        const response = await fetch("/api/auth/user/update", {
            method: "PATCH",
            body: feBody
        })
        if (!response.ok) {
            if (response.status === 402) {
                setError("email", { type: "focus", message: "Email already registered under a different account."})
            }
        } else {
            window.location.reload()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">
                        Settings
                    </h2>
                    <h3 className="text-xl font-bold ml-5">Profile settings</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 px-5 w-full">
                            <div className="flex flex-col gap-5">
                                <div className="flex gap-4 items-center">
                                    <p className="font-bold text-center ">Username:</p>
                                    <Input type="text" id="username" name="username" placeholder="Your fancy username"
                                           className="w-full" {...register("username")}
                                    />
                                </div>
                                <div className="flex gap-4 items-center">
                                    <p className="font-bold whitespace-nowrap">E-mail:</p>
                                    <Input type="email" id="email" name="email" placeholder="Your email address"
                                           className="w-full" {...register("email")}
                                    />
                                </div>
                                {errors.email && <ModalError message={errors.email.message} /> }
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

export default UserSettingsModal