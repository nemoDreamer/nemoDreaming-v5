import { print } from "graphql/language/printer";

import pullRequestsQuery from "./queries/pullRequests.graphql";
import repositoriesQuery from "./queries/repositories.graphql";
import repositoriesContributedToQuery from "./queries/repositoriesContributedTo.graphql";
import topRepositoriesQuery from "./queries/topRepositories.graphql";
import octokitGraphQL from "./utils/octokitGraphQL";

// SETUP
// --------------------------------------------------

// NOTE: ignoring deprecated repos
const IGNORE = [
  "nemoDreamer/atom-language-coldfusion",
  "nemoDreamer/MyActiveRecord",
  "Glavin001/atom-preview",
];

// TYPES
// --------------------------------------------------

export type Repository = {
  url: string;
  description: string;
  forkCount: number;
  stargazerCount: number;
  // NOTE: optionals are not always needed by / returned by a given query
  name?: string;
  nameWithOwner?: string;
  owner?: {
    login: string;
  };
  parent?: Repository;
  isPrivate?: boolean;
};

type RepositoryConnection = {
  totalCount: number;
  nodes: [Repository];
};

type RepositoriesResponse = {
  viewer: {
    login?: string;
    repositories: RepositoryConnection;
  };
};

type PullRequest = {
  title: string;
  isCrossRepository: boolean;
  state: "OPEN" | "CLOSED" | "MERGED";
  baseRepository: Repository;
};

type PullRequestConnection = {
  totalCount: number;
  nodes: [PullRequest];
};

type PullRequestsResponse = {
  viewer: { pullRequests: PullRequestConnection };
};

// SORTERS
// --------------------------------------------------

export const stargazerCountDesc = (a: Repository, b: Repository): number =>
  b.stargazerCount - a.stargazerCount;

// GETTERS
// --------------------------------------------------

/**
 * All of the repositories for the authenticated user, excluding forks by default.
 */
export const getRepositories = ({ isFork = false, limit = 100 } = {}) =>
  octokitGraphQL({
    query: print(repositoriesQuery),
    variables: { isFork, limit },
    responseTransform: ({
      viewer: { repositories },
    }: RepositoriesResponse): Repository[] =>
      repositories.nodes.sort(stargazerCountDesc),
  });

/**
 * Top repositories for the authenticated user, excluding own and ignored repos by default.
 */
export const getTopRepositories = ({
  includeOwn = false,
  includeIgnored = false,
  limit = 100,
}: {
  includeOwn?: boolean | "ONLY";
  includeIgnored?: boolean;
  limit?: number;
} = {}) =>
  octokitGraphQL({
    query: print(topRepositoriesQuery),
    variables: { limit },
    responseTransform: ({
      viewer: { login, repositories },
    }: RepositoriesResponse): Repository[] =>
      repositories.nodes
        .filter(
          (repository) =>
            // is public?
            !repository.isPrivate &&
            // is not own?
            (includeOwn === true ||
              (includeOwn === "ONLY"
                ? repository.owner?.login === login
                : repository.owner?.login !== login)) &&
            // is not ignored?
            (includeIgnored ||
              !IGNORE.includes(repository.nameWithOwner as string)),
        )
        .sort(stargazerCountDesc),
  });

/**
 * All base repositories for the authenticated user's cross-repository pull requests.
 */
export const getPullRequests = () =>
  octokitGraphQL({
    query: print(pullRequestsQuery),
    responseTransform: ({
      viewer: {
        pullRequests: { nodes },
      },
    }: PullRequestsResponse): Repository[] =>
      nodes
        .filter(
          (node) =>
            // has different base repository?
            node.isCrossRepository,
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
              (r) => r.nameWithOwner === repository.nameWithOwner,
            ) === index,
        )
        .sort(stargazerCountDesc),
  });

export const getRepositoriesContributedTo = () =>
  octokitGraphQL({
    query: print(repositoriesContributedToQuery),
    responseTransform: ({
      viewer: { repositories },
    }: RepositoriesResponse): Repository[] =>
      repositories.nodes.sort(stargazerCountDesc),
  });
