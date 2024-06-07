import Link from "next/link";

const ArrowLink = ({
  children,
  href,
  isBack = false,
}: React.PropsWithChildren<{
  href: string;
  isBack?: boolean;
}>) => (
  <Link
    href={href}
    className="group transition-all flex flex-row items-baseline"
  >
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
  </Link>
);

export default ArrowLink;
