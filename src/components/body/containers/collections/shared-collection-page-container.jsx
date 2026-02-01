"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import SharedCollectionHeader from "@/components/collections/shared-collection-header";

function SharedCollectionPageContainer({ slug, collectionDetails, links, p }) {
  const sortedLinks = links.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getDate();
  });

  // Pagination
  const url = `/c/${slug}`;
  const pp = parseInt(p);
  if (!isFinite(pp)) {
    return redirect(url + "?p=1");
  }
  if (!p) {
    return redirect(url + "?p=1");
  }
  const itemsPerPage = 12;
  let pagesCount =
    links.length % itemsPerPage >= 1
      ? Math.floor(links.length / itemsPerPage + 1)
      : links.length / itemsPerPage;
  if (Math.floor(pagesCount) === 0) {
    pagesCount = Math.floor(pagesCount) + 1;
  }
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  let startPages, endPages;

  if (pagesCount <= 5) {
    startPages = pages;
  } else if (pagesCount > 5) {
    startPages = pages.slice(0, 3);
    if (pagesCount <= 8) {
      endPages = pages.reverse().slice(0, 2);
    } else {
      endPages = pages.reverse().slice(0, 3).reverse();
    }
  }
  // Redirect to latest page if page number is invalid
  if (parseInt(pp) > pagesCount) {
    return redirect(url + `?p=${pagesCount}`);
  }
  if (parseInt(pp) <= 0) {
    return redirect(url + "?p=1");
  }

  const pagedLinks = sortedLinks.slice(
    (pp - 1) * itemsPerPage,
    pp * itemsPerPage,
  );

  function LinkBox({ LinkId, title, url, shortUrl }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
      const currentUrl = window.location.origin;
      await navigator.clipboard.writeText(`${currentUrl}/${shortUrl}`);
      setCopied(true);
    };

    return (
      <div className="relative rounded-lg bg-white/10 hover:bg-white/20  shadow-lg hover:shadow-none tansition duration-200 h-48 max-w-[350px] py-5">
        <div className="flex flex-col w-auto px-5">
          {title ? (
            <>
              <h2 className="text-xl font-bold my-0 line-clamp-2">
                {title.split(/[- ]+/).slice(0, 5).join(" ")}
                {title.split(" ").length > 6 && "..."}
              </h2>
              <p className="font-light text-sm line-clamp-1">{url}</p>
            </>
          ) : (
            <h2 className="text-xl font-bold my-0 line-clamp-3">{url}</h2>
          )}
        </div>
        <div className="absolute bottom-0 inset-x-0 p-4">
          <div className="flex justify-end items-end">
            <div className="flex">
              {copied ? (
                <Button className="bg-green-500 hover:bg-green-300">
                  Copied!
                </Button>
              ) : (
                <Button variant="ghost2" onClick={() => handleCopy()}>
                  Copy Url
                </Button>
              )}
              <Button variant="ghost2" asChild>
                <Link href={url} target="_blank">
                  Open
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <SharedCollectionHeader
        title={collectionDetails.name}
        description={collectionDetails.description}
      />
      <div className="pb-12 px-5">
        <div className="flex flex-col gap-2 py-5">
          {!links.length ? (
            <p className="text-lg font-semibold text-center mt-5">
              Nothing here yet
            </p>
          ) : (
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense gap-3">
              {pagedLinks.map((link, index) => (
                <LinkBox
                  key={index}
                  LinkId={link.id}
                  title={link.name}
                  url={link.link}
                  shortUrl={link.slug}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SharedCollectionPageContainer;
