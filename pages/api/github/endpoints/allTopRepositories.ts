import { print } from "graphql/language/printer";

import query from "../queries/topRepositories.graphql";

import { RepositoriesResponse, Repository } from "../types";

export default {
  query: print(query),
  responseTransform: ({
    viewer: { repositories },
  }: RepositoriesResponse): Repository[] =>
    repositories.nodes.filter((repository) => !repository.isPrivate),
};
