"use client";
import { useEffect, useState } from "react";

interface Props {
  comic_title: string;
  comic_thumbnail: string;
  comic_id: string;
  chapter_id: number;
  chapter_name: string;
}

const SaveHistory: React.FC<React.PropsWithChildren<Props>> = ({
  comic_title,
  comic_thumbnail,
  comic_id,
  chapter_id,
  chapter_name,
  children,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleScroll = () => {
    const scrolledDownEnough = window.scrollY > 1000 && !isSaved;
    const scrolledToEnd =
      window.scrollY + window.innerHeight >= document.body.scrollHeight;

    if (scrolledDownEnough) {
      setIsSaved(true);
      // Logic to save to localStorage
      saveToLocalStorage(
        comic_id,
        chapter_id,
        comic_title,
        comic_thumbnail,
        chapter_name
      );
    }

    if (scrolledToEnd) {
      // Logic to remove from localStorage
      removeFromLocalStorage(chapter_id);
    }
  };

  const saveToLocalStorage = (
    comicId: string,
    chapterId: number,
    title: string,
    thumbnail: string,
    name: string
  ) => {
    const history = localStorage.getItem("history");
    let historyObj = history ? JSON.parse(history) : [];
    // Add new item at the beginning
    historyObj = [
      {
        comic_id: comicId,
        chapter_id: chapterId,
        comic_title: title,
        comic_thumbnail: thumbnail,
        chapter_name: name,
      },
      ...historyObj,
    ];
    // Keep only the latest 10 items
    if (historyObj.length > 10) {
      historyObj = historyObj.slice(0, 10);
    }
    localStorage.setItem("history", JSON.stringify(historyObj));
  };

  const removeFromLocalStorage = (chapterId: number) => {
    const history = localStorage.getItem("history");
    if (history) {
      const historyObj = JSON.parse(history);
      const newHistory = historyObj.filter(
        (item: any) => item.chapter_id !== chapterId
      );
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSaved, comic_id, chapter_id]);

  return <section>{children}</section>;
};

export default SaveHistory;

