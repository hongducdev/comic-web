"use client";
import { useEffect, useState, useCallback } from "react";
import { getComicByGenre, getGenres } from "@/apis";
import PaginationComics from "@/components/shared/PaginationComics";
import { Comic, Genre } from "@/types/comic";
import { RiInformationFill } from "react-icons/ri";
import { Skeleton } from "@/components/ui/skeleton";
import ComicListWithoutTitle from "@/components/shared/ComicListWithoutTitle";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import GenreMobile from "@/components/GenreMobile";

interface ComicFromGenreProps {
  comics: Comic[];
  total_pages: number;
  current_page: number;
}

const GenresPage = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "ongoing" | "completed"
  >("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comics, setComics] = useState<ComicFromGenreProps>({
    comics: [],
    total_pages: 1,
    current_page: 1,
  });
  const [isLoadingGenre, setIsLoadingGenre] = useState<boolean>(false);
  const [isLoadingComic, setIsLoadingComic] = useState<boolean>(false);

  useEffect(() => {
    setIsLoadingGenre(true);
    const fetchGenres = async () => {
      try {
        const response = await getGenres();
        setIsLoadingGenre(false);
        setGenres(response);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setIsLoadingGenre(false);
      }
    };
    fetchGenres();
  }, []);

  const fetchComicByGenre = useCallback(async () => {
    setIsLoadingComic(true);
    try {
      const response = await getComicByGenre(
        selectedGenre,
        currentPage,
        selectedStatus
      );
      setComics(response);
      setIsLoadingComic(false);
    } catch (error) {
      console.error("Failed to fetch comics by genre:", error);
      setIsLoadingComic(false);
    }
  }, [selectedGenre, selectedStatus, currentPage]);

  useEffect(() => {
    fetchComicByGenre();
  }, [fetchComicByGenre]);

  return (
    <section>
      <h1 className="font-bold text-4xl text-emerald-500">Thể loại</h1>
      {isLoadingGenre ? (
        <Skeleton className="mt-3 w-full h-8" />
      ) : (
        <div className="hidden lg:flex items-center flex-wrap gap-2 mt-3">
          {genres.map((genre) => (
            <div
              className={`px-2 py-0.5 rounded-full text-sm cursor-pointer ${
                genre.id === selectedGenre
                  ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
                  : "bg-neutral-100 dark:bg-neutral-800"
              }`}
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
      <GenreMobile {...{ genres, selectedGenre, setSelectedGenre }} />
      <div className="mt-3 bg-blue-500 text-white px-3 py-2 rounded-md flex items-center gap-3">
        <RiInformationFill className="text-xl" />
        {genres.find((genre) => genre.id === selectedGenre)?.description}
      </div>
      <StatusComicSelect {...{ selectedStatus, setSelectedStatus }} />
      <div className="mt-5">
        <ComicListWithoutTitle
          comicData={comics.comics}
          loading={isLoadingComic}
        />
      </div>
      <div className="my-3">
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

export default GenresPage;
