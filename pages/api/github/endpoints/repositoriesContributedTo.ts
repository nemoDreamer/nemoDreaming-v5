import { print } from "graphql/language/printer";

import query from "../queries/repositoriesContributedTo.graphql";
import { stargazerCountDesc } from "../utils/sorters";

import { RepositoriesResponse, Repository } from "../types";

export default {
  body: print(query),
  responseTransform: ({
    viewer: { repositories },
  }: RepositoriesResponse): Repository[] =>
    repositories.nodes
      .filter((repository) => !repository.isPrivate)
      .sort(stargazerCountDesc),
};
