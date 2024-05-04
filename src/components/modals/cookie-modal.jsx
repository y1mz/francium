"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { useModal } from "./hooks/modal-hook"

function CookiesModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "cookies"

    const handleAcceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "True")
        return onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Before you continue.
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <p>TO-DO Create the content for Cookies modal</p>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="ghost">Learn more.</Button>
                    <Button onClick={() => handleAcceptCookies()}>Continue with cookies.</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CookiesModal