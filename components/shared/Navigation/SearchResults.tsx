import React, { useEffect, useRef } from "react";
import { SearchSuggestion } from "@/types/search";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  searchData: SearchSuggestion[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchData,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <>
      <div
        className="absolute w-full lg:w-1/3 top-full right-0 lg:right-5 mt-2 lg:mt-0 z-30"
        ref={containerRef}
      >
        {searchData.length > 0 ? (
          <ul className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-md w-full max-h-[200px] lg:max-h-[300px] overflow-y-auto">
            {searchData.map((result) => (
              <li key={result.id}>
                <Link href={`/comic/${result.id}`}>
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 w-full">
                    <div className="relative w-[100px] h-[100px]">
                      <Image
                        src={result.thumbnail}
                        fill
                        alt={result.title}
                        className="rounded-md w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-xs lg:text-sm">
                      <span className="text-base lg:text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {result.title}
                      </span>
                      <span className="text-emerald-500">
                        {result.lastest_chapter}
                      </span>
                      <div className="">
                        {result.genres.map((genre) => genre).join(", ")}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-md w-full max-h-[300px] overflow-y-auto">
            <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 w-full">
              <div className="flex flex-col text-sm">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Không tìm thấy kết quả
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
