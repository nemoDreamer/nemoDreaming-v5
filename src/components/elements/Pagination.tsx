import classNames from "classnames";

import { ALL_CATEGORY } from "@/app/work/_data/work-post";

import ArrowLink from "./ArrowLink";
import Separator from "./Separator";

export default function Pagination({
  page,
  // total,
  totalPages,
  className,
  category = ALL_CATEGORY,
}: {
  page: number;
  total: number;
  totalPages: number;
  className?: string;
  category?: string;
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
        href={`/work/${category}/${page - 1}`}
        arrowClassName="text-gray-500 group-hover:text-teal-300 "
        disabledClassName="opacity-20"
        isBack
        isDisabled={page <= 1}
      >
        Previous
      </ArrowLink>

      <span className="text-gray-600 font-mono text-xs">
        {page} <Separator char="/" /> {totalPages}
        {/* Page {page} of {totalPages} */}
        {/* ({total} items) */}
      </span>

      <ArrowLink
        href={`/work/${category}/${page + 1}`}
        arrowClassName="text-gray-500 group-hover:text-teal-300"
        disabledClassName="opacity-20"
        isBehind
        isDisabled={page >= totalPages}
      >
        Next
      </ArrowLink>
    </div>
  );
}
