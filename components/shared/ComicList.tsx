import { Comic } from "@/types/comic";
import React from "react";
import ComicCard from "./ComicCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import SkeletonComicCard from "./SkeletonComicCard";

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
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-green-500">{name}</h3>
        <Link className={buttonVariants({ variant: "outline" })} href={url}>
          Xem thêm
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-5 gap-5">
          {Array.from(Array(10).keys()).map((index) => (
            <SkeletonComicCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-5">
          {comicData.slice(0, 10).map((comic: Comic) => {
            return <ComicCard key={comic.id} comic={comic} />;
          })}
        </div>
      )}
    </section>
  );
};

export default ComicList;
