"use client"

import { useSession, signIn } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LinkSuccess from "@/components/shorter/link-success"
import LinkErrorComp from "@/components/shorter/link-error"

function LinkShorterBox() {
    const { data: session } = useSession()
    const { onOpen } = useModal()

    const [link, setLink] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [isError, setError] = useState()
    const [endRespone, setEndResponse] = useState({})

    const Content = () => {

        if (!session) {
            return (
                <div className="flex gap-1">
                    <Button
                        className="w-2/3"
                        variant="outline"
                        onClick={() => signIn()}
                    >
                        You need to be signed in to continue
                    </Button>
                    <Button
                        className="w-1/3"
                        variant="outline"
                        onClick={() => onOpen("reason")}
                    >
                        See why
                    </Button>
                </div>
            )
        }

        const onSubmit = async (event) => {
            event.preventDefault()
            if (isError) {
                setError(null)
            }
            try {
                setSubmitting(true)

                const response = await fetch("/api/short", {
                    method: 'POST',
                    body: JSON.stringify({
                        link: link
                    })
                })

                if (!response.ok) {
                    throw new Error(`Submitting Error: ${response.statusText}`)
                }

                const responseData = await response.json()
                console.warn(responseData)
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
            <>
                <form onSubmit={onSubmit} className="w-full flex gap-1">
                    <Input type="url" name="link" placeholder="Link to be shorted"
                        value={link} onChange={(e) => setLink(e.target.value)} required
                    />
                    <Button variant="outline"
                        type="submit" disabled={submitting}
                    >
                        Short!
                    </Button>
                </form>
            </>
        )
    }

    return (
        <div className="flex flex-col gap-1 md:px-20">
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