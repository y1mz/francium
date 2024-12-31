"use client"

import { useSession, signIn } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"

import { Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LinkSuccess from "@/components/shorter/link-success"
import LinkErrorComp from "@/components/shorter/link-error"
import LinkBannedComp from "./link-banned"
import LinkLimitReached from "@/components/shorter/link-limit-reached"

function LinkShorterBox() {
    const { data: session } = useSession()
    const { register
        , handleSubmit, setValue
        , formState: { errors } } = useForm()
    const { onOpen } = useModal()
    const { toast } = useToast()

    const [link, setLink] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isError, setError] = useState()
    const [endRespone, setEndResponse] = useState({})
    const [isLimit, setIsLimit] = useState(false)

    const Content = () => {

        const handlePaste = async () => {
            await navigator.clipboard.readText().then((text) => { setValue("link", text, { shouldDirty: true, shouldValidate: true }) })
            toast({
                description: "Pasted from clipboard"
            })
        }

        const onSubmit = async (data) => {
            let response

            if (isError) {
                setError(null)
            }
            if (endRespone.url) {
                setEndResponse({})
            }

            try {
                setSubmitting(true)
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
                        })
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
                    setIsLimit(true)
                } else {
                    setError(e.message)
                    console.log("[SHORT_LINK_PUBLISH]", e)
                }
            } finally {
                setSubmitting(false)
            }
        }

        return (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/30 shadow-lg hover:shadow-sm transition-all duration-200">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-1">
                    <Input type="url" name="link" placeholder="Link to be shortened"
                        {...register("link", { required: true })} disabled={session?.user.banned}
                    />
                    <Button variant="outline" size="icon" onClick={() => handlePaste()}>
                        <Clipboard className="w-4 h-4"/>
                    </Button>
                    <Button variant="outline"
                        type="submit" disabled={submitting || session?.user.banned}
                    >
                        Short!
                    </Button>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-1 md:px-10">
            {session?.user?.banned && <LinkBannedComp /> }
            {isError && <LinkErrorComp e={isError} e_code={"500"}/>}
            {isLimit && <LinkLimitReached />}
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