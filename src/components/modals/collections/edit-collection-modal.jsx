"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"
import { useRouter } from "next/navigation"

const EditCollectionModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { data: session } = useSession()
    const isModalOpen = isOpen && type === "collectionEdit"
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
        clearErrors, reset, watch } = useForm()
    const { toast } = useToast()
    const router = useRouter()

    const { id, publicSlug, name, description } = data

    const [isButtonActive, setActive] = useState(false)

    useEffect(() => {
        clearErrors()
        reset()
        router.refresh()

        if (isModalOpen) {
            setValue("name", name, {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("description", description, {
                shouldValidate: true,
                shouldDirty: true
            })
        }

        if (!session) {
            return onClose()
        }

    }, [isModalOpen])

    const formValues = watch()
    function CompareValues(j1, j2) {
        const nameMatch = j1.name === j2.name
        const descMatch = j1.description === j2.description

        return nameMatch && descMatch
    }


    useEffect(() => {
        if (isModalOpen) {
            if (formValues.name?.length) {
                const result = CompareValues(formValues, {
                    name: name,
                    description: description
                })

                setActive(!result)
            } else {
                setActive(false)
            }
        }

    }, [formValues])

    const handleClose = () => {
        reset()
        return onClose()
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`/api/links/collections/update/${id}`, {
                method: "PATCH",
                headers: {
                    "x-client-id": window.localStorage.getItem("localUUID")
                },
                body: JSON.stringify({
                    options: {
                        name: data.name,
                        description: data.description
                    }
                })
            })

            if (!response.ok) {
                throw new Error(response.status)
            } else {
                toast({
                    title: "Collection successfully updated!"
                })
                router.refresh()
                onClose()
            }

        } catch (e) {

            // Create a error logging api and implement it over there.

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
                    <div>
                       <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                                Edit Collection
                            </DialogTitle>
                            <DialogDescription className="text-sm text-muted-foreground">
                                Update collection's name and description to fit it's contents!
                            </DialogDescription>
                       </DialogHeader>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" name="name"
                                       placeholder="Bookmarks, Design Tools, Other stuff ..." {...register("name", {
                                        required : true,
                                        maxLength: { value: 25, message: "Name of a collection can't exceed 25 characters"}
                                       })} 
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description">Collection Description (Optional)</Label>
                                <Input type="text" name="description" id="description"
                                    placeholder="Useful URLs, To be shared, My custom urls ..." 
                                    {...register("description", {
                                        required: false,
                                        maxLength: { value: 45, message: "Description can't exceed 45 characters" }
                                    })}
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                                <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                                <Button type="submit" className="md:w-1/3" disabled={isSubmitting || !isButtonActive}>Short!</Button>
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


export default EditCollectionModal
