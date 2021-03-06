import { print } from "graphql/language/printer";

import query from "../queries/repositories.graphql";

import { RepositoriesResponse, Repository } from "../types";

export default {
  query: print(query),
  responseTransform: ({
    viewer: { repositories },
  }: RepositoriesResponse): Repository[] => repositories.nodes,
};
