import classNames from "classnames";

import ArrowLink from "./ArrowLink";

export default function Pagination({
  page,
  total,
  totalPages,
  className,
}: {
  page: number;
  total: number;
  totalPages: number;
  className?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={classNames(
        "flex flex-row items-center justify-center gap-4 font-mono text-sm",
        className,
      )}
    >
      <ArrowLink
        href={`/work${page !== 2 ? `?page=${page - 1}` : ""}`}
        className="text-gray-500 group-hover:text-teal-300"
        isBack
        isDisabled={page <= 1}
      >
        Previous
      </ArrowLink>

      <span className="text-gray-600 font-mono text-xs">
        Page {page} of {totalPages} ({total} items)
      </span>

      <ArrowLink
        href={`/work?page=${page + 1}`}
        className="text-gray-500 group-hover:text-teal-300"
        isBehind
        isDisabled={page >= totalPages}
      >
        Next
      </ArrowLink>
    </div>
  );
}
