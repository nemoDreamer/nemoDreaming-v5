import { RequestParameters } from "@octokit/graphql/dist-types/types";
import type { NextApiRequest, NextApiResponse } from "next";

import allTopRepositories from "./endpoints/allTopRepositories";
import pullRequests from "./endpoints/pullRequests";
import type { PullRequestsResponse } from "./endpoints/pullRequests";
import repositories from "./endpoints/repositories";
import repositoriesContributedTo from "./endpoints/repositoriesContributedTo";
import topRepositories from "./endpoints/topRepositories";
import type { RepositoriesResponse, Repository } from "./types";
import octokitGraphQL from "./utils/octokitGraphQL";

export const endpoints = {
  pullRequests,
  repositories,
  repositoriesContributedTo,
  topRepositories,
  allTopRepositories,
};

type EndpointId = keyof typeof endpoints;

type ApiRequest = NextApiRequest & {
  query: { endpointId: EndpointId };
};

type ApiResponse = {
  [key: string]: unknown;
} & RepositoriesResponse &
  PullRequestsResponse;

type TransformedResponse = Repository[];

export const customFetch = async (
  endpoint: (typeof endpoints)[EndpointId],
  variables?: RequestParameters,
): Promise<TransformedResponse> =>
  await octokitGraphQL<ApiResponse, TransformedResponse>({
    query: endpoint.query,
    variables,
    responseTransform: endpoint.responseTransform,
  });

export default async (
  { query: { endpointId }, body }: ApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const query = endpoints[endpointId];
  if (!query) {
    res.status(404).json({ message: "Invalid `queryId`!" });
  } else {
    const response = await customFetch(query, {
      ...(body && JSON.parse(body)),
    });

    res.status(200).json(response);
  }
};
