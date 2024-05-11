"use client"

import { useSession, signIn } from "next-auth/react"
import { useModal } from "@/components/modals/hooks/modal-hook"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function LinkShorterBox() {
    const { data: session } = useSession()
    const { onOpen } = useModal()

    const [formData, setFormData] = useState({
        link: ""
    })
    const [submitting, setSubmitting] = useState(false)
    const [isError, setError] = useState()
    const [endRespone, setEndResponse] = useState()

    const ErrorComponent = () => (
        <div className="bg-rose-900/20 justify-center items-center text-center rounded-md border border-rose-900">
            <p className="p-2">There was an error. Please try again. This incident has reported.</p>
        </div>
    )

    const SuccessComponent = ({ title, url }) => (
        <div>

        </div>
    )

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

        const handleChange = (e) => {
            setFormData({
                [e.target.name]: e.target.value
            })
        }

        const onSubmit = async (event) => {
            event.preventDefault()
            try {
                setSubmitting(true)
                console.log(formData)

                const response = await fetch("/api/short", {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })

                if (!response.ok) {
                    throw new Error(`Submitting Error: ${response.statusText}`)
                }

                const responseData = response.json()
                setEndResponse({
                    title: responseData.title,
                    url: responseData.url
                })

            } catch (e) {
                setError(e)
                console.log("[SHORT_LINK_PUBLISH]", e)
            } finally {
                setSubmitting(false)
            }
        }

        return (
            <>
                <form onSubmit={onSubmit} className="w-full flex gap-1">
                    <Input type="url" name="link" placeholder="Link to be shorted"
                        value={formData.link} onChange={handleChange}
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
            {isError && <ErrorComponent />}
            {endRespone ? (
                <SuccessComponent
                    title={endRespone.title}
                    url={endRespone.url}
                />
            ) : (
                <Content />
            )}
        </div>
    )
}

export default LinkShorterBox