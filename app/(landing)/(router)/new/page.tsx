import { getNewComics } from "@/apis";
import { Metadata } from "next";
import Pagination from "@/components/shared/Pagination";
import StatusComicSelect from "@/components/shared/StatusComicSelect";
import { Suspense } from "react";
import SkeletonComicList from "@/components/shared/SkeletonComicList";
import ComicList from "@/components/shared/ComicList";

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
    title: `Truyện mới - Trang ${page}`,
  };
}

const NewPage = async ({ searchParams }: Props) => {
  const filter =
    typeof searchParams.filter === "string" ? searchParams.filter : "all";
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const data = await getNewComics(page, filter);
  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-4xl text-emerald-500">Truyện mới</h1>
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

export default NewPage;
