"use client"

import { Dialog, DialogContent, DialogTitle,
    DialogFooter, DialogHeader} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import Markdown from "markdown-to-jsx"
import Link from "next/link"

import { useModal } from "./hooks/modal-hook"
import { useSession } from "next-auth/react"
import { generateUUID } from "@/lib/generateUUID"
import { useState, useEffect } from "react"

const CookiesModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "cookies"
    const { data: session } = useSession()
    const [loading, setIsLoading] = useState(false)
    const [modalData, setModalData] = useState([])


    // Fetch the Markdown based content from server and write into modalData state.
    useEffect(() => {
        const getModalContent = async () => {
            const response = await fetch("/api/content/cookie").then(res => res.json())
            setModalData(response)
            }

        setIsLoading(true)
        getModalContent()
        setIsLoading(false)
    }, [])

    function saveUUID() {
        const cUUID = localStorage.getItem("localUUID")
        if (!session && !cUUID) {
            const UUID = generateUUID(15)
            localStorage.setItem("localUUID", UUID)
        }
    }

    if (isModalOpen) {
        // To-do: insert params here.
    }

    const handleAcceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "True")
        saveUUID()
        return onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Before you continue
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <article
                        className="prose dark:prose-invert"
                    >
                        {loading ? (
                            <>
                                <p>Fetching content please wait.</p>
                            </>
                        ) : (
                            <Markdown>
                                {modalData.modalContent}
                            </Markdown>
                        )}
                    </article>
                </div>
                <DialogFooter className="mt-2">
                    <Button variant="ghost" asChild>
                        <Link 
                        href="/about#cookies"
                        onClick={() => onClose()}
                        >
                            Learn more
                        </Link>

                    </Button>
                    <Button onClick={() => handleAcceptCookies()}>Continue with cookies.</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CookiesModal