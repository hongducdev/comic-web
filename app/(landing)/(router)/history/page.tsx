"use client";
import FallbackImage from "@/components/shared/FallbackImage";
import SkeletonComicList from "@/components/shared/SkeletonComicList";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";

interface IHistory {
  comic_id: string;
  chapter_id: number;
  comic_title: string;
  comic_thumbnail: string;
  chapter_name: string;
}

const HistoryPage = () => {
  const { toast } = useToast();
  const [historyObj, setHistoryObj] = useState<IHistory[]>([]);

  useEffect(() => {
    const history = localStorage.getItem("history");
    if (history) {
      setHistoryObj(JSON.parse(history));
    }
  }, []);

  const removeFromHistory = (
    comicId: string,
    chapterId: number,
    comicTitle: string,
    chapterName: string
  ) => {
    const updatedHistory = historyObj.filter(
      (item) => item.comic_id !== comicId || item.chapter_id !== chapterId
    );
    localStorage.setItem("history", JSON.stringify(updatedHistory));
    setHistoryObj(updatedHistory);
    toast({
      title: "Đã xóa khỏi lịch sử",
      description: `Đã xóa khỏi lịch sử: ${comicTitle} - ${chapterName}`,
    });
  };

  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-bold text-4xl text-emerald-500">
        Lịch sử đọc truyện
      </h1>
      <Suspense fallback={<SkeletonComicList />}>
        {historyObj.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-5">
            {historyObj.map((item: any) => {
              return (
                <div
                  className="h-auto bg-neutral-50 dark:bg-neutral-900 rounded-md relative group"
                  key={item.comic_title}
                >
                  <div className="w-full h-[200px] relative">
                    <FallbackImage
                      src={item.comic_thumbnail}
                      alt={item.comic_title}
                      fill
                      className="w-full h-full object-cover rounded-t-md"
                    />
                  </div>
                  <div className="p-2">
                    <div className="inline-flex items-center gap-2 bg-neutral-300 dark:bg-neutral-700 px-1 py-[1px] rounded-full">
                      <div className="bg-emerald-500 h-3 w-3 rounded-full"></div>
                      <div className="text-xs flex items-center gap-0.5">
                        <span className="">{item.chapter_name}</span>
                      </div>
                    </div>
                    <h3 className="line-clamp-2 font-semibold mt-2 group-hover:text-emerald-500">
                      {item.comic_title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400 py-2 px-4 rounded-md w-full flex-1 text-center">
                        <Link
                          href={`/comic/${item.comic_id}/${item.chapter_id}`}
                        >
                          Đọc tiếp
                        </Link>
                      </div>
                      <div
                        className="bg-red-200 dark:bg-red-500 p-3 rounded-md"
                        onClick={() =>
                          removeFromHistory(
                            item.comic_id,
                            item.chapter_id,
                            item.comic_title,
                            item.chapter_name
                          )
                        }
                      >
                        <RiDeleteBin2Fill />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[500px] text-center flex items-center justify-center">
            <h3 className="text-xl font-semibold">Không có lịch sử</h3>
          </div>
        )}
      </Suspense>
    </section>
  );
};

export default HistoryPage;
