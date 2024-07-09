import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminWelcomeHeader from "@/components/admin/header"
import AdminReportsTab from "@/components/admin/tabs/reports-tab"
import AdminUsersTab from "@/components/admin/tabs/users-tab"
import AdminLinksTab from "@/components/admin/tabs/links-tab"
import AdminBannedUsersTab from "@/components/admin/tabs/banned-users-tab"

async function DashboardPage() {
    const session = await ServerSession()

    const reports = await db.linkReports.findMany({
        where: {
            reportProcessed: false
        },
        include: {
            reportUrl: true
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    const users = await db.user.findMany({
        include: {
            sessions: true,
            links: true,
            reports: true,
            bans: true
        }
    })
    
    const bannedUsers = users.filter((user) => user.bans.length > 0)

    const shortLinks = await db.shortLinks.findMany({
        include: {
            creator: true,
            reports: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div>
            <AdminWelcomeHeader user={session.user} reports={reports}/>
            <div className="px-5">
                <Tabs defaultValue="reports" className="min-w-[800px]">
                    <TabsList>
                        <TabsTrigger value="reports">Link Reports</TabsTrigger>
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="bannedUsers" className={bannedUsers.length === 0 && "hidden"}>Banned Users</TabsTrigger>
                        <TabsTrigger value="links">Links</TabsTrigger>
                    </TabsList>
                    <TabsContent value="reports">
                        <AdminReportsTab reports={reports}/>
                    </TabsContent>
                    <TabsContent value="users">
                        <AdminUsersTab users={users}/>
                    </TabsContent>
                    <TabsContent value="bannedUsers">
                        <AdminBannedUsersTab users={bannedUsers} />
                    </TabsContent>
                    <TabsContent value="links">
                        <AdminLinksTab links={shortLinks}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default DashboardPage