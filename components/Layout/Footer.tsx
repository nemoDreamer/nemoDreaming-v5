import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const Footer: React.FC<{
  isHome: boolean;
}> = ({ isHome }) => (
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
      Powered by Next.js &
      <span className="inline-block h-3.5 ml-1">
        <Image src="/vercel.svg" alt="Vercel Logo" width={45} height={10} />
      </span>
    </a>
  </footer>
);

export default Footer;
