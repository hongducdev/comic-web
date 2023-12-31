"use client";
import { getNewComics } from "@/apis";
import ComicListWithoutTitle from "@/components/shared/ComicListWithoutTitle";
import PaginationComics from "@/components/shared/PaginationComics";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import { Comic } from "@/types/comic";
import { useEffect, useState } from "react";

interface NewPageProps {
  comics: Comic[];
  total_pages: number;
  current_page: number;
}

const NewPage = () => {
  const [comics, setComics] = useState<NewPageProps>({
    comics: [],
    total_pages: 1,
    current_page: 1,
  });
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "ongoing" | "completed"
  >("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewComic = async () => {
      setIsLoading(true);
      try {
        const response = await getNewComics(currentPage, selectedStatus);
        setComics(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch new comics:", error);
        setIsLoading(false);
      }
    };
    fetchNewComic();
  }, [currentPage, selectedStatus]);

  return (
    <section>
      <h1 className="font-bold text-4xl text-emerald-500">Truyện mới</h1>
      <StatusComicSelect {...{ selectedStatus, setSelectedStatus }} />
      <div className="mt-5">
        <ComicListWithoutTitle comicData={comics.comics} loading={isLoading} />
      </div>
      <div className="my-5">
        <PaginationComics
          total_pages={comics.total_pages}
          items_per_page={30}
          current_page={comics.current_page}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default NewPage;
