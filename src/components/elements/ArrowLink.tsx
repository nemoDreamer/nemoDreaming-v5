import classNames from "classnames";
import Link from "next/link";

const ARROWS = {
  left: { symbol: "←", className: "group-hover:-ml-1 group-hover:mr-1" },
  right: { symbol: "→", className: "group-hover:-mr-1 group-hover:ml-1" },
};

export default function ArrowLink({
  children,
  href,
  className = "text-teal-100 group-hover:text-white",
  isBack = false,
  isDisabled = false,
  isBehind = false,
}: React.PropsWithChildren<{
  href: string;
  className?: string;
  isBack?: boolean;
  isDisabled?: boolean;
  isBehind?: boolean;
}>) {
  const config = isBack ? ARROWS.left : ARROWS.right;

  const arrow = (
    <span
      className={classNames(config.className, className, "z-10 transition-all")}
    >
      {config.symbol}
    </span>
  );

  return !isDisabled ? (
    <Link
      href={href}
      className="group transition-all flex flex-row items-baseline relative"
    >
      {isBehind ? null : arrow}
      <span className="py-1 px-2 z-0 group-hover:text-white group-hover:bg-black transition-colors">
        <span className="border-b group-hover:border-transparent transition-colors">
          {children}
        </span>
      </span>
      {isBehind ? arrow : null}
    </Link>
  ) : (
    <span className="opacity-50">
      {isBehind ? null : arrow}
      <span className="py-1 px-2">{children}</span>
      {isBehind ? arrow : null}
    </span>
  );
}
