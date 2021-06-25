import { graphql } from "@octokit/graphql";
import { RequestParameters } from "@octokit/graphql/dist-types/types";

const octokitGraphQL = async <ApiResponseType, TransformedResponseType>({
  query,
  variables,
  responseTransform,
}: {
  query: string;
  variables: RequestParameters | undefined;
  responseTransform: (response: ApiResponseType) => TransformedResponseType;
}): Promise<TransformedResponseType> =>
  responseTransform(
    await graphql<ApiResponseType>(query, {
      ...variables,
      headers: {
        authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    })
  );

export default octokitGraphQL;
