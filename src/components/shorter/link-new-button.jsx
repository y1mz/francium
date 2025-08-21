"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function LinkNewButton({ collectionId }) {
    const { onOpen } = useModal()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="ghost" onClick={() => onOpen("newUrl", { collectionId: collectionId })}>
                    <Plus className="h-5 w-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                New short url
            </TooltipContent>
        </Tooltip>
    )
}

export default LinkNewButton