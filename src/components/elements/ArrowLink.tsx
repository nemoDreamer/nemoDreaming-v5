import classNames from "classnames";
import Link from "next/link";

const ARROWS = {
  left: { symbol: "←", className: "group-hover:-ml-1 group-hover:mr-1" },
  right: { symbol: "→", className: "group-hover:-mr-1 group-hover:ml-1" },
};

export default function ArrowLink({
  children,
  href,
  isBack = false,
}: React.PropsWithChildren<{
  href: string;
  isBack?: boolean;
}>) {
  const arrow = isBack ? ARROWS.left : ARROWS.right;

  return (
    <Link
      href={href}
      className="group transition-all flex flex-row items-baseline relative"
    >
      <span
        className={classNames(
          arrow.className,
          "z-10 text-teal-100 group-hover:text-white transition-all",
        )}
      >
        {arrow.symbol}
      </span>
      <span className="py-1 px-2 -mr-2 z-0 group-hover:text-white group-hover:bg-black transition-colors">
        {children}
      </span>
    </Link>
  );
}
