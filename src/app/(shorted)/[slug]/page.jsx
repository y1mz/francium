import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ServerSession } from "@/lib/server-session";

import UrlReportedContainer from "@/components/body/containers/redirecting-container";
import UrlExpiredContainer from "@/components/body/containers/redirect/urk-expired-container";

async function RedirectPage({ params }) {
  const { slug } = await params;
  const currentDate = new Date();
  const session = await ServerSession();

  const redirectUrl = await db.shortLinks.findUnique({
    where: {
      slug,
    },
    include: {
      reports: true,
    },
  });

  if (!redirectUrl) {
    return notFound();
  }

  if (!redirectUrl.active) {
    return <UrlExpiredContainer />;
  }

  if (redirectUrl.usageLimit && redirectUrl.usageLimit === redirectUrl.usage) {
    return <UrlExpiredContainer />;
  }

  if (
    redirectUrl.expiresAt &&
    new Date(redirectUrl.expiresAt).valueOf() <= new Date(currentDate).valueOf()
  ) {
    return <UrlExpiredContainer />;
  }

  let reported = redirectUrl.reports;

  // Add a record to history instead of incrementing a number.
  await db.shortLinkHistory.create({
    data: {
      userId: session && session.user.id,
      linkSlug: redirectUrl.slug,
    },
  });

  if (reported.length > 0) {
    let redirectUU = redirectUrl.link;
    return <UrlReportedContainer url={redirectUU} />;
  }

  return redirect(redirectUrl.link);
}

export default RedirectPage;
