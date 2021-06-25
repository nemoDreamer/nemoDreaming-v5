import { RequestParameters } from "@octokit/graphql/dist-types/types";
import type { NextApiRequest, NextApiResponse } from "next";

import pullRequests from "./endpoints/pullRequests";
import type { PullRequestsResponse } from "./endpoints/pullRequests";
import repositories from "./endpoints/repositories";
import repositoriesContributedTo from "./endpoints/repositoriesContributedTo";
import topRepositories from "./endpoints/topRepositories";
import type {
  RepositoriesResponse,
  Repository,
  RepositoryConnection,
} from "./types";
import octokitGraphQL from "./utils/octokitGraphQL";

type ApiRequest = NextApiRequest & {
  query: { queryId: queryId };
};

export const queries = {
  pullRequests,
  repositories,
  repositoriesContributedTo,
  topRepositories,
};

type queryId = keyof typeof queries;

type ApiResponse = {
  [key: string]: unknown;
} & RepositoriesResponse &
  PullRequestsResponse;

type TransformedResponse = RepositoryConnection | Repository[];

export const customFetch = async (
  query: typeof queries[queryId],
  variables: RequestParameters
): Promise<TransformedResponse> =>
  await octokitGraphQL<ApiResponse, TransformedResponse>({
    query: query.body,
    variables,
    responseTransform: query.responseTransform,
  });

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
