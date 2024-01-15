import { getListComic } from "@/apis";
import ComicList from "@/components/shared/ComicList";
import Pagination from "@/components/shared/Pagination";
import SkeletonComicList from "@/components/shared/SkeletonComicList";
import { categoryList } from "@/utils/category";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (categoryList.find((item) => item.id === slug) === undefined) {
    return {
      title: "Không tìm thấy trang",
    };
  }

  return {
    title: `${
      categoryList.find((item) => item.id === slug)?.name
    } - Trang ${page} | HDD Comics`,
  };
}

const CategoryPage = async ({ params, searchParams }: Props) => {
  const slug = params.slug;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  if (categoryList.find((item) => item.id === slug) === undefined) {
    return (
      <div className="flex items-center justify-center">
        <h1>Không tìm thấy trang</h1>
      </div>
    );
  }

  const data = await getListComic(slug, page);

  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-4xl text-emerald-500">
        {categoryList.find((item) => item.id === slug)?.name}
      </h1>
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

export default CategoryPage;
