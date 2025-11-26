import { graphql } from "@octokit/graphql";
import { type RequestParameters } from "@octokit/graphql/types";

const octokitGraphQL = async <ApiResponseType, TransformedResponseType>({
  query,
  variables,
  responseTransform,
}: {
  query: string;
  variables?: RequestParameters;
  responseTransform: (response: ApiResponseType) => TransformedResponseType;
}): Promise<TransformedResponseType> =>
  responseTransform(
    await graphql<ApiResponseType>(query, {
      ...variables,
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }),
  );

export default octokitGraphQL;
