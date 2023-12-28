import { Comic } from "@/types/comic";
import { formatNumber, status } from "@/utils/convert";
import Link from "next/link";
import React from "react";
import FallbackImage from "./FallbackImage";
import { RiEyeLine, RiUserFollowLine } from "react-icons/ri";

interface ComicCardProps {
  comic: Comic;
}

const ComicCard: React.FC<ComicCardProps> = ({ comic }) => {
  return (
    <div className="h-auto bg-neutral-50 dark:bg-neutral-900 rounded-md relative group">
      <div className="absolute top-2 left-2 z-[2] flex item gap-2 text-white">
        <div className="flex items-center gap-1 bg-black bg-opacity-80 px-1 py-0.5 text-sm rounded-md">
          <RiEyeLine />
          {formatNumber(comic.total_views)}
        </div>
        <div className="flex items-center gap-1 bg-black bg-opacity-80 px-1 py-0.5 text-sm rounded-md">
          <RiUserFollowLine />
          {formatNumber(comic.followers)}
        </div>
      </div>
      <Link href={`/comic/${comic.id}`}>
        <div className="w-full h-[200px] relative">
          <FallbackImage
            src={comic.thumbnail}
            alt={comic.title}
            fill
            className="w-full h-full object-cover rounded-t-md"
          />
        </div>
        <div className="p-2">
          <div className="inline-flex items-center gap-2 bg-neutral-300 dark:bg-neutral-700 px-1 py-[1px] rounded-full">
            <div className="bg-green-500 h-3 w-3 rounded-full"></div>
            <div className="text-xs flex items-center gap-0.5">
              <span className="">
                {status.find((item) => item.value === comic.status)?.label}
              </span>
              •<span className="">{comic.last_chapter.name}</span>
            </div>
          </div>
          <h3 className="line-clamp-2 font-semibold mt-2 group-hover:text-green-500">
            {comic.title}
          </h3>
          <p className="line-clamp-3 text-sm mt-3 text-neutral-500">
            {comic.short_description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ComicCard;
