import Link from "next/link";
import * as React from "react";

const ArrowLink: React.FC<{
  href: string;
  isBack?: boolean;
}> = ({ children, href, isBack = false }) => (
  <Link href={href}>
    <a className="hover:text-white transition-colors">
      {isBack ? <span>&larr;</span> : <span>&rarr;</span>}{" "}
      <span className="underline">{children}</span>
    </a>
  </Link>
);

export default ArrowLink;
