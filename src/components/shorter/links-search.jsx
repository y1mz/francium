"use client"

import { useModal } from "@/components/modals/hooks/modal-hook";

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

function LinksSearchButton({ shortedLink }) {
const { onOpen } = useModal()

    return (
        <>
            <Button
                onClick={() => onOpen("searchLinks", { links: shortedLink })}
                variant="outline"
                className="md:w-[300px] min-w-[250px] justify-start text-left font-normal flex-grow sm:flex-grow-0"
            >
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
            </Button>
        </>
    )
}

export default LinksSearchButton