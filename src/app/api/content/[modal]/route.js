import { getModalContent } from "@/lib/getPageMetadata"

export async function GET(req, props) {
    const modaal = await props.params.modal

    const modalContent = getModalContent(modaal).content

    return Response.json({ modalContent })
}