"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ModalError from "@/components/body/modal-error"
import Link from "next/link"
import { Copy, Check } from "lucide-react"

import { useModal } from "./hooks/modal-hook"
import { useRouter } from "next/navigation"
import { useToast } from "@/lib/hooks/use-toast"
import { useState } from "react"

const CustomUrlSuccessModal = () => {
    const [isCopied, setCopied] = useState(false)
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "newUrlSuc"
    const router = useRouter()

    const handleClose = () => {
        router.refresh()
        return onClose()
    }

    const handleCopy = async (url) => {
        const currentUrl = window.location.origin
        setCopied(true)
        await navigator.clipboard.writeText(`${currentUrl}${url}`)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    if (!isModalOpen) {
        return null
    } else {
        const { shortUrlD } = data

        return (
            <Dialog open={isModalOpen} onOpenChange={() => handleClose()}>
                <DialogContent>
                    <div className="flex flex-col gap-2">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Your url ready!
                            </h2>
                            <Link
                                href={shortUrlD.fullUrl}
                                className="text-sm text-muted-foreground line-clamp-1 hover:underline"
                            >
                                {shortUrlD.fullUrl}
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold line-clamp-1">
                                {shortUrlD.metaName}
                            </h3>
                            <p className="line-clamp-3">
                                {shortUrlD.desc}
                            </p>
                            <div className="mt-2">
                                <p className="text-sm text-muted-foreground">Short url:</p>
                                <div className="flex gap-2">
                                    <pre className="bg-muted p-2 rounded-md overflow-x-auto w-full">
                                        <code>{window.location.origin + shortUrlD.url}</code>
                                    </pre>
                                    {isCopied ? (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopy(shortUrlD.url)}
                                            className="bg-green-500 hover:bg-green-300 dark:bg-green-600 dark:hover:bg-green-400"
                                        >
                                            <Check className="h-5 w-5" />
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleCopy(shortUrlD.url)}
                                        >
                                            <Copy className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-2">
                        <Button onClick={() => handleClose()}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
}


export default CustomUrlSuccessModal