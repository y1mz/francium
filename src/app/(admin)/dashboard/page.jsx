import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminWelcomeHeader from "@/components/admin/header"
import AdminReportsTab from "@/components/admin/tabs/reports-tab"
import AdminUsersTab from "@/components/admin/tabs/users-tab"
import AdminLinksTab from "@/components/admin/tabs/links-tab"
import AdminBannedUsersTab from "@/components/admin/tabs/banned-users-tab"
import AnnouncementManagerTab from "@/components/admin/tabs/announcement-tab"
import Link from "next/link"

async function DashboardPage({ searchParams }) {
    const session = await ServerSession()

    let page
    page = searchParams.page
    if (!page){
        page = "reports"
    }

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
    
    const bannedUsers = await db.userBans.findMany({
        where: {
            isActive: true
        },
        include: {
            user: true
        }
    })

    const shortLinks = await db.shortLinks.findMany({
        include: {
            creator: true,
            reports: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const announcements = await db.announcements.findFirst({
        where: {
            isActive: true
        }
    })

    return (
        <main>
            <AdminWelcomeHeader user={session.user} reports={reports}/>
            <div className="px-5">
                <Tabs defaultValue={page} className="min-w-[800px]">
                    <TabsList>
                        <TabsTrigger value="reports" asChild>
                            <Link href="/dashboard?page=reports">
                                Reports
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="users" asChild>
                            <Link href="/dashboard?page=users">
                                Users
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="bannedUsers" className={bannedUsers.length === 0 && "hidden"} asChild> 
                            <Link href="/dashboard?page=bannedUsers">
                                Banned Users
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="links" asChild>
                            <Link href="/dashboard?page=links&p=1">
                                Shorted Links
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="announcements" asChild>
                            <Link href="/dashboard?page=announcements">
                                Announcements
                            </Link>
                        </TabsTrigger>
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
                    <TabsContent value="announcements">
                        <AnnouncementManagerTab currAnnouncement={announcements}/>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}

export default DashboardPage