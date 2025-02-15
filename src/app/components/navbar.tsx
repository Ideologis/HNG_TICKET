"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="md:w-[80rem] sticky w-full mx-auto flex justify-between items-center border mt-4 p-4 rounded-2xl border-slate-500 bg-transparent shadow-md">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/thumb.png"
          width={30}
          height={20}
          alt="Description of the image"
        />
        <Image
          src="/ticz.png"
          width={50}
          height={20}
          alt="Description of the image"
        />
      </Link>
      <div className="hidden md:block space-x-7 text-gray-300">
        <Link
          href="/"
          className={`hover:text-white ${
            pathname === "/" ? "text-white font-bold" : ""
          }`}
        >
          Events
        </Link>
        <Link
          href="/tickets"
          className={`hover:text-white ${
            pathname === "/tickets" ? "text-white font-bold" : ""
          }`}
        >
          My Tickets
        </Link>
        <Link
          href="/about-us"
          className={`hover:text-white ${
            pathname === "/about-us" ? "text-white font-bold" : ""
          }`}
        >
          About Project
        </Link>
      </div>
      <a
        href="/tickets"
        className="group px-4 py-2 rounded-xl bg-white text-black flex items-center relative overflow-hidden"
      >
        MY TICKETS
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
          →
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
