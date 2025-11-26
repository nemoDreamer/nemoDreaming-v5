import Masonry from "@mui/lab/Masonry";
import Link from "next/link";

import H3 from "@/components/core/H3";

import type { Repository } from "../../_data/github/endpoints";

import Repo from "./Repo";

export default async function RepoGroup({
  title,
  fetcher,
  limit = 10,
  hideDetails = false,
}: {
  title: string | React.ReactNode;
  fetcher: () => Promise<Repository[]>;
  limit?: number;
  hideDetails?: boolean;
}) {
  const repos = await fetcher();

  const reposTotal = repos.length;
  const truncatedRepos = repos.slice(0, limit);

  return (
    <div className="mb-4">
      <H3 className="flex flex-row items-center">
        <span className="flex-1">{title}</span>
        <span className="text-xs font-normal flex flex-row">
          <span className="count">
            {truncatedRepos.length} of {reposTotal}
          </span>
          <div className="mx-1 text-gray-400">|</div>
          <Link
            href="https://github.com/nemoDreamer"
            className="text-blue-500"
            target="_blank"
          >
            See all ↗︎
          </Link>
        </span>
      </H3>
      <Masonry columns={2} spacing={2}>
        {truncatedRepos.map((repo) => (
          <Repo key={repo.name} {...repo} hideDetails={hideDetails} />
        ))}
      </Masonry>
    </div>
  );
}
