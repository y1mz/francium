"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function LinkNewBox() {
    const { onOpen } = useModal()

    return (
        <div
            className="relative rounded-lg backdrop-blur-md bg-white/10 hover:bg-white/20 hover:shadow-none shadow-lg transition duration-200 h-48 px-12 md:px-0 grid place-content-center hover:cursor-pointer"
            onClick={() => onOpen("newUrl")}
        >
            <Plus className="h-16 w-16 mx-auto" />
            <p className="font-bold text-lg">Create new Url</p>
        </div>
    )
}

export default LinkNewBox