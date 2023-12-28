import { getDetailComic } from "@/apis";
import ChapterList from "@/components/ChapterList";
import FallbackImage from "@/components/shared/FallbackImage";
import { Genre } from "@/types/comic";
import { formatNumber } from "@/utils/convert";
import type { Metadata } from "next";
import Link from "next/link";
import { RiEyeLine, RiUserFollowLine } from "react-icons/ri";

type Props = {
  params: { slug: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // read route params
  const comic_id = params.slug;

  // fetch data
  const comic = await getDetailComic(comic_id);

  return {
    title: comic.title,
    description: comic.description,
    openGraph: {
      title: comic.title,
      description: comic.description,
      type: "website",
      images: [comic.thumbnail],
    },
  };
};

export const getComic = async ({ params }: Props) => {
  const comic_id = params.slug;
  const comic = await getDetailComic(comic_id);
  return comic;
};

const DetailComicPage = async ({ params }: Props) => {
  const comic_id = params.slug;
  const comicData = await getComic({ params: { slug: comic_id } });

  return (
    <section>
      <div className="flex items-center gap-10">
        <div className="relative w-1/5 h-[400px]">
          <FallbackImage
            src={comicData.thumbnail}
            alt={comicData.title}
            layout="fill"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col gap-3 w-3/5">
          <h1 className="text-4xl font-bold">{comicData.title}</h1>
          <div className="flex flex-wrap items-center gap-3">
            {comicData.genres.map((genre: Genre) => (
              <Link
                href={`/genre/${genre.id}`}
                key={genre.id}
                className="border border-gray-300 dark:border-gray-700 rounded-md p-3 hover:bg-emerald-100 dark:hover:bg-emerald-700 hover:border-emerald-400 transition-colors px-2 py-1"
              >
                {genre.name}
              </Link>
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {comicData.other_names.map((name: string) => name).join(", ")}
          </div>
          <div className="font-semibold">
            Tác giả:{" "}
            <span className="text-emerald-500 font-medium">
              {comicData.authors}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <RiEyeLine />
              <span>{formatNumber(comicData.total_views)}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <RiUserFollowLine />
              <span>{formatNumber(comicData.followers)}</span>
            </div>
          </div>
          <p className="">{comicData.description}</p>
        </div>
      </div>

      <div className=" mt-14">
        <h2 className="text-2xl font-semibold relative after:absolute after:w-full after:h-0.5 after:bg-emerald-500 after:-bottom-0.5 after:left-0">
          Danh sách chương
        </h2>
        <div className="">
          <ChapterList chapterList={comicData.chapters} />
        </div>
      </div>
    </section>
  );
};

export default DetailComicPage;
