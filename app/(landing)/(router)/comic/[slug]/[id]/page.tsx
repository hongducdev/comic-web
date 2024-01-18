import { getChapterDetail, getDetailComic } from "@/apis";
import SaveHistory from "@/components/SaveHistory";
import ChapterController from "@/components/shared/ChapterController";
import FallbackImageChapter from "@/components/shared/FallbackImageChapter";
import Loading from "@/components/shared/Loading";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { RiArrowRightSLine } from "react-icons/ri";

type Props = {
  params: { slug: string; id: number };
};

interface ImageChapter {
  page: number;
  src: string;
  backup_src: string;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // read route params
  const comic_id = params.slug;
  var chapter_id = +params.id;

  // fetch data
  const chapter = await getChapterDetail(comic_id, chapter_id);

  return {
    title: `${chapter.chapter_name} - ${chapter.comic_name}`,
    description: chapter.comic_name,
    openGraph: {
      title: chapter.chapter_name,
      description: chapter.comic_name,
      type: "website",
      images: [chapter.images[0].src],
    },
  };
};

const ChapterPage = async ({ params }: Props) => {
  const comic_id = params.slug;
  const chapter_id = params.id;
  const chapterData = await getChapterDetail(comic_id, chapter_id);

  const comicData = await getDetailComic(comic_id);

  return (
    <SaveHistory
      comic_title={comicData.title}
      comic_thumbnail={comicData.thumbnail}
      comic_id={params.slug}
      chapter_id={params.id}
      chapter_name={chapterData.chapter_name}
    >
      <section className="relative">
        <div className="flex items-center gap-3 lg:text-xl">
          <Link
            href={`/comic/${params.slug}`}
            className="hover:text-emerald-500"
          >
            {chapterData.comic_name}
          </Link>
          <RiArrowRightSLine />
          <span>{chapterData.chapter_name}</span>
        </div>
        <div className="mx-auto my-5">
          {chapterData.images.map((image: ImageChapter) => (
            <div
              key={image.page}
              className="relative w-full lg:w-[70%] h-full mx-auto"
            >
              <Suspense fallback={<Loading />}>
                <FallbackImageChapter
                  src={image.src}
                  backupSrc={image.backup_src}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Suspense>
            </div>
          ))}
        </div>
        <ChapterController chapterData={chapterData} params={params} />
      </section>
    </SaveHistory>
  );
};

export default ChapterPage;
