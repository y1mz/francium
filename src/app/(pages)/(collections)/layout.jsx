import { ServerSession } from "@/lib/server-session"
import { redirect } from "next/navigation"
import { readConfig } from "@/lib/readConfig"
import { db } from "@/lib/db"

import CollectionsSidebar from "@/components/collections/collections-sidebar"
import { CollectionsMobileSidebar } from "@/components/collections/collections-mobile-sidebar"

async function CollectionsLayout({ children }) {
  const session = await ServerSession()
  const config = readConfig()

  if (!session) {
    // Replace this later with a "You need to sign in page"
      return redirect(`${process.env.AUTH_URL}/sign-in?callbackUrl=${process.env.AUTH_URL}/links`)
  }

  // Get collections from db
  const cs = await db.linkCollections.findMany({
    where: {
      creatorId: session.user.id
    },
    orderBy: {
      lastUpdated: "desc"
    }
  })

  return (
    <main className="flex w-full h-[100vh] transition-all duration-300 overflow-y-hidden">
      <CollectionsSidebar
        config={config}
        collections={cs.slice(0, 15)}
      />
      <CollectionsMobileSidebar
        config={config}
        collections={cs.slice(0, 15)}
      />
      <div className="w-full overflow-y-auto">
        {children}
      </div>
    </main>
  )
}

export default CollectionsLayout
