import { print } from "graphql/language/printer";

import query from "../queries/pullRequests.graphql";
import { stargazerCountDesc } from "../utils/sorters";

import type { Repository } from "../types";

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

export type PullRequestsResponse = {
  viewer: { pullRequests: PullRequestConnection };
};

export default {
  query: print(query),
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
};
