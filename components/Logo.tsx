import { LibrarySquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LibrarySquare size={30} className="text-emerald-600" />
      <span className="font-semibold text-2xl">HDDComics</span>
    </Link>
  );
};

export default Logo;
