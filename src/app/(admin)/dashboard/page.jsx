import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"

import AdminWelcomeHeader from "@/components/admin/header"
import { Bebas_Neue } from "next/font/google"

async function DashboardPage() {
    const session = await ServerSession()

    const reports = await db.linkReports.findMany({
        where: {
            reportProcessed: false
        }
    })

    return (
        <div>
            <AdminWelcomeHeader user={session.user} reports={reports}/>
            <div>
                
            </div>
        </div>
    )
}

export default DashboardPage