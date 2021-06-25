import Link from "next/link";
import * as React from "react";

import { RepositoryConnection } from "../../pages/api/github/types";

import Repo from "./Repo";

const RepoGroup: React.FC<{
  isOwn?: boolean;
  title: string | React.ReactNode;
  repos: RepositoryConnection | undefined;
  hideDetails?: boolean;
}> = ({ isOwn = false, title, repos, hideDetails = false }) => (
  <div className="mb-4">
    <h3 className="flex flex-row items-center">
      <span className="flex-1">{title}</span>
      {repos && (
        <span className="text-xs font-normal flex flex-row">
          <span className="count">
            {repos.nodes.length} of {repos.totalCount}
          </span>
          <div className="mx-1 text-gray-400">|</div>
          <Link href="https://github.com/nemoDreamer">
            <a className="text-blue-500" target="_blank">
              See all ↗︎
            </a>
          </Link>
        </span>
      )}
    </h3>
    <div className="grid grid-flow-row gap-4 grid-cols-1 xs:grid-cols-2">
      {repos ? (
        repos.nodes.map((repo) => (
          <Repo
            key={repo.name}
            {...repo}
            isOwn={isOwn}
            hideDetails={hideDetails}
          />
        ))
      ) : (
        <span>Loading...</span>
      )}
    </div>
  </div>
);

export default RepoGroup;
