"use client"

import { Dialog, DialogContent,
    DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"

const AdminLinkDeleteModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { id, slug, name, createdAt } = data
    const isModalOpen = isOpen && type === "AdminlinkDel"
    const { data: session } = useSession()

    let currentUrl = window.location.origin

    if (!session) {
        return
    }

    const handleDelete = async () => {
        const response = await fetch(`/api/admin/link/${id}`, {
            method: "DELETE",
            body: JSON.stringify({
                slug: slug,
                createdAt: createdAt
            })
        })
        if (response.ok) {
            window.location.reload()
            return onClose()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-extrabold">Delete Link?</h2>
                    <p className="text-xl font-bold">This will delete the short link below.</p>
                    <span className="text-md font-medium">
                        {name}
                    </span>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {currentUrl}/{slug}
                    </code>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="destructive" onClick={() => handleDelete()}>Delete</Button>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AdminLinkDeleteModal