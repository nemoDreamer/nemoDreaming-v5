import type { Metadata } from "next";
import { Suspense } from "react";

import Main from "@/components/Layout/Main";
import H2 from "@/components/core/H2";

import RepoGroup from "../../_components/Repo/RepoGroup";
import RepoGroupSkeleton from "../../_components/Repo/RepoGroupSkeleton";
import WorkGroup from "../../_components/Work/WorkGroup";
import WorkGroupSkeleton from "../../_components/Work/WorkGroupSkeleton";
import {
  getPullRequests,
  getTopRepositories,
} from "../../_data/github/endpoints";
import { getPaginatedPosts } from "../../_data/work-post";

const _getTopRepositories = () =>
  getTopRepositories({
    includeOwn: "ONLY",
  });

type PageParams = Promise<{
  page: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  return {
    title: pageNum === 1 ? "Work" : `Work - Page ${pageNum}`,
  };
}

export async function generateStaticParams() {
  const { totalPages } = await getPaginatedPosts();

  return Array.from({ length: totalPages }, (_, i) => ({
    page: String(i + 1),
  }));
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
- [ ] add filtering by category / technology
*/

export default async function WorkPage({ params }: { params: PageParams }) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);

  return (
    <Main title="Work">
      <div className="mb-8">
        <WorkGroup page={pageNum} />
      </div>
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
    </Main>
  );
}
