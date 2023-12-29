"use client";
import React, { useState, useEffect } from "react";
import { Chapter } from "@/types/comic";
import Link from "next/link";

interface ChapterListProps {
  chapterList: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = ({ chapterList }) => {
  const [chapterListShow, setChapterListShow] = useState<Chapter[]>([]);
  const [selectedRange, setSelectedRange] = useState(0);

  useEffect(() => {
    // Reverse a copy of chapterList and then slice it
    const reversedList = [...chapterList].reverse();
    setChapterListShow(
      reversedList.slice(selectedRange * 50, (selectedRange + 1) * 50)
    );
  }, [chapterList, selectedRange]);

  const handleRangeClick = (index: number) => {
    setSelectedRange(index);
  };

  const rangeButtons = Array.from(
    { length: Math.ceil(chapterList.length / 50) },
    (_, index) => (
      <button
        key={index}
        className={`px-2 py-0.5 rounded-full text-sm ${
          index === selectedRange
            ? "bg-emerald-100 text-emerald-500 dark:bg-emerald-800 dark:text-emerald-400"
            : "bg-neutral-100 dark:bg-neutral-800"
        }`}
        onClick={() => handleRangeClick(index)}
      >
        {index * 50 + 1} - {(index + 1) * 50}
      </button>
    )
  );

  return (
    <div>
      <div className="my-3 flex flex-wrap gap-2">{rangeButtons}</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {chapterListShow.map((chapter) => (
          <Link
            href={`/chapter/${chapter.id}`}
            key={chapter.id}
            className="border border-gray-300 dark:border-gray-700 rounded-md p-3 hover:bg-emerald-100 dark:hover:bg-emerald-700 hover:border-emerald-400 transition-colors"
          >
            <div className="text-sm">{chapter.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
