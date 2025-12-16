import startCase from "lodash.startcase";
import type { Metadata } from "next";
import { Suspense } from "react";

import Main from "@/components/Layout/Main";
import { H1 } from "@/components/Layout/SubHeader";
import H2 from "@/components/core/H2";

import RepoGroup from "../../_components/Repo/RepoGroup";
import RepoGroupSkeleton from "../../_components/Repo/RepoGroupSkeleton";
import CategoryMenu from "../../_components/Work/CategoryMenu";
import WorkGroup from "../../_components/Work/WorkGroup";
import WorkGroupSkeleton from "../../_components/Work/WorkGroupSkeleton";
import {
  getPullRequests,
  getTopRepositories,
} from "../../_data/github/endpoints";
import {
  ALL_CATEGORY,
  getAllCategoryLabels,
  getPaginatedWorkPosts,
} from "../../_data/work-post";

const _getTopRepositories = () =>
  getTopRepositories({
    includeOwn: "ONLY",
  });

type PageParams = Promise<{
  category: string;
  page: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { category, page } = await params;
  const pageNum = parseInt(page, 10);
  const categoryName =
    category === ALL_CATEGORY ? "All Work" : startCase(category);

  return {
    title: pageNum === 1 ? categoryName : `${categoryName} - Page ${pageNum}`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategoryLabels(); // <- ["All", ...start-cased]

  const params = [];

  for (const category of categories) {
    const catSlug = category.toLowerCase();
    const paginationResult = await getPaginatedWorkPosts({ category: catSlug });

    const { totalPages } = paginationResult;

    for (let i = 1; i <= totalPages; i++) {
      params.push({
        category: catSlug,
        page: String(i),
      });
    }
  }

  return params;
}

/*
TODO:
- [ ] Missing projects:
  - Suburban Icons
  - Slow Night
  - Winter's Fire
  - Between the Times
  - Design Libraries?
  - Kerosene / Day You Left
- [ ] add larger 'featured' to top
- [x] pagination
- [x] pre-render static pages
- [x] add filtering by category / technology
*/

export default async function WorkPage({ params }: { params: PageParams }) {
  const { category, page } = await params;
  const pageNum = parseInt(page, 10);

  const categoryLabels = await getAllCategoryLabels();

  const isAll = category === ALL_CATEGORY;

  const subHeader = (
    <div className="flex flex-row justify-center items-start gap-8">
      <H1 className="mb-0 whitespace-nowrap hidden">Work</H1>
      <CategoryMenu category={category} categoryLabels={categoryLabels} />
    </div>
  );

  return (
    <Main subHeader={subHeader}>
      <div className="mb-8">
        <Suspense fallback={<WorkGroupSkeleton />}>
          <WorkGroup
            page={pageNum}
            limit={isAll ? 15 : 25}
            category={category}
          />
        </Suspense>
      </div>
      {isAll && (
        <div>
          <H2>Open-Source</H2>
          <Suspense fallback={<RepoGroupSkeleton title="Top Repositories" />}>
            <RepoGroup
              title="Top Repositories"
              fetcher={_getTopRepositories}
              limit={6}
            />
          </Suspense>
          <Suspense fallback={<RepoGroupSkeleton title="Contributions" />}>
            <RepoGroup title="Contributions" fetcher={getPullRequests} />
          </Suspense>
        </div>
      )}
    </Main>
  );
}
