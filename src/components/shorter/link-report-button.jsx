"use client"

import { useModal } from "../modals/hooks/modal-hook"
import { Button } from "../ui/button"

function LinkReportButton({ url, slug }) {
    const { onOpen } = useModal()
    const body = {
        link: url,
        slug: slug
    }

    return (
        <Button variant="destrucitve" onClick={() => onOpen("report", body)}>Report Url</Button>
    )
}

export default LinkReportButton