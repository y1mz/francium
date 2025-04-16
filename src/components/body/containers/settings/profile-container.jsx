"use client"

import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Camera, Mail } from "lucide-react"

import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "@/lib/hooks/use-toast"
import { useRouter } from "next/navigation"

function SettingsProfileContainer() {
    const { data: session } = useSession()
    const [isDisabled, setDisabled] = useState(false)
    const router = useRouter()

    const { register,
        watch,
        handleSubmit,
        formState: { errors, dirtyFields, isDirty },
        setValue,
        setError,
        clearErrors} = useForm()

    // Set default values when session becomes avaliable
    useEffect(() => {

        setValue("email", session?.user.email, {
            shouldDirty: false,
            shouldValidate: true
        })
        setValue("name", session?.user.name, {
            shouldDirty: false,
            shouldValidate: true
        })
    }, [session])

    // Check for username matches on server and give out an error if there is one.
    const usernameWatch = watch("name")
    useEffect(()  => {
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
                    setError("name", { type: "focus", message: "Username already taken" })
                    setDisabled(true)
                } else {
                    clearErrors("name")
                    setDisabled(false)
                }
            }
            if (!isUnameSame && usernameWatch.length >= 3) {
                fetchUsername(usernameWatch)
            }
        }, 800)

        return () => clearTimeout(timeoutId)

    }, [usernameWatch])

    const onSubmit = async (data) => {
        const response = await fetch("/api/account/update/profile", {
          method: "PATCH",
          body: JSON.stringify(data)
        })

        if (!response.ok) {
            if (response.status === 401) {
                setError("email", {
                    type: "focus",
                    message: "401: Credentials already used."
                })
            } else {
                toast({
                    title: "Error",
                    description: "There was an error, please try again.",
                    variant: "destructive",
                })
            }
        } else {
            toast({
                title: "Settings updated successfully."
            })
            window.location.replace("/settings/profile")
        }
    }

    return (
        <section className="space-y-6">
            <div>
                <h1 className="font-bold text-3xl md:text-4xl">Profile Settings</h1>
                <p className="text-sm text-muted-foreground"></p>
            </div>
            <div className="px-2 space-y-4">
                <div className="max-w-[600px] rounded-lg bg-white dark:bg-[#1E2130] p-6 mb-6">
                    <div className="flex items-start gap-6">
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={session?.user.image} />
                                <AvatarFallback>{session?.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-0 right-0 rounded-full p-1.5 shadow-lg bg-blue-600">
                                <Camera className="h-3.5 w-3.5 text-white"/>
                            </button>
                        </div>
                        <div className="flex-1 my-auto">
                            <h3 className="text-lg font-medium">@{session?.user.name}</h3>
                            <div className="flex items-center mt-1 text-muted-foreground text-sm">
                                <Mail className="h-4 w-4 mr-2" />
                                {session?.user.email}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-[600px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
                        <div>
                            <Label htmlFor="name" className={cn(
                                errors.name && "text-red-500"
                            )}>
                                Username
                            </Label>
                            <Input type="text" id="name" name="name"
                                   placeholder="Your new username"
                                   {...register("name", {
                                       required: "Username is required",
                                       minLength: {
                                           value: 3, message: "Username must have at least 3 characters."
                                       }, maxLength: {
                                           value: 15, message: "Username cannot exceed 15 characters."
                                       },
                                       pattern: {
                                           value: /^[a-zA-Z0-9_.-]+$/,
                                           message: "Invalid username."
                                       }
                                   })}
                                    className={cn(
                                        errors.name && "border-red-500 outline-red-500"
                                    )}
                            />
                            {errors.name && <p className="text-sm text-red-500 font-medium">{errors.name.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email" className={cn(
                                errors.email && "text-red-500"
                            )}>
                                E-mail
                            </Label>
                            <Input
                                type="email" id="email" name="email"
                                placeholder="Your email address"
                                {...register("email", {
                                    minLength: {
                                        value: 5,
                                        message: "Email must be at least 5 characters"
                                    },
                                    maxLength: {
                                        value: 25,
                                        message: "Email cannot exceed 25 characters."
                                    }
                                })}
                                disabled={true}
                            />
                            {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            variant="ghost"
                            disabled={!isDirty || isDisabled}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SettingsProfileContainer