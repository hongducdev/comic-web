"use client";
import { getTrending } from "@/apis";
import ComicList from "@/components/shared/ComicList";
import { Comic } from "@/types/comic";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [popularComics, setPopularComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getPopularComics = async () => {
      const response = await getTrending(1);
      setIsLoading(false);
      setPopularComics(response.comics);
    };
    getPopularComics();
  }, []);

  return (
    <section className="max-w-[1280px] mx-auto">
      <ComicList
        name="Trending"
        url="/trending"
        comicData={popularComics}
        loading={isLoading}
      />
    </section>
  );
};

export default HomePage;
