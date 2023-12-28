"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else if (theme === "system") {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("light");
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        setTheme("dark");
      } else {
        throw new Error("Error set theme for this app");
      }
    } else {
      throw new Error("Error set theme for this app");
    }
  };

  return (
    <div
      className="w-full h-10 lg:w-10 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center rounded-md"
      onClick={handleToggleTheme}
    >
      <div className="p-2 text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer text-xl">
        {theme === "dark" ? (
          <div className="flex items-center gap-2">
            <RiSunLine />
            <span className="lg:hidden">Chế độ sáng</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <RiMoonClearLine />
            <span className="lg:hidden">Chế độ tối</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
