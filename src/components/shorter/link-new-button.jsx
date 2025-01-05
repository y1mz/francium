"use client"

import { useModal } from "@/components/modals/hooks/modal-hook"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

function LinkNewButton() {
    const { onOpen } = useModal()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="outline" onClick={() => onOpen("newUrl")}>
                    <Plus className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                New short url
            </TooltipContent>
        </Tooltip>
    )
}

export default LinkNewButton