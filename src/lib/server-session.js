import { auth } from "@/app/api/auth/[...nextauth]/route"

async function ServerSession() {
    return await auth()
}

export { ServerSession }