"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationComicsProps {
  total_pages: number;
  pages_displayed: number;
  current_page: number;
}

const PaginationComics: React.FC<PaginationComicsProps> = ({
  total_pages,
  pages_displayed,
  current_page,
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.has("tab") ? searchParams.get("tab") : "daily";
  const filter = searchParams.has("filter") ? searchParams.get("filter") : "all";
  const path = `${pathName}?tab=${tab}&filter=${filter}&page=`;

  const half = Math.floor(pages_displayed / 2);
  let start = Math.max(current_page - half, 1);
  let end = Math.min(start + pages_displayed - 1, total_pages);

  if (total_pages - end < half) {
    start = Math.max(total_pages - pages_displayed + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          isActive={current_page !== 1}
          href={`${path}${current_page - 1}`}
        >
          Previous
        </PaginationPrevious>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === current_page}
              href={`${path}${page}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationNext
          isActive={current_page !== total_pages}
          href={`${path}${current_page + 1}`}
        >
          Next
        </PaginationNext>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComics;
