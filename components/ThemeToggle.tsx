"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="w-full h-10 lg:w-10 border border-neutral-300 dark:border-neutral-700 flex items-center justify-center rounded-md">
      <div className="p-2 text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
        {theme === "dark" ? (
          <div
            className="flex items-center gap-2"
            onClick={() => setTheme("light")}
          >
            <Sun className="" size={24} />
            <span className="lg:hidden">Chế độ sáng</span>
          </div>
        ) : (
          <div
            className="flex items-center gap-2"
            onClick={() => setTheme("dark")}
          >
            <Moon className=" " size={24} />
            <span className="lg:hidden">Chế độ tối</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
