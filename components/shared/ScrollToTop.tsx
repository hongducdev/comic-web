"use client";
import { ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100); // show button above 100px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button className="fixed bottom-10 right-10 bg-neutral-200 dark:bg-neutral-800 w-16 h-16 flex items-center justify-center rounded-full z-30" onClick={scrollToTop}>
        <ChevronsUp size={36} />
      </button>
    )
  );
};

export default ScrollToTop;
