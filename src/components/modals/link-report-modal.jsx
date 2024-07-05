"use client"

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModalError from "@/components/body/modal-error"
import { Textarea } from "../ui/textarea"
import LinkReportSuccess from "../shorter/link-report-success"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

const LinkReportModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "report"
    const { data: session } = useSession()
    const { register
        , handleSubmit
        , formState: { errors },
        setValue, setError } = useForm()
    const [success, setSuccess] = useState(false)
    let userUd
    const { url, slug } = data

    useEffect(() => {
        if (!session) {
            userUd = window.localStorage.getItem("localUUID")
        }
        const rightSlug = window.location.origin + "/" + slug
        setValue("url", rightSlug)
    }, [isModalOpen])

    const onSubmit = async (data) => {
        const feBody = JSON.stringify(data)
        const response = await fetch("/api/links/report", {
            method: "POST",
            body: feBody,
            headers: {
                "localUuid": userUd
            }
        })
        if (!response.ok) {
            setError("link", { type: "focus", message: "There was an error while reporting url. Please try again. This incident will be reported."})
        } else {
            setSuccess(true)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">
                        Report Link
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5">
                            {success && <LinkReportSuccess />}
                            <div>
                            <p className="font-bold">Url</p>
                                <Input type="text" id="url" name="url" placeholder="Url you're reporting"
                                    className="w-full mb-3" disabled {...register("url")}
                                />
                                <p className="font-bold whitespace-nowrap">Report reason</p>
                                <Textarea type="text" id="reason" name="reason" placeholder="Tell us more about this url."
                                    className="w-full" disabled={success} {...register("reason")}
                                />
                                {errors.email && <ModalError message={errors.email.message} /> }
                            </div>
                            <Button type="submit" disabled={success}>Submit report</Button>
                        </div>
                    </form>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LinkReportModal