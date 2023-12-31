"use client";
import { getTop } from "@/apis";
import ComicListWithoutTitle from "@/components/shared/ComicListWithoutTitle";
import PaginationComics from "@/components/shared/PaginationComics";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import { Comic } from "@/types/comic";
import { topComic } from "@/utils/topComic";
import { useEffect, useState } from "react";

interface TopPageProps {
  comics: Comic[];
  total_pages: number;
  current_page: number;
}

const TopPage = () => {
  const [comics, setComics] = useState<TopPageProps>({
    comics: [],
    total_pages: 1,
    current_page: 1,
  });
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "ongoing" | "completed"
  >("all");
  const [selectedType, setSelectedType] = useState<
    "daily" | "weekly" | "monthly" | "chapter" | "follow"
  >("daily");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTopComic = async () => {
      try {
        const response = await getTop(
          selectedType,
          currentPage,
          selectedStatus
        );
        setComics(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch top comics:", error);
        setIsLoading(false);
      }
    };
    fetchTopComic();
  }, [selectedStatus, selectedType, currentPage]);

  return (
    <section>
      <h1 className="font-bold text-4xl text-emerald-500">Truyện mới</h1>
      <div className="flex items-center flex-wrap gap-2 mt-3">
        {topComic.map((type) => (
          <div
            className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
              type.id === selectedType
                ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
                : "bg-neutral-100 dark:bg-neutral-800"
            }`}
            key={type.id}
            onClick={() =>
              setSelectedType(
                type.id as "daily" | "weekly" | "monthly" | "chapter" | "follow"
              )
            }
          >
            {type.name}
          </div>
        ))}
      </div>
      <StatusComicSelect {...{ selectedStatus, setSelectedStatus }} />
      <div className="mt-5">
        <ComicListWithoutTitle comicData={comics.comics} loading={isLoading} />
      </div>
      <div className="my-5">
        <PaginationComics
          total_pages={comics.total_pages}
          pages_displayed={5}
          current_page={comics.current_page}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default TopPage;
