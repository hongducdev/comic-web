import { Comic } from "@/types/comic";
import React from "react";
import ComicCard from "./ComicCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SkeletonComicCard from "./SkeletonComicCard";
import { Skeleton } from "../ui/skeleton";

interface ComicListProps {
  name: string;
  url: string;
  comicData: Comic[];
  loading?: boolean;
}

const ComicList: React.FC<ComicListProps> = ({
  name,
  url,
  comicData,
  loading,
}) => {
  return (
    <>
      {loading ? (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="w-1/5 h-10" />
            <Skeleton className="w-[100px] h-10" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
            {Array.from(Array(10).keys()).map((index) => (
              <SkeletonComicCard key={index} />
            ))}
          </div>
        </section>
      ) : (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-emerald-500">{name}</h3>
            <Link className={buttonVariants({ variant: "outline" })} href={url}>
              Xem thêm
            </Link>
          </div>
          {!loading && comicData.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
              {comicData.slice(0, 10).map((comic: Comic) => {
                return <ComicCard key={comic.id} comic={comic} />;
              })}
            </div>
          ) : (
            <p className="text-gray-400">Không có dữ liệu</p>
          )}
        </section>
      )}
    </>
  );
};

export default ComicList;
