import React, { Suspense } from "react";
import { Metadata } from "next";
import { getTop } from "@/apis";
import { topComic } from "@/utils/topComic";
import PaginationComics from "@/components/shared/PaginationComics";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import ComicCard from "@/components/shared/ComicCard";
import { Comic } from "@/types/comic";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const tab = searchParams.tab ? searchParams.tab : "daily";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  // return metadata
  return {
    title: `${topComic.find((item) => item.id === tab)?.name} - Trang ${page}`,
  };
}

const TopPage = async ({ searchParams }: Props) => {
  const tab = typeof searchParams.tab === "string" ? searchParams.tab : "daily";
  const filter =
    typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const data = await getTop(tab, page, filter);

  return (
    <section className="flex flex-col gap-5">
      <StatusComicSelect />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
          {data.comics.map((comic: Comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      </Suspense>
      <PaginationComics
        total_pages={data.total_pages}
        pages_displayed={5}
        current_page={data.current_page}
      />
    </section>
  );
};

export default TopPage;
