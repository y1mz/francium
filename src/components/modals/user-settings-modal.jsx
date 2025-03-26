"use client"

import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import ModalError from "@/components/body/modal-error"
import { Checkbox } from "../ui/checkbox"
import { Upload, Download, AlertCircle, CircleX } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

import { useModal } from "./hooks/modal-hook"
import { useToast } from "@/lib/hooks/use-toast"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"

const UserSettingsModal = () => {
    const { onOpen, isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "usrSettings"
    const { data: session } = useSession()
    const [isButtonDisabled, setIsDisabled] = useState(false)
    const { register,
        watch
        , handleSubmit
        , formState: { errors },
        setValue,
        setError ,
        getValues, control,
        clearErrors } = useForm(
            {
                defaultValues: {
                    username: session?.user.name,
                    email: session?.user.email,
                    logErrors: true,
                    showProfile: false
                },
                resetOptions: {
                    keepDirtyValues: false
                }
            }
    )
    const { toast } = useToast()
    const router = useRouter()

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        // Set user details on start

        setValue("username", session?.user.name)
        setValue("email", session?.user.email)
        setValue("showProfile", session?.settings.showUsernameOnCheck)
        setValue("logErrors", session?.settings.logErrorsForDevelopement)
        // Clear errors
        clearErrors("email")
        clearErrors("username")
    }, [isModalOpen]);

    const usernameWatch = watch("username")

    useEffect(() => {
        let timeoutId

        timeoutId = setTimeout(() => {
            const isUnameSame = usernameWatch == session?.user.name
            const fetchUsername = async (username) => {
                const response = await fetch("/api/account/check/username", {
                    method: "POST",
                    body: JSON.stringify({
                        userName: username
                    })
                })
                if (response.ok && response.status === 201) {
                    setError("username", { type: "focus", message: "Username already taken" })
                    setIsDisabled(true)
                } else {
                    clearErrors("username")
                    setIsDisabled(false)
                }
            }
            if (!isUnameSame && usernameWatch.length >= 0) {
                fetchUsername(usernameWatch)
            }
        }, 800)

        return () => clearTimeout(timeoutId)

    }, [usernameWatch])

    const onSubmit = async (data) => {

        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const response = await fetch("/api/account/update/profile", {
            method: "PATCH",
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            if (response.status === 401) {
                setError("email", { type: "focus", message: "401: Credentials already used."})
            }
            toast({
                title: "Error",
                description: "There was an error, please try again.",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Settings updated successfully."
            })
            // Wait a second before refreshing the page
            await sleep(1000).then(() => window.location.reload())
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
            <DialogContent className="max-h-[450px] overflow-y-scroll no-scrollbar">
                <DialogTitle className="hidden"></DialogTitle>
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
                                            {session?.user.name.substring(0, 1).toUpperCase()}
                                        </AvatarFallback>
                                        <AvatarImage src={session?.user.image}/>
                                    </Avatar>
                                    <div className="w-full">
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username"
                                               placeholder="Your fancy username"
                                               lassName="w-full" {...register("username", {
                                            required: "Username is required", minLength: {
                                                value: 3, message: "Username must be at least 3 characters"
                                            }
                                        })}
                                        />
                                    </div>
                                </div>
                                {errors.username && <ModalError message={errors.username.message}/>}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" name="email" placeholder="Your email address"
                                           className="w-full" {...register("email", { minLength: {
                                            value: 5, message: "Email must be at least 5 characters"
                                        }
                                    })}
                                        disabled={true}
                                    />
                                </div>
                                {errors.email && <ModalError message={errors.email.message}/>}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">
                                    Privacy settings
                                </h3>

                                <div className="flex gap-1 mt-2">
                                    <Controller
                                        control={control}
                                        name="showProfile"
                                        render={({field}) => (
                                            <Checkbox
                                                id="showProfile"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <label htmlFor="showProfile"
                                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Show your profile on link checker.
                                    </label>
                                </div>
                                <div className="flex gap-1 mt-2">
                                    <Controller
                                        control={control}
                                        name="logErrors"
                                        render={({field}) => (
                                            <Checkbox
                                                id="logErrors"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <label htmlFor="logErrors"
                                           className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Log application errors for developement.
                                    </label>
                                </div>
                            </div>
                            <Button type="submit" className="sm:w-1/3 ml-auto" disabled={isButtonDisabled}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserSettingsModal