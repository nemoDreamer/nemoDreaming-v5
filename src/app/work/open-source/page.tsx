import type { Metadata } from "next";
import { Suspense } from "react";

import Main from "@/components/Layout/Main";

import WorkMenu from "../(posts)/_components/WorkMenu";

import RepoGroup from "./_components/RepoGroup";
import RepoGroupSkeleton from "./_components/RepoGroupSkeleton";
import { getPullRequests, getTopRepositories } from "./_data/endpoints";

const _getTopRepositories = () =>
  getTopRepositories({
    includeOwn: "ONLY",
  });

export const metadata: Metadata = {
  title: "Open-Source",
};

export default function OpenSourcePage() {
  return (
    <Main subHeader={<WorkMenu currentKey="open-source" />}>
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
    </Main>
  );
}
