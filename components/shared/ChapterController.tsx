"use client";
import Link from "next/link";
import { useState } from "react";
import { Check, ChevronFirst, ChevronLast, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChapterControllerProps {
  params: { slug: string; id: number };
  chapterData: ChapterData;
}

interface ChapterData {
  images: ImageChapter[];
  chapters: Chapter[];
  chapter_name: string;
  comic_name: string;
}

interface ImageChapter {
  page: number;
  src: string;
  backup_src: string;
}

interface Chapter {
  id: number;
  name: string;
}

const ChapterController: React.FC<ChapterControllerProps> = ({
  chapterData,
  params,
}) => {
  const chapter_id = params.id;
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const chapters = chapterData.chapters;

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
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-65 py-2 flex items-center justify-center gap-2 lg:gap-5">
      <Link
        href={`/comic/${params.slug}/${handleChangeChapter("prev")}`}
        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
          handleChangeChapter("prev") === chapter_id
            ? "bg-neutral-500 cursor-not-allowed"
            : "bg-emerald-100 text-emerald-500"
        }`}
      >
        <ChevronFirst size={26} />
        <span className="hidden lg:block">Chương trước</span>
      </Link>
      <Link
        href={`/comic/${params.slug}/${handleChangeChapter("next")}`}
        className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${
          handleChangeChapter("next") === chapter_id
            ? "bg-neutral-500 cursor-not-allowed"
            : "bg-emerald-100 text-emerald-500"
        }`}
      >
        <span className="hidden lg:block">Chương sau</span>
        <ChevronLast size={26} />
      </Link>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {
              chapters.find((chapter: Chapter) => chapter.id == chapter_id)
                ?.name
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 max-h-[40vh] overflow-y-auto">
          <Command>
            <CommandInput placeholder="Tìm kiếm chương..." />
            <CommandEmpty>Không tìm thấy</CommandEmpty>
            <CommandGroup>
              {chapters.map((chapter) => (
                <CommandItem
                  key={chapter.name}
                  value={chapter.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === chapter.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <Link
                    href={`/comic/${params.slug}/${chapter.id}`}
                    className="truncate"
                  >
                    {chapter.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChapterController;
