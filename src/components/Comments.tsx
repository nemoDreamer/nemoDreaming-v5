"use client";

import Link from "next/link";
import { useState } from "react";

type Comment = string | React.ReactNode;

const Comment = ({ children }: { children: Comment }) => (
  <p className="m-0">
    {`//`} {children}
  </p>
);

export default function Comments({ lines }: { lines: Comment[] }) {
  const [shouldShow, setShouldShow] = useState(true);

  return shouldShow ? (
    <div className="relative font-mono text-xs text-gray-500 mb-4">
      <Link
        href="#"
        onClick={() => setShouldShow(false)}
        aria-label="Close comments"
        className="absolute top-0 right-0 block w-6 h-6 p-1.5 align-middle leading-none text-center text-gray-500 hover:text-white hover:bg-black transition-colors"
      >
        &times;
      </Link>

      {lines.map((line, index) => (
        <Comment key={index}>{line}</Comment>
      ))}
    </div>
  ) : (
    <></>
  );
}
