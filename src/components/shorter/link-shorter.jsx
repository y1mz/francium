"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"

import { Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LinkSuccess from "@/components/shorter/link-success"
import LinkBannedComp from "./link-banned"

function LinkShorterBox() {
    const { data: session } = useSession()
    const { register
        , handleSubmit, setValue
        , formState: { errors, isSubmitting } } = useForm()
    const { toast } = useToast()

    const [endRespone, setEndResponse] = useState({})

    const Content = () => {

        const handlePaste = async () => {
            await navigator.clipboard.readText().then((text) => { setValue("link", text, { shouldDirty: true, shouldValidate: true }) })
            toast({
                description: "Pasted from clipboard"
            })
        }

        const onSubmit = async (data) => {
            let response
            setEndResponse({})

            try {
                if (!session) {
                    response = await fetch("/api/short/create/nologin", {
                        method: "POST",
                        body: JSON.stringify({
                            link: data.link
                        }),
                        headers: {
                            "nonLoginUUID": window.localStorage.getItem("localUUID")
                        }
                    })
                } else {
                    response = await fetch("/api/short/create", {
                        method: 'POST',
                        body: JSON.stringify({
                            link: data.link
                        }),
                        headers: {
                            "x-client-id": window.localStorage.getItem("localUUID")
                        }
                    })

                    if (!response.ok) {
                        throw new Error(`Submitting Error: ${response.statusText}`)
                    }
                }

                const responseData = await response.json()
                setEndResponse({
                    title: responseData.title,
                    url: responseData.url,
                    fullUrl: responseData.fullUrl,
                    img: responseData.img,
                    desc: responseData.desc
                })

            } catch (e) {
                if (response.status === 403) {
                    toast({
                        title: "Limit reached",
                        description: "You've reached your weekly limit, please sign-in to continue.",
                        variant: "destructive",
                    })
                } else {
                    toast({
                        title: "There was an error",
                        description: "There was an error, please try again.",
                        variant: "destructive",
                    })
                    console.log("[SHORT_LINK_PUBLISH]", e)
                }
            }
        }

        return (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/30 shadow-lg hover:shadow-sm transition-all duration-200">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-1">
                    <Input type="url" name="link" placeholder="Link to be shortened"
                        {...register("link", { required: true })} disabled={session?.user.banned || isSubmitting }
                    />
                    <Button variant="outline" size="icon"
                            onClick={() => handlePaste()} className="hidden md:flex"
                            disabled={isSubmitting || session?.user.banned}
                    >
                        <Clipboard className="w-4 h-4"/>
                    </Button>
                    <Button variant="outline"
                        type="submit" disabled={isSubmitting || session?.user.banned}
                    >
                        Short!
                    </Button>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-1 md:mx-8">
            {session?.user?.banned && <LinkBannedComp /> }
            {endRespone.url &&
                <LinkSuccess
                    title={endRespone.title}
                    url={endRespone.fullUrl}
                    short={endRespone.url}
                    desc={endRespone.desc}
                    img={endRespone.img}
                />
            }
            <Content />
        </div>
    )
}

export default LinkShorterBox