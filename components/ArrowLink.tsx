import Link from "next/link";
import * as React from "react";

const ArrowLink: React.FC<{
  href: string;
  isBack?: boolean;
}> = ({ children, href, isBack = false }) => (
  <Link href={href}>
    <a className="group transition-all flex flex-row items-baseline">
      {isBack ? (
        <span className="group-hover:-ml-1 group-hover:mr-1 transition-all">
          &larr;
        </span>
      ) : (
        <span className="group-hover:-mr-1 group-hover:ml-1 transition-all">
          &rarr;
        </span>
      )}
      <span className="py-1 px-2 -mr-2 group-hover:text-white group-hover:bg-black transition-colors">
        {children}
      </span>
    </a>
  </Link>
);

export default ArrowLink;
