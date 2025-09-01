import { ServerSession } from "@/lib/server-session"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

import CollectionsPageContainer from "@/components/body/containers/collections/collections-page-container"

async function CollectionsPage({ searchParams }) {

  const { p } = await searchParams

  const session = await ServerSession()
  if (!session) {
      return redirect("/")
  }

  const collections = await db.linkCollections.findMany({
    where: {
      creatorId: session.user.id
    },
    orderBy: {
      lastUpdated: "desc"
    },
    include: {
      links: true
    }
  })



  return (
    <CollectionsPageContainer collections={collections} p={p} />
  )
}

export default CollectionsPage
