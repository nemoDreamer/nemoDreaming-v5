"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();
  const isHome = pathName === "/";

  return (
    <footer className="flex flex-col md:flex-row items-center justify-center md:space-x-1 p-2 text-gray-500 bg-white text-xs print:hidden">
      {!isHome && (
        <span className="font-extralight">
          <Link href="/">← Back to home</Link>
          <span>{" | "}</span>
        </span>
      )}

      <span>
        Design & Code by <span className="font-bold">Philip Blyth</span>
        <span>{" | "}</span>
      </span>

      <a
        className="flex items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Next.js &amp;{" "}
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          width={10}
          height={10}
          className="inline-block ml-1 mr-1"
        />{" "}
        Vercel
      </a>
    </footer>
  );
}
