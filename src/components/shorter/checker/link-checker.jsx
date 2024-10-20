"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LinkCheckError from "@/components/shorter/checker/link-check-error"
import LinkCheckResult from "@/components/shorter/checker/link-check-result"

function LinkCheckerBox() {
    const { register
        , handleSubmit
        , formState: { errors } } = useForm()

    const [submitting, setSubmitting] = useState(false)
    const [isError, setError] = useState()
    const [endRespone, setEndResponse] = useState({})
    const [endAuthorResponse, setAuthorResponse] = useState({})

    const Content = () => {

        const onSubmit = async (data) => {
            if (isError) {
                setError(null)
            }
            setEndResponse({})

            try {
                setSubmitting(true)
                const link = data.link
                const slug = link.split("/").slice(3,4)[0]
                const domain = link.split("/").slice(2,3)[0]
                const currDomain = window.location.origin.split("/").slice(2,3)[0]

                if (currDomain !== domain) {
                    throw new Error("Urls from other servers aren't supported.")
                }

                const response = await fetch(`/api/meta/${slug}`)

                if (!response.ok) {
                    throw new Error(`Checking Error: ${response.statusText}`)
                }

                const responseData = await response.json()
                setEndResponse(responseData)

                if (responseData.isAuthorPublic) {
                    const res = await fetch(`/api/meta/${slug}/author`)
                    const fullRes = await res.json()
                    setAuthorResponse(fullRes)
                }

            } catch (e) {
                setError(e)
                console.log("[SHORT_LINK_CHECK]", e.message)
            } finally {
                setSubmitting(false)
            }
        }

        return (
            <div className="p-4 rounded-lg backdrop-blur-sm bg-white/10 border border-white/30 shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-1">
                    <label htmlFor="link" className="text-xs">Short Link:</label>
                    <div className="flex gap-2">
                        <Input type="url" id="link" name="link" placeholder="Short Link"
                                {...register("link", { required: true})}
                        />
                        <Button variant="outline"
                                type="submit" disabled={submitting}
                        >
                            Check!
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-1 md:px-20">
            {isError && <LinkCheckError e_code={isError} />}
            <Content />
            <div className="py-2">
                {endRespone.id && <LinkCheckResult result={endRespone} author={endAuthorResponse} />}
            </div>
        </div>
    )
}

export default LinkCheckerBox