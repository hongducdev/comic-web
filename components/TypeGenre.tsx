"use client";
import { Genre } from "@/types/comic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GenreMobile from "./GenreMobile";

const TypeGenre = ({ genres }: { genres: Genre[] }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.has("tab") ? searchParams.get("tab") : "all";
  const filter = searchParams.has("filter")
    ? searchParams.get("filter")
    : "all";

  return (
    <section>
      <div className="hidden lg:flex items-center flex-wrap gap-2 mt-3">
        {genres.map((genre) => (
          <Link
            className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
              genre.id === tab
                ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
                : "bg-neutral-100 dark:bg-neutral-800"
            }`}
            key={genre.id}
            href={{
              pathname: "/genres",
              search: `?tab=${genre.id}&filter=${filter}`,
            }}
          >
            {genre.name}
          </Link>
        ))}
      </div>
      <GenreMobile genres={genres} tab={tab} filter={filter} />
    </section>
  );
};

export default TypeGenre;
