import { Comic } from "@/types/comic";
import React from "react";
import ComicCard from "./ComicCard";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface ComicListProps {
  name?: string;
  url?: string;
  comicData: Comic[];
  limit?: number;
}

const ComicList: React.FC<ComicListProps> = ({
  name,
  url,
  comicData,
  limit,
}) => {
  return (
    <section>
      {url && (
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-bold text-emerald-500">{name}</h3>
          <Link className={buttonVariants({ variant: "outline" })} href={url}>
            Xem thêm
          </Link>
        </div>
      )}
      {comicData.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
          {limit
            ? comicData.slice(0, limit).map((comic: Comic) => {
                return <ComicCard key={comic.id} comic={comic} />;
              })
            : comicData.map((comic: Comic) => {
                return <ComicCard key={comic.id} comic={comic} />;
              })}
        </div>
      ) : (
        <p className="text-gray-400">Không có dữ liệu</p>
      )}
    </section>
  );
};

export default ComicList;
