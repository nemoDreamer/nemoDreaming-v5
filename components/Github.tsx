import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import Link from "next/link";
import * as React from "react";

import { RepositoryConnection } from "../pages/api/github/[queryId]";

import Markdown from "./Markdown";

const Repo: React.FC<{
  isOwn?: boolean;
  url: string;
  name?: string;
  nameWithOwner: string;
  parent?: { nameWithOwner: string };
  description: string;
  forkCount: number;
  stargazerCount: number;
  hideDetails?: boolean;
}> = ({
  isOwn = false,
  url,
  name,
  nameWithOwner,
  parent,
  description,
  forkCount,
  stargazerCount,
  hideDetails = false,
}) => (
  <div>
    <Link href={url} passHref={true}>
      <a
        target="_blank"
        className="block group bg-white shadow-md hover:shadow-xl transition-shadow rounded-md cursor-pointer"
      >
        <span className="block p-4">
          <span className="font-bold group-hover:underline">
            <RepoIcon verticalAlign="middle" size={16} />{" "}
            {isOwn ? name : parent?.nameWithOwner || nameWithOwner}
          </span>
          <Markdown className="description text-sm" content={description} />
        </span>
        {!hideDetails && (
          <span className="bg-gray-100 group-hover:bg-gray-50 transition-colors p-4 rounded-b-md flex flex-row justify-end items-center text-sm">
            <span className="stargazerCount">
              <StarFillIcon size={16} fill="#ffe000" /> {stargazerCount}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="forkCount">
              <RepoForkedIcon size={16} /> {forkCount}
            </span>
          </span>
        )}
      </a>
    </Link>
  </div>
);

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

const ownTitle = (
  <span>
    Repositories <em>(Public)</em>
  </span>
);

const Github: React.FC<{
  ownRepos: RepositoryConnection | undefined;
  forkedRepos: RepositoryConnection | undefined;
}> = ({ ownRepos, forkedRepos }) => (
  <section>
    <h2>Open-Source</h2>
    <RepoGroup title={ownTitle} repos={ownRepos} isOwn />
    <RepoGroup title="Forks" repos={forkedRepos} hideDetails />
  </section>
);

export default Github;
