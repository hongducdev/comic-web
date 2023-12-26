import React, { useEffect, useRef } from "react";
import { SearchSuggestion } from "@/types/search";
import Image from "next/image";
import Link from "next/link";

interface SearchResultsProps {
  searchData: SearchSuggestion[];
  onClose: () => void; // Add a prop for the close function
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
        onClose(); // Call the onClose prop when a click outside is detected
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <>
      <div className="absolute w-full top-full mt-2" ref={containerRef}>
        {searchData.length > 0 ? (
          <ul className="bg-white dark:bg-neutral-950 border border-gray-200 dark:border-neutral-800 rounded-md w-full max-h-[300px] overflow-y-auto">
            {searchData.map((result) => (
              <li key={result.id}>
                <Link href={`/comic/${result.id}`}>
                  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-900 w-full">
                    <div className="relative w-1/5 h-[100px]">
                      <Image
                        src={result.thumbnail}
                        fill
                        alt={result.title}
                        className="rounded-md w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col text-sm">
                      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {result.title}
                      </span>
                      <span>{result.lastest_chapter}</span>
                      <span className="font-medium text-green-500">
                        {result.authors.map((author) => author).join(", ")}
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
