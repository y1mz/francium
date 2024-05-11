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

const LoginReasonModal = () => {
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === "reason"
    const { data: session } = useSession()
    const [loading, setIsLoading] = useState(false)
    const [modalData, setModalData] = useState([])


    // Fetch the Markdown based content from server and write into modalData state.
    useEffect(() => {
        const getModalContent = async () => {
            const response = await fetch("/api/content/reason").then(res => res.json())
            setModalData(response)
            }

        setIsLoading(true)
        getModalContent()
        setIsLoading(false)
    }, [])


    return (
        <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
            <DialogContent>
                <div>
                    <article
                        className="prose dark:prose-invert"
                    >
                        {loading ? (
                            <>
                                <p>Loading please wait</p>
                            </>
                        ) : (
                            <Markdown>
                                {modalData.modalContent}
                            </Markdown>
                        )}
                    </article>
                </div>
                <DialogFooter className="mt-2">
                    <Button onClick={() => onClose()}>Ok</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default LoginReasonModal