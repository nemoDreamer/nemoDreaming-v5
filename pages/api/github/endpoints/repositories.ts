import { print } from "graphql/language/printer";

import query from "../queries/repositories.graphql";

import { RepositoriesResponse, RepositoryConnection } from "../types";

export default {
  body: print(query),
  responseTransform: ({
    viewer: { repositories },
  }: RepositoriesResponse): RepositoryConnection => repositories,
};