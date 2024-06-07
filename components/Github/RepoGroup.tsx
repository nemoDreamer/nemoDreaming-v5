import Link from "next/link";

import { Repository } from "../../pages/api/github/types";

import Repo from "./Repo";

const RepoGroup: React.FC<{
  title: string | React.ReactNode;
  repos: Repository[] | undefined;
  truncate?: number;
  hideDetails?: boolean;
}> = ({ title, repos, truncate = 10, hideDetails = false }) => (
  <div className="mb-4">
    <h3 className="flex flex-row items-center">
      <span className="flex-1">{title}</span>
      {repos && (
        <span className="text-xs font-normal flex flex-row">
          <span className="count">
            {truncate} of {repos.length}
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
      )}
    </h3>
    <div className="grid grid-flow-row gap-4 grid-cols-1 xs:grid-cols-2">
      {repos ? (
        repos
          .slice(0, truncate)
          .map((repo) => (
            <Repo key={repo.name} {...repo} hideDetails={hideDetails} />
          ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  </div>
);

export default RepoGroup;
