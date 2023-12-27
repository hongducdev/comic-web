"use client";
import { NavbarLinks } from "@/utils/navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="">
      <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-5">
        {NavbarLinks.map((link) => (
          <li
            className={`navbar-link ${
              pathname == link.path && "active"
            } text-nowrap`}
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
