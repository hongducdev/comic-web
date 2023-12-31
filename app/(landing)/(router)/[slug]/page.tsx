"use client";
import { getListComic } from "@/apis";
import ComicListWithoutTitle from "@/components/shared/ComicListWithoutTitle";
import PaginationComics from "@/components/shared/PaginationComics";
import { Comic } from "@/types/comic";
import { categoryList } from "@/utils/category";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface CategoryPageProps {
  comics: Comic[];
  total_pages: number;
  current_page: number;
}

const CategoryPage = () => {
  const { slug } = useParams();
  const [comics, setComics] = useState<CategoryPageProps>({
    comics: [],
    total_pages: 1,
    current_page: 1,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchComics = async () => {
      try {
        const response = await getListComic(
          slug as
            | "trending-comics"
            | "boy-comics"
            | "girl-comics"
            | "completed-comics",
          currentPage
        );
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
        setIsLoading(false);
      }
    };
    
  }, [slug, currentPage]);

  return (
    <section>
      <h1 className="font-bold text-4xl text-emerald-500">
        {categoryList.find((category) => category.id === slug)?.name ||
          "Không tìm thấy trang"}
      </h1>
      <div className="mt-5">
        <ComicListWithoutTitle
          comicData={comics.comics}
          loading={isLoading}
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

export default CategoryPage;
