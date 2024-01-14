import { getChapterDetail } from "@/apis";
import FallbackImage from "@/components/shared/FallbackImage";
import type { Metadata } from "next";
import Link from "next/link";
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

const getChapter = async ({ params }: Props) => {
  const comic_id = params.slug;
  var chapter_id = +params.id;
  const chapter = await getChapterDetail(comic_id, chapter_id);
  return chapter;
};

const ChapterPage = async ({ params }: Props) => {
  const chapter_id = params.id;
  const chapterData = await getChapter({
    params: { slug: params.slug, id: chapter_id },
  });

  const handleChangeChapter = (direction: "prev" | "next") => {
    const chapterList = [...chapterData.chapters].reverse();
    const chapterIdx = chapterList.findIndex(
      (chapter: any) => chapter.id === Number(chapter_id)
    );
    const nextChapterIdx = chapterIdx + (direction === "next" ? 1 : -1);

    if (nextChapterIdx < 0 || nextChapterIdx >= chapterList.length) {
      return chapter_id;
    } else {
      return chapterList[nextChapterIdx].id;
    }
  };

  return (
    <section className="relative">
      <div className="flex items-center gap-3 lg:text-xl">
        <Link href={`/comic/${params.slug}`} className="hover:text-emerald-500">
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
            <FallbackImage
              src={image.src}
              backupSrc={image.backup_src}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-65 py-2 flex items-center justify-center gap-5">
        <Link
          href={`/comic/${params.slug}/${handleChangeChapter("prev")}`}
          className={`px-3 py-1 rounded-full text-sm ${
            handleChangeChapter("prev") === chapter_id
              ? "bg-neutral-500 cursor-not-allowed"
              : "bg-emerald-100 text-emerald-500"
          }`}
        >
          Chương trước
        </Link>
        <Link
          href={`/comic/${params.slug}/${handleChangeChapter("next")}`}
          className={`px-3 py-1 rounded-full text-sm ${
            handleChangeChapter("next") === chapter_id
              ? "bg-neutral-500 cursor-not-allowed"
              : "bg-emerald-100 text-emerald-500"
          }`}
        >
          Chương sau
        </Link>
        <button className="px-3 py-1 rounded-full text-sm">
          Tất cả chương
        </button>
      </div>
    </section>
  );
};

export default ChapterPage;
