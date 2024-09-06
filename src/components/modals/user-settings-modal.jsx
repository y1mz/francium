"use client"

import { Dialog, DialogContent,
    DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import ModalError from "@/components/body/modal-error"
import { Checkbox } from "../ui/checkbox"
import { Upload, Download, AlertCircle } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const UserSettingsModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "usrSettings"
    const { data: session } = useSession()
    console.log(session)
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError , getValues, clearErrors } = useForm()

    useEffect(() => {
        setValue("username", session?.user.name)
        setValue("email", session?.user.email)
        clearErrors("email")
        clearErrors("username")
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
            if (response.status === 403) {
                setError("username", { type: "focus", message: "Username is already taken."})
            }
        } else {
            window.location.reload()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent className="max-h-[450px] overflow-y-scroll no-scrollbar">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            Settings
                        </h2>
                        <Button variant="ghost"
                            onClick={() => {onClose()}}
                        >
                            Close
                        </Button>
                    </div>
                    <h3 className="text-xl font-bold ml-5">Profile settings</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 px-5 w-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <Avatar className="h-16 w-16 mr-5">
                                        <AvatarFallback>
                                            T
                                        </AvatarFallback>
                                        <AvatarImage src={session?.user.image}/>
                                    </Avatar>
                                    <div className="w-full">
                                        <p className="font-bold">Username</p>
                                        <Input type="text" id="username" name="username"
                                               placeholder="Your fancy username"
                                               lassName="w-full" {...register("username")}
                                        />
                                    </div>
                                </div>
                                {errors.username && <ModalError message={errors.username.message}/>}
                                <div>
                                    <p className="font-bold whitespace-nowrap">E-mail:</p>
                                    <Input type="email" id="email" name="email" placeholder="Your email address"
                                            className="w-full" {...register("email")}
                                    />
                                </div>
                                {errors.email && <ModalError message={errors.email.message} /> }
                            </div>
                            <Button type="submit" className="sm:w-1/3 ml-auto">Apply</Button>
                        </div>
                    </form>
                    <div className="ml-5">
                        <h3 className="text-xl font-bold">
                            Privacy settings
                        </h3>
                        <div className="flex gap-1 mt-2">
                            <Checkbox id="showUser" />
                            <label htmlFor="showUser" 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Show profile on link checker.
                            </label>
                        </div>
                        <div className="flex gap-1 mt-2">
                            <Checkbox id="logErrors" />
                            <label htmlFor="logErrors" 
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Log application errors for developement.
                            </label>
                        </div>
                    </div>
                    <div className="ml-5 mt-5">
                        <h3 className="text-xl font-bold">
                            Data management
                        </h3>
                        <span className="text-sm text-muted-foreground mb-4">
                            Import or export your data in JSON format.
                        </span>
                        <div className="mt-2">
                            <h4 className="font-bold text-lg">Import data</h4>
                            <span className="text-sm text-muted-foreground">
                                Import your data from an exported JSON file
                            </span>
                            <Alert className="my-2">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Warning!</AlertTitle>
                                <AlertDescription>
                                    Importing data from other
                                    servers will overwrite your existing data such as short links,
                                    settings and collections.
                                </AlertDescription>
                            </Alert>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="import-json" type="file" accept=".json"
                                    className="w-full"
                                />
                                <Button
                                    onClick={() => {}} disabled={false}
                                >
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import
                                </Button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h4 className="font-bold text-lg">Export data</h4>
                            <span className="text-sm text-muted-foreground">
                                Download a copy of your account data as a JSON file.
                            </span>
                            <div className="mt-2">
                                <Button>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="ml-5 mt-5">
                        <h3 className="text-xl font-bold text-red-400">
                            Danger zone
                        </h3>
                        <span className="text-sm text-muted-foreground">
                                Dangerous place for deleting your account and data.
                        </span>
                        <Button variant="destructive" className="mt-2">Delete Account</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserSettingsModal