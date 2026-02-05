import { db } from "@/lib/db";
import { ServerSession } from "@/lib/server-session";
import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(req, { params }) {
  const session = await ServerSession();
  const localUUID = req.headers.get("x-client-id");

  try {
    const { id } = await params;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!localUUID) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.banned) {
      return new NextResponse("You got banned", { status: 401 });
    }

    const collectionDetails = await db.linkCollections.findUnique({
      where: {
        id: id,
        creatorId: session.user.id,
        isPublic: false,
      },
    });

    if (!collectionDetails) {
      return new NextResponse(`Collection with id: ${id} doesn't exist.`, {
        status: 404,
      });
    } else {
      await db.linkCollections.update({
        where: collectionDetails,
        data: {
          isPublic: true,
        },
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (e) {
    await logger(
      "ERROR",
      "[COLLECTION_UPDATE_SHARE_API]",
      e.message,
      new Date(),
      session.user.id,
      localUUID,
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
