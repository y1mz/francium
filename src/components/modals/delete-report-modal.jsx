"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"

const UserBanDelete = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { name, userId, banId } = data
    const isModalOpen = isOpen && type === "userBanDel"

    const handleDelete = async () => {
        const response = await fetch(`/api/admin/user/${userId}`, {
            method: "DELETE",
            body: JSON.stringify({
                banId: banId
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
                    <h2 className="text-2xl font-extrabold">Unban user?</h2>
                    <p className="text-xl font-bold">This action will remove ban status from user.</p>
                    <span className="text-md font-medium">
                        {name}
                    </span>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {userId}
                    </code>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="destructive" onClick={() => handleDelete()}>Unban user</Button>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserBanDelete