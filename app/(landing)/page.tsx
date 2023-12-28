"use client";
import { useEffect, useState } from "react";
import { getListComic } from "@/apis";
import ComicList from "@/components/shared/ComicList";
import { Comic } from "@/types/comic";

const HomePage = () => {
  const [popularComics, setPopularComics] = useState<Comic[]>([]);
  const [completedComics, setCompletedComics] = useState<Comic[]>([]);
  const [boyComics, setBoyComics] = useState<Comic[]>([]);
  const [girlComics, setGirlComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchComics = (category: string) => {
      return getListComic(
        category as
          | "trending-comics"
          | "boy-comics"
          | "girl-comics"
          | "completed-comics",
        1
      );
    };

    Promise.all([
      fetchComics("trending-comics").then((response) =>
        setPopularComics(response.comics)
      ),
      fetchComics("completed-comics").then((response) =>
        setCompletedComics(response.comics)
      ),
      fetchComics("boy-comics").then((response) =>
        setBoyComics(response.comics)
      ),
      fetchComics("girl-comics").then((response) =>
        setGirlComics(response.comics)
      ),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch comics:", error);
        // Handle errors as needed
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="max-w-[1280px] mx-auto">
      <ComicList
        name="Đang phổ biến"
        url="/trending-comics"
        comicData={popularComics}
        loading={isLoading}
      />
      <ComicList
        name="Đã hoàn thành"
        url="/completed-comics"
        comicData={completedComics}
        loading={isLoading}
      />
      <ComicList
        name="Dành cho nam"
        url="/boy-comics"
        comicData={boyComics}
        loading={isLoading}
      />
      <ComicList
        name="Dành cho nữ"
        url="/girl-comics"
        comicData={girlComics}
        loading={isLoading}
      />
    </section>
  );
};

export default HomePage;
