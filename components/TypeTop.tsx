"use client";

import { topComic } from "@/utils/topComic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TypeTop = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.has("tab") ? searchParams.get("tab") : "daily";
  const filter = searchParams.has("filter")
    ? searchParams.get("filter")
    : "all";
  const page = searchParams.has("page") ? searchParams.get("page") : "1";

  return (
    <section className="flex items-center gap-3">
      {topComic.map((item) => (
        <Link
          className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
            item.id === tab
              ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
              : "bg-neutral-100 dark:bg-neutral-800"
          }`}
          key={item.id}
          href={{
            pathname: "/top",
            search: `?tab=${item.id}&filter=${filter}&page=${page}`,
          }}
        >
          {item.name}
        </Link>
      ))}
    </section>
  );
};

export default TypeTop;
