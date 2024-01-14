"use client";
import { statusComic } from "@/utils/statusComic";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const StatusComicSelect = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.has("filter")
    ? searchParams.get("filter")
    : "all";

  return (
    <div className="flex items-center gap-3 mt-5">
      {statusComic.map((status) => (
        <Link
          className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
            status.id === filter
              ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
              : "bg-neutral-100 dark:bg-neutral-800"
          }`}
          key={status.id}
          href={{
            pathname: pathName,
            search: `?tab=${searchParams.get("tab")}&filter=${
              status.id
            }&page=${searchParams.get("page")}`,
          }}
        >
          {status.name}
        </Link>
      ))}
    </div>
  );
};

export default StatusComicSelect;
