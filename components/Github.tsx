import { graphql } from "@octokit/graphql";
import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import Link from "next/link";
import * as React from "react";

import Markdown from "./Markdown";

export type Repository = {
  url: string;
  name: string;
  description: string;
  forkCount: number;
  stargazerCount: number;
};

export type RepositoryConnection = {
  totalCount: number;
  nodes: [Repository];
};

export const getRepos = async ({
  isFork = false,
}: {
  isFork?: boolean;
}): Promise<RepositoryConnection> => {
  const {
    user: { repositories },
  } = await graphql(
    // `
    //   {
    //     viewer {
    //       login
    //       pullRequests(
    //         first: 100
    //         orderBy: { field: UPDATED_AT, direction: DESC }
    //       ) {
    //         totalCount
    //         nodes {
    //           title
    //           isCrossRepository
    //           state
    //           baseRepository {
    //             nameWithOwner
    //             stargazerCount
    //             forkCount
    //             isPrivate
    //           }
    //         }
    //       }
    //     }
    //   }
    // `,
    // ---
    // `
    //   query {
    //     user(login: "nemoDreamer") {
    //       repositoriesContributedTo(
    //         contributionTypes: [
    //           ISSUE
    //           COMMIT
    //           PULL_REQUEST
    //           PULL_REQUEST_REVIEW
    //         ]
    //         first: 100
    //         includeUserRepositories: false
    //         orderBy: { field: STARGAZERS, direction: DESC }
    //       ) {
    //         pageInfo {
    //           hasNextPage
    //           endCursor
    //         }
    //         nodes {
    //           nameWithOwner
    //         }
    //       }
    //     }
    //   }
    // `,
    // ---
    `
      query ($login: String!, $isFork: Boolean, $limit: Int!) {
        user(login: $login) {
          repositories(
            isFork: $isFork
            first: $limit
            orderBy: { field: STARGAZERS, direction: DESC }
            privacy: PUBLIC
            ownerAffiliations: [OWNER]
          ) {
            totalCount
            nodes {
              url
              name
              description
              forkCount
              stargazerCount
            }
          }
        }
      }
    `,
    {
      login: "nemoDreamer",
      isFork,
      limit: 6,
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  );

  return repositories;
};

const Repo: React.FC<{
  url: string;
  name: string;
  description: string;
  forkCount: number;
  stargazerCount: number;
  hideDetails?: boolean;
}> = ({
  url,
  name,
  description,
  forkCount,
  stargazerCount,
  hideDetails = false,
}) => (
  <div>
    <Link href={url} passHref={true}>
      <div className="group bg-white shadow-md hover:shadow-xl transition-shadow rounded-md cursor-pointer">
        <div className="p-4">
          <span className="font-bold group-hover:underline">
            <RepoIcon verticalAlign="middle" size={16} /> {name}
          </span>
          <Markdown className="description text-sm" content={description} />
        </div>
        {!hideDetails && (
          <div className="bg-gray-100 group-hover:bg-gray-50 transition-colors p-4 rounded-b-md flex flex-row justify-end items-center text-sm">
            <span className="stargazerCount">
              <StarFillIcon size={16} fill="#ffe000" /> {stargazerCount}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="forkCount">
              <RepoForkedIcon size={16} /> {forkCount}
            </span>
          </div>
        )}
      </div>
    </Link>
  </div>
);

const RepoGroup: React.FC<{
  title: string | React.ReactNode;
  repos: RepositoryConnection | undefined;
  hideDetails?: boolean;
}> = ({ title, repos, hideDetails = false }) => (
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
            <a className="text-blue-500">See all ↗︎</a>
          </Link>
        </span>
      )}
    </h3>
    <div className="grid grid-flow-row gap-4 grid-cols-1 xs:grid-cols-2">
      {repos ? (
        repos.nodes.map((repo) => (
          <Repo key={repo.name} {...repo} hideDetails={hideDetails} />
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
    <RepoGroup title={ownTitle} repos={ownRepos} />
    <RepoGroup title="Forks" repos={forkedRepos} hideDetails />
  </section>
);

export default Github;
