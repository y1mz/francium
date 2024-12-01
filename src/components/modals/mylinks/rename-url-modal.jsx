"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"
import { useRouter } from "next/navigation"

const RenameUrlModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { data: session } = useSession()
    const isModalOpen = isOpen && type === "renameUrl"
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors, reset } = useForm()
    const { toast } = useToast()
    const router = useRouter()

    const { id, slug, name, createdAt } = data

    useEffect(() => {
        clearErrors()
        reset()
        router.refresh()

        if (!session) {
            return onClose()
        }

    }, [isModalOpen])

    const handleClose = () => {
        reset()
        return onClose()
    }

    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/short/update", {
                method: 'PATCH',
                body: JSON.stringify({
                    id: id,
                    slug: slug,
                    name: name,
                    createdAt: createdAt,
                    newTitle: data.uLink
                })
            })
            if (!response.ok) {
                throw new Error(`Submitting Error: ${response.statusText}`)
            }
            return onClose()

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
                        <h2 className="text-2xl font-bold">
                            Rename Short Url
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Rename your short urls to keep them organized.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="uLink">Url Name</Label>
                                <Input type="text" id="uLink" name="uLink"
                                       placeholder={data?.name} {...register("uLink", {required: true})} />
                                {errors.uLink && <p className="text-sm text-red-600">{errors.uLink.message}</p>}
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                                <Button variant="ghost" onClick={() => onClose()}>Close</Button>
                                <Button type="submit" className="md:w-1/3" disabled={isSubmitting}>Short!</Button>
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


export default RenameUrlModal