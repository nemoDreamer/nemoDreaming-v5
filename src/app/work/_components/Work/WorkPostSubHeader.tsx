"use client";

import { useSearchParams } from "next/navigation";

import ArrowLink from "@/components/elements/ArrowLink";

import type {
  CategoryLabels,
  CategoryWorkPostSlugs,
  ProcessedWorkPost,
} from "../../_data/work-post";

import CategoryMenu from "./CategoryMenu";

export default function WorkPostSubHeader({
  workPost,
  categoryLabels,
  categoryWorkPostSlugs,
}: {
  workPost: ProcessedWorkPost;
  categoryLabels: CategoryLabels;
  categoryWorkPostSlugs: CategoryWorkPostSlugs;
}) {
  const category = useSearchParams().get("category") || "all";

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
    <div className="flex flex-row justify-between items-center gap-8">
      <div className="w-32 -ml-24">
        {olderPostSlug && (
          <ArrowLink
            className="justify-end"
            href={`/work/post/${olderPostSlug}?category=${category}`}
            isBack
          >
            Older
          </ArrowLink>
        )}
      </div>
      <CategoryMenu category={category} categoryLabels={categoryLabels} />
      <div className="w-32 -mr-24">
        {newerPostSlug && (
          <ArrowLink
            href={`/work/post/${newerPostSlug}?category=${category}`}
            isBehind
          >
            Newer
          </ArrowLink>
        )}
      </div>
    </div>
  );
}
