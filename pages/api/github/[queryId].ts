import { graphql } from "@octokit/graphql";
import { RequestParameters } from "@octokit/graphql/dist-types/types";
import { print } from "graphql/language/printer";
import type { NextApiRequest, NextApiResponse } from "next";

import QUERY_PULL_REQUESTS from "./queries/pullRequests.graphql";
import QUERY_REPOSITORIES from "./queries/repositories.graphql";
import QUERY_REPOSITORIES_CONTRIBUTED_TO from "./queries/repositoriesContributedTo.graphql";
import QUERY_TOP_REPOSITORIES from "./queries/topRepositories.graphql";

export type Repository = {
  url: string;
  name?: string;
  nameWithOwner: string;
  owner?: {
    login: string;
  };
  description: string;
  forkCount: number;
  stargazerCount: number;
  isPrivate?: boolean;
};

export type RepositoryConnection = {
  totalCount: number;
  nodes: [Repository];
};

export type PullRequest = {
  title: string;
  isCrossRepository: boolean;
  state: "OPEN" | "CLOSED" | "MERGED";
  baseRepository: Repository;
};

export type PullRequestConnection = {
  totalCount: number;
  nodes: [PullRequest];
};

type queryId =
  | "pullRequests"
  | "repositories"
  | "repositoriesContributedTo"
  | "topRepositories";

type ApiRequest = NextApiRequest & {
  query: { queryId: queryId };
};

type PullRequestsResponse = {
  viewer: { pullRequests: PullRequestConnection };
};

type RepositoriesResponse = {
  viewer: {
    login?: string;
    repositories: RepositoryConnection;
  };
};

type ApiResponse = {
  [key: string]: unknown;
} & RepositoriesResponse &
  PullRequestsResponse;

// sorting:
const stargazerCountDesc = (a: Repository, b: Repository) =>
  b.stargazerCount - a.stargazerCount;

export const queries = {
  pullRequests: {
    body: print(QUERY_PULL_REQUESTS),
    responseTransform: ({
      viewer: {
        pullRequests: { nodes },
      },
    }: PullRequestsResponse): Repository[] =>
      nodes
        .filter(
          (node) =>
            // has different base repository?
            node.isCrossRepository
          // is merged?
          // node.state === "MERGED"
        )
        .map((node) => node.baseRepository)
        .filter(
          (repository, index, repositories) =>
            // is public?
            !repository.isPrivate &&
            // unique!
            repositories.findIndex(
              (r) => r.nameWithOwner === repository.nameWithOwner
            ) === index
        )
        .sort(stargazerCountDesc),
  },
  repositories: {
    body: print(QUERY_REPOSITORIES),
    responseTransform: ({
      viewer: { repositories },
    }: RepositoriesResponse): RepositoryConnection => repositories,
  },
  repositoriesContributedTo: {
    body: print(QUERY_REPOSITORIES_CONTRIBUTED_TO),
    responseTransform: ({
      viewer: { repositories },
    }: RepositoriesResponse): Repository[] =>
      repositories.nodes
        .filter((repository) => !repository.isPrivate)
        .sort(stargazerCountDesc),
  },
  topRepositories: {
    body: print(QUERY_TOP_REPOSITORIES),
    responseTransform: ({
      viewer: { login, repositories },
    }: RepositoriesResponse): Repository[] =>
      repositories.nodes
        .filter(
          (repository) =>
            // is public?
            !repository.isPrivate &&
            // is not own?
            repository.owner?.login !== login
        )
        .sort(stargazerCountDesc),
  },
};

export const customFetch = async (
  query: typeof queries[keyof typeof queries],
  variables: RequestParameters
): Promise<RepositoryConnection | Repository[]> =>
  query.responseTransform(
    await graphql<ApiResponse>(query.body, {
      ...variables,
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
  );

export default async (
  { query: { queryId }, body }: ApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const query = queries[queryId];
  if (!query) {
    res.status(404).json({ message: "Invalid `queryId`!" });
  } else {
    const response = await customFetch(query, {
      ...(body && JSON.parse(body)),
    });

    res.status(200).json(response);
  }
};
