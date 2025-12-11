import type { Metadata } from "next";
import { Suspense } from "react";

import Main from "@/components/Layout/Main";
import H2 from "@/components/core/H2";

import RepoGroup from "./_components/Repo/RepoGroup";
import RepoGroupSkeleton from "./_components/Repo/RepoGroupSkeleton";
import WorkGroup from "./_components/Work/WorkGroup";
// import WorkGroupSkeleton from "./_components/Work/WorkGroupSkeleton";
import { getPullRequests, getTopRepositories } from "./_data/github/endpoints";

const _getTopRepositories = () =>
  getTopRepositories({
    includeOwn: "ONLY",
  });

export const metadata: Metadata = {
  title: "Work",
};

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
- [ ] pre-render static pages?
- [ ] add filtering by category / technology
*/

type PageSearchParams = Promise<{
  page?: string;
}>;

export default async function WorkPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const { page: pageParam } = await searchParams;
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  return (
    <Main title="Work">
      <div className="mb-8">
        {/* <H2>Client Work</H2> */}
        {/* <Suspense fallback={<WorkGroupSkeleton />}> */}
        <WorkGroup page={page} />
        {/* </Suspense> */}
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
