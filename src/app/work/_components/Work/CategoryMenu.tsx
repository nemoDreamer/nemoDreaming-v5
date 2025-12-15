import classNames from "classnames";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import Separator from "@/components/elements/Separator";

import type { CategoryLabels } from "../../_data/work-post";

export default async function CategoryMenu({
  category = "all",
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
          <Fragment key={slug}>
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
            {i < categoryLabels.length - 1 && <Separator />}
          </Fragment>
        );
      })}
    </nav>
  );
}
