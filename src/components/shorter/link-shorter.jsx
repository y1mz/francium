"use client"

import { useSession, signIn } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LinkSuccess from "@/components/shorter/link-success"
import LinkErrorComp from "@/components/shorter/link-error"
import LinkBannedComp from "./link-banned"

function LinkShorterBox() {
    const { data: session } = useSession()
    const { onOpen } = useModal()
    const { register
        , handleSubmit
        , formState: { errors } } = useForm()

    const [link, setLink] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isError, setError] = useState()
    const [endRespone, setEndResponse] = useState({})

    const Content = () => {

        if (!session) {
            return (
                <div className="flex flex-wrap gap-1">
                    <Button
                        className="w-2/3 flex-grow"
                        variant="outline"
                        onClick={() => signIn()}
                    >
                        You need to be signed in to continue
                    </Button>
                    <Button
                        className="w-1/3 flex-grow"
                        variant="outline"
                        onClick={() => onOpen("reason")}
                    >
                        See why
                    </Button>
                </div>
            )
        }

        const onSubmit = async (data) => {
            if (isError) {
                setError(null)
            }
            if (endRespone.url) {
                setEndResponse({})
            }
            try {
                setSubmitting(true)

                const response = await fetch("/api/short/create", {
                    method: 'POST',
                    body: JSON.stringify({
                        link: data.link
                    })
                })

                if (!response.ok) {
                    throw new Error(`Submitting Error: ${response.statusText}`)
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
                setError(e.message)
                console.log("[SHORT_LINK_PUBLISH]", e)
            } finally {
                setSubmitting(false)
            }
        }

        return (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/30 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-1">
                    <Input type="url" name="link" placeholder="Link to be shortened"
                        {...register("link", { required: true })} disabled={session.user.banned}
                    />
                    <Button variant="outline"
                        type="submit" disabled={submitting || session.user.banned}
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