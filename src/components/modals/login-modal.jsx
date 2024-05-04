"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"
import { redirect } from "next/navigation"

function LoginModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "login"

    function handleOnClose() {
        return redirect("/")
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => redirect("/")}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Login or Signup
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <p>TO-DO Create the content for Login modal</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal