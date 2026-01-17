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
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import CollectionsHeader from "@/components/collections/collection-header";
import LinkBox from "@/components/shorter/link-box";

function CollectionPageContainer({
  collectionDetails,
  otherCollections,
  links,
  p,
}) {
  const sortedLinks = links.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getDate();
  });

  // Pagination
  const url = "/collection/" + collectionDetails.publicSlug;

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

  return (
    <div className="pb-10">
      <CollectionsHeader
        title={collectionDetails.name}
        description={collectionDetails.description}
        id={collectionDetails.id}
        slug={collectionDetails.publicSlug}
        isCollection={true}
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
                  cDate={link.createdAt}
                  active={link.active}
                  userCol={otherCollections}
                  isCollection={true}
                  currentCollection={collectionDetails}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          {links.length > itemsPerPage && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button variant={pp == 1 && "disabled"} asChild>
                    <PaginationPrevious href={url + `?p=${parseInt(pp) - 1}`} />
                  </Button>
                </PaginationItem>
                {startPages.map((number, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={url + `?p=${number}`}
                      isActive={pp == number}
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {endPages && pp <= 5 ? (
                  <>
                    <PaginationItem>
                      <PaginationLink href={url + `?p=${4}`} isActive={pp == 4}>
                        4
                      </PaginationLink>
                    </PaginationItem>
                    {pp == 5 && (
                      <PaginationItem>
                        <PaginationLink
                          href={url + `?p=${5}`}
                          isActive={pp == 5}
                        >
                          5
                        </PaginationLink>
                      </PaginationItem>
                    )}
                  </>
                ) : (
                  <>
                    {pp > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {endPages && pp < endPages[0] && (
                      <>
                        <PaginationItem>
                          <PaginationLink
                            href={url + `?p=${pp}`}
                            isActive={true}
                          >
                            {pp}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                  </>
                )}
                {endPages && (
                  <>
                    {pp < endPages[0] - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    {endPages.map((number, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href={url + `?p=${number}`}
                          isActive={pp == number}
                        >
                          {number}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </>
                )}
                <PaginationItem>
                  <Button
                    variant={parseInt(pp) == pagesCount && "disabled"}
                    asChild
                  >
                    <PaginationNext href={url + `?p=${parseInt(pp) + 1}`} />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionPageContainer;
