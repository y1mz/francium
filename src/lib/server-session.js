import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function ServerSession() {
    return await getServerSession(authOptions)
}

export { ServerSession }