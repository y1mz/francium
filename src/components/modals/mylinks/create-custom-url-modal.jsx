"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"
import { cn } from "@/lib/utils"

const CustomUrlModal = () => {
    const { onOpen, isOpen, onClose, type } = useModal()
    const { data: session } = useSession()
    const isModalOpen = isOpen && type === "newUrl"
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors, reset, watch } = useForm()
    const { toast } = useToast()
    const [customExpDate, setCustomExpDate] = useState("")
    const [customUsage, setCustomUsage] = useState("")
    const [isDisabled, setDisabled] = useState(false)

    useEffect(() => {
        clearErrors()
        reset()

        if (!session) {
            return onClose()
        }

    }, [isModalOpen])

    const slugWatch = watch("uLinkKeyword")

    useEffect(() => {
        const slugFetch = async (slug) => {
            const response = await fetch("/api/account/check/slug", {
                method: "POST",
                body: JSON.stringify({ slug: slug })
            })

            if (response.ok && response.status === 201) {
                setError("uLinkKeyword", { type: "focus", message: "Keyword is already taken." })
                setDisabled(true)
                return
            }
            if (response.ok && response.status === 200) {
                clearErrors("uLinkKeyword")
                setDisabled(false)
                return
            }
        }

        let timeoutD

        timeoutD = setTimeout(() => {
            if (slugWatch.length > 2) {
                slugFetch(slugWatch)
            }
        }, 400)

        return () => clearTimeout(timeoutD)

    }, [slugWatch]);

    const handleClose = () => {
        reset()
        return onClose()
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/links/short/create/custom", {
                method: 'POST',
                body: JSON.stringify({
                    link: data.uLink,
                    keyword: data.uLinkKeyword,
                    CustomExpDate: customExpDate,
                    usageLimit: customUsage !== "n" ? customUsage: ""
                })
            })
            if (!response.ok) {
                if (response.status === 402) {
                    return setError("uLink", { type: "focus", message: "Url is banned, please try again with a different one"} )
                } else {
                    throw new Error(`Submitting Error: ${response.statusText}`)
                }
            }

            if (response.ok) {
                setCustomUsage("")
                setCustomExpDate("")

                const resBody = await response.json()
                onOpen("newUrlSuc", { shortUrlD: resBody })
            }


        } catch (e) {

            // Create an error logging api and implement it over there.

            toast({
                title: "Error",
                description: "There was an error, please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                            Create Short Url
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                            Short your long urls with custom keywords.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="uLink"
                                       className={cn(errors.uLink && "text-red-600")}
                                >
                                    Long Url
                                </Label>
                                <Input type="url" id="uLink" name="uLink"
                                       placeholder="Link to be shortened" {...register("uLink", {required: true})}
                                       className={cn(errors.uLink && "border-red-600 outline-red-600")}
                                />
                                {errors.uLink && <p className="text-sm text-red-600">{errors.uLink.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="uLinkKeyword"
                                       className={cn(errors.uLinkKeyword && "text-red-600")}
                                >
                                    Url keyword (optional)
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Create short urls with custom keywords.
                                </p>
                                <Input type="text" id="uLinkKeyword" name="uLink"
                                       placeholder="Example: short, custom ..." {...register("uLinkKeyword", {
                                           required: false,
                                           minLength: { value: 3, message: "Keyword needs to contain at least 3 characters." },
                                           maxLength: { value: 15, message: "Keyword can't exceed 15 characters" },
                                           pattern: {
                                               value: /^[a-zA-Z0-9_.-]+$/,
                                               message: "Invalid keyword"
                                           }
                                       })}
                                       className={cn(errors.uLinkKeyword && "border-red-600 outline-red-600")}
                                />
                                {errors.uLinkKeyword && <p className="text-sm text-red-600">{errors.uLinkKeyword.message}</p>}
                            </div>
                            <div>
                                <div>
                                    <Label htmlFor="uLinkExpDate">Usage limits (optional)</Label>
                                    <p className="text-sm text-muted-foreground">Limit usage of your custom urls</p>
                                </div>
                                <div className="flex gap-1">
                                    <Select value={customExpDate} onValueChange={setCustomExpDate}>
                                        <SelectTrigger className="w-2/3">
                                            <SelectValue placeholder="Expire after" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"240"}>
                                                No Expiration (default)
                                            </SelectItem>
                                            <SelectItem value={"1"}>
                                                1 Month
                                            </SelectItem>
                                            <SelectItem value={"3"}>
                                                3 Months
                                            </SelectItem>
                                            <SelectItem value={"6"}>
                                                6 Months
                                            </SelectItem>
                                            <SelectItem value={"12"}>
                                                1 Year
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={customUsage} onValueChange={setCustomUsage}>
                                        <SelectTrigger className="w-1/3">
                                            <SelectValue placeholder="Usage limit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={"n"}>
                                                No limit (default)
                                            </SelectItem>
                                            <SelectItem value={"1"}>
                                                1
                                            </SelectItem>
                                            <SelectItem value={"10"}>
                                                10
                                            </SelectItem>
                                            <SelectItem value={"100"}>
                                                100
                                            </SelectItem>
                                            <SelectItem value={"200"}>
                                                200
                                            </SelectItem>
                                            <SelectItem value={"500"}>
                                                500
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                                <Button variant="ghost" onClick={() => onClose()}>
                                    Close
                                </Button>
                                <Button type="submit" className="md:w-1/3" disabled={isSubmitting || isDisabled}>
                                    Short!
                                 </Button>
                            </div>
                        </div>
                    </form>
                </div>
                <DialogFooter className="mt-2">
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default CustomUrlModal
