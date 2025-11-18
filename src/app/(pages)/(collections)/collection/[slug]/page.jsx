import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ServerSession } from "@/lib/server-session";
import { redirect } from "next/navigation";

import CollectionPageContainer from "@/components/body/containers/collections/collection-page-container";

async function CollectionSlugPage({ params, searchParams }) {
  const { slug } = await params;
  const session = await ServerSession();

  if (!session) {
    return redirect("/");
  }

  const collectionDetails = await db.linkCollections.findUnique({
    where: {
      publicSlug: slug,
    },
    include: {
      links: true,
    },
  });

  const userCollections = await db.linkCollections.findMany({
    where: {
      creatorId: session.user.id,
    },
    orderBy: {
      lastUpdated: "desc",
    },
  });

  if (!collectionDetails) {
    return notFound();
  }

  const { p } = await searchParams;

  return (
    <CollectionPageContainer
      collectionDetails={collectionDetails}
      links={collectionDetails.links}
      otherCollections={userCollections}
      p={p}
    />
  );
}

export default CollectionSlugPage;
