import { NextResponse } from "next/server"
import { getModalContent } from "@/lib/getPageMetadata"

export async function GET(req, props) {
    const modaal = props.params.modal
    const modalC = getModalContent(modaal)

    if (!modalC) {
        return new NextResponse("[READ_MODAL_CONTENT] Error while reading Modal content", { status: 500 })
    }

    return new NextResponse.json(modalC)
}