import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ServerSession } from "@/lib/server-session";

async function SharedCollectionPage({ params }) {
  const { publicSlug } = await params;
  const session = await ServerSession();

  const collectionDetails = await db.linkCollections.findUnique({
    where: {
      publicSlug: publicSlug,
      isPublic: true,
    },
  });

  if (!collectionDetails) {
    return notFound();
  }

  return (
    <>
      <p>Under construction {publicSlug}</p>
    </>
  );
}

export default SharedCollectionPage;
