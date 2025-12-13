import classNames from "classnames";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

import Separator from "@/components/elements/Separator";

import { getAllCategories } from "../../_data/work-post";

export default async function CategoryMenu({ category = "all" }) {
  const allCategories = await getAllCategories();

  return (
    <nav className="flex flex-wrap justify-center items-center gap-1 text-teal-300">
      {allCategories.map((label, i) => {
        const catSlug = label.toLowerCase();
        const isActive = catSlug === category;

        return (
          <Fragment key={catSlug}>
            <Link
              href={`/work/${catSlug}/1`}
              className={classNames(
                "text-xs transition-colors",
                isActive
                  ? "text-white font-semibold border-b"
                  : "text-teal-200 hover:text-white hover:underline",
              )}
            >
              {label}
            </Link>
            {i < allCategories.length - 1 && <Separator />}
          </Fragment>
        );
      })}
    </nav>
  );
}
