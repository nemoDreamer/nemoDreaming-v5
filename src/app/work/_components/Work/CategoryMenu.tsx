import classNames from "classnames";
import Link from "next/link";

import Separator from "@/components/elements/Separator";

import type { CategoryLabels } from "../../_data/work-post";

// NOTE: can't import from work-post un client-side
const ALL_CATEGORY = "all";

export default function CategoryMenu({
  category = ALL_CATEGORY,
  // accepting this as prop, as we want to avoid fetching in client-side:
  categoryLabels,
}: {
  category?: string;
  categoryLabels: CategoryLabels;
}) {
  return (
    <nav className="flex flex-wrap justify-center items-center gap-1 text-teal-300">
      {categoryLabels.map((label, i) => {
        const slug = label.toLowerCase();
        const isActive = slug === category;

        return (
          <span key={slug} className="whitespace-nowrap">
            <Link
              href={`/work/${slug}/1`}
              className={classNames(
                "text-xs transition-colors",
                isActive
                  ? "text-white font-semibold border-b"
                  : "text-teal-200 hover:text-white hover:underline",
              )}
            >
              {label}
            </Link>
            {i < categoryLabels.length - 1 && (
              <Separator char="|" className="ml-1" />
            )}
          </span>
        );
      })}
    </nav>
  );
}
