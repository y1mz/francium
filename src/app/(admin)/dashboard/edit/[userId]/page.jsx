import { db } from "@/lib/db"
import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"

import AboutHeader from "@/components/about/header"

async function EditUserPage({ params }) {
    const session = await ServerSession()
    if (!session) {
        return redirect("/")
    }

    const userId = params.userId
    const userDetails = await db.user.findUnique({
        where: {
            id: userId
        },
        include: {
            links: true
        }
    })
    console.log(userDetails)
    if (!userDetails) {
        return notFound()
    }
    
    return (
        <>
            <AboutHeader title={`Editing user: ${userDetails.name}`} />
        </>
    )
}

export default EditUserPage