"use client"

import { Dialog, DialogContent,
    DialogFooter} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "../hooks/modal-hook"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/hooks/use-toast"

const LinkDisableModal = () => {
    const { isOpen, onClose, type, data } = useModal()
    const { id, slug, name, createdAt } = data
    const isModalOpen = isOpen && type === "linkDisable"
    const { data: session } = useSession()
    const router = useRouter()

    let currentUrl = window.location.origin

    if (!session) {
        return
    }

    const handleDelete = async () => {
        const response = await fetch("/api/short/disable", {
            method: "PATCH",
            body: JSON.stringify({
                id: id,
                slug: slug,
                createdAt: createdAt
            })
        })
        if (response.ok) {
            router.refresh()
            return onClose()
        }
        if (!response.ok) {
            toast({
                title: "Something went wrong",
                description: "We encountered an error. Please try again",
                type: "destructive"
            })
            router.refresh()
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-extrabold">Disable Link?</h2>
                    <p className="text-xl font-bold">This action will make this url unreachable.</p>
                    <span className="text-md font-medium">
                        {name}
                    </span>
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                        {currentUrl}/{slug}
                    </code>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="destructive" onClick={() => handleDelete()}>Disable</Button>
                    <Button onClick={() => onClose()}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LinkDisableModal