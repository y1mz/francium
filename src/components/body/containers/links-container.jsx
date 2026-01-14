"use client";

import LinkBox from "@/components/shorter/link-box";
import LinksHeader from "@/components/body/links-header";

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

function LinkContainer({ links, p, session, collections }) {
  const [searchResults, setSearchResults] = useState({});

  const shortedLinks = links.sort((a, b) => {
    let dateA = new Date(a.createdAt);
    let dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  // Pagination

  const url = "/links";
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
  let startPages, endPages, middlePages;

  if (pagesCount <= 5) {
    startPages = pages;
  } else if (pagesCount > 5) {
    startPages = pages.slice(0, 3);
    if (pagesCount <= 8) {
      endPages = pages.reverse().slice(0, 2);
    } else {
      const mid = Math.floor(pages.length / 2);
      middlePages = pages.slice(mid - 1, mid + 1);
      endPages = pages.reverse().slice(0, 3);
    }
  }

  // Redirect to latest page if page number is invalid
  if (parseInt(pp) > pagesCount) {
    return redirect(url + `?p=${pagesCount}`);
  }
  if (parseInt(pp) <= 0) {
    return redirect(url + "?p=1");
  }

  const pagedLinks = shortedLinks.slice(
    (pp - 1) * itemsPerPage,
    pp * itemsPerPage,
  );

  return (
    <div className="pb-10">
      <LinksHeader
        shortLinks={shortedLinks}
        session={session}
        title="My Links"
      />
      <div className="pb-12 px-5">
        <div className="flex flex-col gap-2 py-5">
          {!links.length ? (
            <p className="text-lg font-semibold text-center mt-5">
              Nothing here yet
            </p>
          ) : (
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {pagedLinks.map((link) => (
                <LinkBox
                  key={link.id}
                  LinkId={link.id}
                  title={link.name}
                  url={link.link}
                  shortUrl={link.slug}
                  cDate={link.createdAt}
                  active={link.active}
                  userCol={collections}
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
                {(middlePages || endPages) && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {middlePages &&
                  middlePages.map((number, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href={url + `?p=${number}`}
                        isActive={pp == number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                {middlePages && endPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                {endPages &&
                  endPages.reverse().map((number, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href={url + `?p=${number}`}
                        isActive={pp == number}
                      >
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
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

export default LinkContainer;
