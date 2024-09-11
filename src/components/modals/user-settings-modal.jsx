"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import ModalError from "@/components/body/modal-error"
import { Checkbox } from "../ui/checkbox"
import { Upload, Download, AlertCircle, CircleX } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"


const UserSettingsModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "usrSettings"
    const { data: session } = useSession()
    const [isButtonDisabled, setIsDisabled] = useState(false)
    const { register,
        watch
        , handleSubmit
        , formState: { errors },
        setValue,
        setError ,
        getValues,
        clearErrors } = useForm(
            {
                defaultValues: {
                    username: session?.user.name,
                    email: session?.user.email
                },
                resetOptions: {
                    keepDirtyValues: false
                }
            }
    )
    const router = useRouter()

    useEffect(() => {
        // Set user details on start
        setValue("username", session?.user.name)
        setValue("email", session?.user.email)
        // Clear errors
        clearErrors("email")
        clearErrors("username")
    }, [isModalOpen]);

    const usernameWatch = watch("username")
    const emailWatch = watch("email")

    useEffect(() => {
        const isUnameSame = usernameWatch == session?.user.name
        const fetchUsername = async (username) => {
            const response = await fetch("/api/account/check/username", {
                method: "POST",
                body: JSON.stringify({
                    userName: username
                })
            })
            if (!response.ok) {
                setError("username", { type: "focus", message: "Username already taken" })
                setIsDisabled(true)
            } else {
                clearErrors("username")
                setIsDisabled(false)
            }
        }
        if (!isUnameSame) {
            fetchUsername(usernameWatch)
        }

    }, [usernameWatch])

    useEffect(() => {
        const isUnameSame = emailWatch == session?.user.email
        const fetchUsername = async (email) => {
            const response = await fetch("/api/account/check/email", {
                method: "POST",
                body: JSON.stringify({
                    email: email
                })
            })
            if (!response.ok) {
                setError("email", { type: "focus", message: "Email already registered" })
                setIsDisabled(true)
            } else {
                clearErrors("email")
                setIsDisabled(false)
            }
        }
        if (!isUnameSame) {
            fetchUsername(emailWatch)
        }

    }, [emailWatch])

    const onSubmit = async (data) => {
         // Prevent default values
         const isUSame = data.username === session?.user.name
         const isESame = data.email === session?.user.email
         if ((isUSame + isESame) === 2) {
            return
         }
         // Prevent empty values
         if (data.username.length < 1 || data.email.length < 1) {
             return
         }

        const response = await fetch("/api/account/update/profile", {
            method: "PATCH",
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            if (response.status === 401) {
                setError("email", { type: "focus", message: "401: Credentials already used."})
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
                        <Button variant="ghost" size="icon"
                            onClick={() => {onClose()}}
                        >
                            <CircleX className="h-5 w-5" />
                        </Button>
                    </div>
                    <h3 className="text-xl font-bold ml-5">Profile settings</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 px-5 w-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex">
                                    <Avatar className="h-16 w-16 mr-5">
                                        <AvatarFallback className="text-2xl">
                                            {session?.user.name.substring(0,1).toUpperCase()}
                                        </AvatarFallback>
                                        <AvatarImage src={session?.user.image}/>
                                    </Avatar>
                                    <div className="w-full">
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username"
                                               placeholder="Your fancy username"
                                               lassName="w-full" {...register("username")}
                                        />
                                    </div>
                                </div>
                                {errors.username && <ModalError message={errors.username.message}/>}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email" placeholder="Your email address"
                                            className="w-full" {...register("email")}
                                    />
                                </div>
                                {errors.email && <ModalError message={errors.email.message} /> }
                            </div>
                            <Button type="submit" className="sm:w-1/3 ml-auto" disabled={isButtonDisabled}
                            >
                                Apply
                            </Button>
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