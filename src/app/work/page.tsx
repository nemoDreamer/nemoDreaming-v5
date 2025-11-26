import { Suspense } from "react";

import Comments from "@/components/Comments";
import Main from "@/components/Layout/Main";
import { H1 } from "@/components/Layout/SubHeader";
import H2 from "@/components/core/H2";

import RepoGroup from "./_components/Repo/RepoGroup";
import RepoGroupSkeleton from "./_components/Repo/RepoGroupSkeleton";
import WorkGroup from "./_components/Work/WorkGroup";
import { getPullRequests, getTopRepositories } from "./_data/github/endpoints";

const _getTopRepositories = () =>
  getTopRepositories({
    includeOwn: "ONLY",
  });

export default function WorkPage() {
  return (
    <Main title="Work">
      <Comments
        lines={[
          <span key="note">
            <span className="rounded-xs bg-teal-500 text-teal-200">NOTE:</span>{" "}
            please excuse the mess...
          </span>,
          <span key="todo" className="rounded-xs bg-yellow-200 text-yellow-900">
            TODO:
          </span>,
          "- [x] temporary thumbnailed links",
          "- [x] temporary repo list",
          "- [ ] make thumbnail grid",
          "- [ ] transfer items from old portfolio...!",
          "- [x] use `topRepositories` to better reflect open-source contributions",
          "- [ ] add larger 'featured' to top",
          "- [ ] add filtering by category / technology",
          "- [ ] generate `sitemap.xml`, `robots.txt`, rss, og",
        ]}
      />
      <div className="mb-8">
        <H2>Client Work</H2>
        <Suspense fallback={<div>Loading...</div>}>
          <WorkGroup />
        </Suspense>
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
