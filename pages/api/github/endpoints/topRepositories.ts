import { print } from "graphql/language/printer";

import query from "../queries/topRepositories.graphql";
import { stargazerCountDesc } from "../utils/sorters";

import { RepositoriesResponse, Repository } from "../types";

export default {
  query: print(query),
  responseTransform: ({
    viewer: { login, repositories },
  }: RepositoriesResponse): Repository[] =>
    repositories.nodes
      .filter(
        (repository) =>
          // is public?
          !repository.isPrivate &&
          // is not own?
          repository.owner?.login !== login,
      )
      .sort(stargazerCountDesc),
};
