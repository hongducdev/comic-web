import { getListComic } from "@/apis";
import ComicList from "@/components/shared/ComicList";
import SkeletonComicList from "@/components/shared/SkeletonComicList";
import { Suspense } from "react";

const fetchListComic = async ({
  type,
  page,
}: {
  type: string;
  page: number;
}) => {
  try {
    const response = await getListComic(type, page);
    if (response.comics) {
      return response.comics;
    } else {
      throw new Error(`Failed to fetch comics: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching comics:", error);
    throw error; // Re-throw to handle higher up
  }
};

const HomePage = async () => {
  const [popularComics, completedComics, boyComics, girlComics] =
    await Promise.all([
      fetchListComic({ type: "trending-comics", page: 1 }),
      fetchListComic({ type: "completed-comics", page: 1 }),
      fetchListComic({ type: "boy-comics", page: 1 }),
      fetchListComic({ type: "girl-comics", page: 1 }),
    ]);

  return (
    <section className="flex flex-col gap-5">
      <Suspense fallback={<SkeletonComicList />}>
        <ComicList
          name="Truyện thịnh hành"
          url="/category/trending-comics"
          comicData={popularComics}
          limit={10}
        />
      </Suspense>
      <Suspense fallback={<SkeletonComicList />}>
        <ComicList
          name="Truyện hoàn thành"
          url="/category/completed-comics"
          comicData={completedComics}
          limit={10}
        />
      </Suspense>
      <Suspense fallback={<SkeletonComicList />}>
        <ComicList
          name="Truyện con trai"
          url="/category/boy-comics"
          comicData={boyComics}
          limit={10}
        />
      </Suspense>
      <Suspense fallback={<SkeletonComicList />}>
        <ComicList
          name="Truyện con trai"
          url="/category/girl-comics"
          comicData={girlComics}
          limit={10}
        />
      </Suspense>
    </section>
  );
};

export default HomePage;
