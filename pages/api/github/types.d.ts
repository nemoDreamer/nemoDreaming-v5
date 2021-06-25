export type Repository = {
  url: string;
  name?: string;
  nameWithOwner: string;
  owner?: {
    login: string;
  };
  description: string;
  forkCount: number;
  stargazerCount: number;
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
