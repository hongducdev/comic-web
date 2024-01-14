import { getComicByGenre, getGenres } from "@/apis";
import TypeGenre from "@/components/TypeGenre";
import ComicList from "@/components/shared/ComicList";
import Pagination from "@/components/shared/Pagination";
import SkeletonComicList from "@/components/shared/SkeletonComicList";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import { Genre } from "@/types/comic";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const getGenresComic = async () => {
  const genres = await getGenres();

  return genres;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const tab = searchParams.tab ? searchParams.tab : "all";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const genres = await getGenresComic();
  const genre = genres.find((genre: Genre) => genre.id === tab);

  // return metadata
  return {
    title: `${genre?.name} - Trang ${page} | HDD Comics`,
    description: genre?.description,
  };
}

const GenresPage = async ({ searchParams }: Props) => {
  const tab = typeof searchParams.tab === "string" ? searchParams.tab : "daily";
  const filter =
    typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const data = await getComicByGenre(tab, page, filter);

  const genres = await getGenresComic();

  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-4xl text-emerald-500">Thể loại</h1>
      <TypeGenre genres={genres} />
      <StatusComicSelect />
      <Suspense fallback={<SkeletonComicList />}>
        <ComicList comicData={data.comics} />
      </Suspense>
      <Pagination
        total_pages={data.total_pages}
        pages_displayed={5}
        current_page={data.current_page}
      />
    </section>
  );
};

export default GenresPage;
