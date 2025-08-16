"use client"

import { Dialog, DialogContent,
    DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const CollectionDeleteModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { id, publicSlug, name } = data
    const isModalOpen = isOpen && type === "collectionDel"
    const { data: session } = useSession()
    const router = useRouter()

    if (!session) {
        return
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/links/collections/delete/${id}`, {
            method: "DELETE",
            body: JSON.stringify({
                slug: publicSlug
            }),
            headers: {
                "x-client-id": window.localStorage.getItem("localUUID")
            }
        })
        if (response.ok) {
            router.refresh()
            return onClose()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold">Delete Collection {name}?</h2>
                    <p className="text-xl font-bold text-red-500">This action will delete this collection.</p>
                    <p className="text-md text-muted-foreground">Contents of this collection gonna be accessible on my links page.</p>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="destructive" onClick={() => handleDelete()}>Delete</Button>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CollectionDeleteModal
