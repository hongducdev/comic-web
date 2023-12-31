import React from "react";
import SkeletonComicCard from "./SkeletonComicCard";
import ComicCard from "./ComicCard";
import { Comic } from "@/types/comic";

interface ComicListWithoutTitleProps {
  comicData: Comic[];
  loading?: boolean;
}

const ComicListWithoutTitle: React.FC<ComicListWithoutTitleProps> = ({
  comicData,
  loading,
}) => {
  return (
    <div>
      <div className="mt-5">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonComicCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {!loading && comicData.length === 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
                {comicData.map((comic: Comic) => (
                  <ComicCard key={comic.id} comic={comic} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">Không có dữ liệu</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ComicListWithoutTitle;
