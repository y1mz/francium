import { getServerSession } from "next-auth"
import { authOptions } from "@/app/(auth)/api/[...nextauth]/route"

async function ServerSession() {
    return await getServerSession(authOptions)
}

export { ServerSession }