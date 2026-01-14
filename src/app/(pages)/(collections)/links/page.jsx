import { ServerSession } from "@/lib/server-session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import LinksContainer from "@/components/body/containers/links-container";

async function MyLinksPage({ searchParams }) {
  // Get user session and redirect to "/" if no session present.
  const session = await ServerSession();
  if (!session) {
    return redirect("/");
  }

  const links = await db.shortLinks.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      collections: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  // Filter links without a collection
  const unCollectedLinks = links.filter(
    (link) => link.collections.length === 0,
  );

  const userCollections = await db.linkCollections.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: {
      lastUpdated: "desc",
    },
  });

  // Pagination
  const { p } = await searchParams;

  return (
    <LinksContainer
      links={unCollectedLinks}
      p={p}
      session={session}
      collections={userCollections}
    />
  );
}

export default MyLinksPage;
