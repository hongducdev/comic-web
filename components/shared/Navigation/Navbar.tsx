"use client";
import { NavbarLinks } from "@/utils/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-8">
        {NavbarLinks.map((link) => (
          <li
            className={`navbar-link ${pathname == link.path && "active"} `}
            key={link.path}
          >
            <Link href={link.path}>
              <span className="">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
