import { db } from "@/lib/db";
import { ServerSession } from "@/lib/server-session";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(req) {
  const session = await ServerSession();
  const localUUID = req.headers.get("x-client-id");

  try {
    const { currentCollection, newCollection, linkId } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!localUUID) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 });
    }

    // Get the link details and disconnect it from the old collection
    const linkDetails = await db.shortLinks.update({
      where: {
        id: linkId,
        creatorId: session.user.id,
      },
      data: {
        collections: {
          disconnect: [
            {
              id: currentCollection,
            },
          ],
        },
      },
      include: {
        collections: true,
      },
    });

    if (!linkDetails) {
      return new NextResponse("Short Url doesn't exists", { status: 404 });
    }

    // Get the collection details and add link to that collection
    const collectionDetails = await db.linkCollections.findUnique({
      where: {
        id: currentCollection,
        creatorId: session.user.id,
      },
      include: {
        links: true,
      },
    });

    if (!collectionDetails) {
      return new NextResponse("Collection doesn't exists", { status: 404 });
    } else {
      await db.linkCollections.update({
        where: {
          id: newCollection,
          creatorId: session.user.id,
        },
        data: {
          links: {
            connect: [{ id: linkDetails.id }],
          },
          lastUpdated: new Date().toISOString(),
        },
        include: {
          links: true,
        },
      });

      return new NextResponse("OK", { status: 200 });
    }
  } catch (e) {
    await logger(
      "ERROR",
      "[COLLECTION_MOVE_API]",
      e.message,
      new Date(),
      session.user.id,
      localUUID,
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(req) {
  const session = await ServerSession();
  const localUUID = req.headers.get("x-client-id");

  try {
    const { currentCollection, linkId } = await req.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!localUUID) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 });
    }

    console.log(linkId, currentCollection);

    // Get the Link details and disconnect it from the current collection.
    const linkDetails = await db.shortLinks.update({
      where: {
        id: linkId,
        creatorId: session.user.id,
      },
      data: {
        collections: {
          disconnect: [
            {
              id: currentCollection,
            },
          ],
        },
      },
      include: {
        collections: true,
      },
    });

    if (!linkDetails) {
      return new NextResponse("Short Url doesn't exists", { status: 404 });
    } else {
      return new NextResponse("OK", { status: 200 });
    }
  } catch (e) {
    await logger(
      "ERROR",
      "[COLLECTION_MOVE_API]",
      e.message,
      new Date(),
      session.user.id,
      localUUID,
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
