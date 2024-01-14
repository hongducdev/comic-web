"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  total_pages: number;
  pages_displayed: number;
  current_page: number;
}

const Pagination: React.FC<PaginationProps> = ({
  total_pages,
  pages_displayed,
  current_page,
}) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.has("tab") ? searchParams.get("tab") : "daily";
  const filter = searchParams.has("filter")
    ? searchParams.get("filter")
    : "all";
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
    <div className="w-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Link
          href={`${path}${current_page - 1}`}
          className={cn(
            "inline-flex gap-1 items-center px-4 py-2 hover:bg-neutral-100 hover:dark:bg-neutral-800 rounded-md",
            {
              "pointer-events-none": current_page === 1,
            }
          )}
        >
          <ChevronLeft size={16} /> Lùi
        </Link>
        {pages.map((page) => (
          <Link
            key={page}
            href={`${path}${page}`}
            className={cn("inline-flex items-center px-4 py-2 rounded-md", {
              "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400":
                page === current_page,
            })}
          >
            {page}
          </Link>
        ))}
        <Link
          href={`${path}${current_page + 1}`}
          className={cn(
            "inline-flex gap-1 items-center px-4 py-2 hover:bg-neutral-100 hover:dark:bg-neutral-800 rounded-md",
            {
              "pointer-events-none": current_page === total_pages,
            }
          )}
        >
          Tiếp <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
