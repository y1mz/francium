import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ServerSession } from "@/lib/server-session";

import SharedCollectionPageContainer from "@/components/body/containers/collections/shared-collection-page-container";

async function SharedCollectionPage({ params, searchParams }) {
  const { publicSlug } = await params;
  const { p } = await searchParams;
  const session = await ServerSession();

  const collectionDetails = await db.linkCollections.findUnique({
    where: {
      publicSlug: publicSlug,
      isPublic: true,
    },
    include: {
      links: true,
    },
  });

  if (!collectionDetails) {
    return notFound();
  }

  const filteredLinks = collectionDetails.links.filter(
    (link) => link.active == true,
  );

  return (
    <>
      <SharedCollectionPageContainer
        slug={publicSlug}
        collectionDetails={collectionDetails}
        links={filteredLinks}
        p={p}
      />
    </>
  );
}

export default SharedCollectionPage;
