"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Markdown from "markdown-to-jsx"

import { useModal } from "./hooks/modal-hook"

function CookiesModal() {
    const { isOpen, onClose, type, data } = useModal()
    const isModalOpen = isOpen && type === "cookies"

    if (isModalOpen) {
        // To-do: insert params here.
    }

    const handleAcceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "True")
        return onClose()
    }

    // Fetch markdown content for modal from server.
    const fetchMarkdown = async () => {
        const response = await fetch("/api/modal/cookie")

        return {
            content: response.json()
        }
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
                    <article 
                        className="prose dark:prose-invert"
                    >
                        <Markdown>
                            {fetchMarkdown().content}
                        </Markdown>
                    </article>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="ghost" asChild>
                        <Link href="/about#cookies">Learn more</Link>
                    </Button>
                    <Button onClick={() => handleAcceptCookies()}>Continue with cookies.</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CookiesModal