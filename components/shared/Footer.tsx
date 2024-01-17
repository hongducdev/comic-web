import Link from "next/link";
import React from "react";
import { RiFacebookCircleFill, RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <section className="my-16 text-center">
      <div className="flex flex-col text-center">
        <div className="flex items-center justify-center gap-3">
          <Link href="https://github.com/hongducdev/comic-web">
            <RiGithubFill className="text-4xl text-neutral-500 hover:text-neutral-700" />
          </Link>
          <Link href="https://www.facebook.com/hongducdev/">
            <RiFacebookCircleFill className="text-4xl text-neutral-500 hover:text-neutral-700" />
          </Link>
        </div>
      </div>
      <p className="pt-5">© 2024 HDDComic™. All rights reserved.</p>
    </section>
  );
};

export default Footer;
