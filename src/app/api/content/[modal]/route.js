import { getModalContent } from "@/lib/getPageMetadata"
import { NextResponse } from "next/server"

export async function GET(req, props) {
    const modaal = props.params.modal

    const modalContent = getModalContent(modaal).content

    return Response.json({ modalContent })
}