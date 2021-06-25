export type Repository = {
  url: string;
  description: string;
  forkCount: number;
  stargazerCount: number;
  // NOTE: optionals are not always needed by / returned by a given query
  name?: string;
  nameWithOwner?: string;
  owner?: {
    login: string;
  };
  parent?: Repository;
  isPrivate?: boolean;
};

export type RepositoryConnection = {
  totalCount: number;
  nodes: [Repository];
};

export type RepositoriesResponse = {
  viewer: {
    login?: string;
    repositories: RepositoryConnection;
  };
};
