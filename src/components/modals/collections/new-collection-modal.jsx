"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useModal } from "../hooks/modal-hook"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "@/lib/hooks/use-toast"
import { cn } from "@/lib/utils"

const NewCollectionModal = () => {
    const { onOpen, isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "newCollection"
    const { register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors, reset, watch } = useForm()
    const { toast } = useToast()

    useEffect(() => {
        clearErrors()
        reset()

    }, [isModalOpen])

    const handleClose = () => {
        reset()
        return onClose()
    }

    const onSubmit = async (data) => {
        try {

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
                            Create New Collection
                        </DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                          Organize your short links with collections!
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-4">
                            <div>
                                <Label htmlFor="name"
                                       className={cn(errors.name && "text-red-600")}
                                >
                                  Collection Name
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Give your collection a unique name!
                                </p>
                                <Input type="text" id="name" name="name"
                                      placeholder="Bookmarks, Design Tools, Other stuff ..." {...register("name", {
                                        required: true,
                                        maxLength: { value: 15, message: "Name of a collection can't exceed 15 characters"}
                                      })}
                                       className={cn(errors.name && "border-red-600 outline-red-600")}
                                />
                                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description"
                                       className={cn(errors.description && "text-red-600")}
                                >
                                  Collection Description (Optional)
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Describe the contents of this collection!
                                </p>
                                <Input type="text" id="description" name="description"
                                        placeholder="Useful URLs, To be shared, My custom urls ..." {...register("description", {
                                           required: false,
                                           maxLength: { value: 45, message: "Description can't exceed 45 characters" }
                                       })}
                                       className={cn(errors.description && "border-red-600 outline-red-600")}
                                />
                                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                                <Button variant="ghost" onClick={() => onClose()}>
                                  Cancel
                                </Button>
                                <Button type="submit" className="md:w-1/3" disabled={isSubmitting}>
                                  Create
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


export default NewCollectionModal
