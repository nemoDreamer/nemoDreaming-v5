"use client";

import { useSearchParams } from "next/navigation";

import ArrowLink from "@/components/elements/ArrowLink";

import type {
  CategoryLabels,
  CategoryWorkPostSlugs,
  ProcessedWorkPost,
} from "../../_data/work-post";

import CategoryMenu from "./CategoryMenu";

// NOTE: can't import from work-post un client-side
const ALL_CATEGORY = "all";

export default function WorkPostSubHeader({
  workPost,
  categoryLabels,
  categoryWorkPostSlugs,
}: {
  workPost: ProcessedWorkPost;
  categoryLabels: CategoryLabels;
  categoryWorkPostSlugs: CategoryWorkPostSlugs;
}) {
  const category = useSearchParams().get("category") || ALL_CATEGORY;

  const searchParam = category !== ALL_CATEGORY ? `?category=${category}` : "";

  // find previous and next posts in category:
  const workPostSlugs = categoryWorkPostSlugs[category];
  const currentIndex = workPostSlugs.findIndex(
    (post) => post === workPost.slug,
  );
  const olderPostSlug =
    currentIndex < workPostSlugs.length - 1
      ? workPostSlugs[currentIndex + 1]
      : null;
  const newerPostSlug =
    currentIndex > 0 ? workPostSlugs[currentIndex - 1] : null;

  return (
    <div className="flex flex-row justify-between items-center gap-8 text-teal-100">
      <div className="w-32 md:-ml-24">
        {olderPostSlug && (
          <ArrowLink
            className="justify-end -my-1"
            href={`/work/post/${olderPostSlug}${searchParam}`}
            isBack
          >
            Older
          </ArrowLink>
        )}
      </div>

      <CategoryMenu category={category} categoryLabels={categoryLabels} />

      <div className="w-32 md:-mr-24">
        {newerPostSlug && (
          <ArrowLink
            className="-my-1"
            href={`/work/post/${newerPostSlug}${searchParam}`}
            isBehind
          >
            Newer
          </ArrowLink>
        )}
      </div>
    </div>
  );
}
