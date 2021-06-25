import * as React from "react";

import { RepositoryConnection } from "../../pages/api/github/[queryId]";

import RepoGroup from "./RepoGroup";

const ownTitle = (
  <span>
    Repositories <em>(Public)</em>
  </span>
);

const Github: React.FC<{
  ownRepos: RepositoryConnection | undefined;
  forkedRepos: RepositoryConnection | undefined;
}> = ({ ownRepos, forkedRepos }) => (
  <section>
    <h2>Open-Source</h2>
    <RepoGroup title={ownTitle} repos={ownRepos} isOwn />
    <RepoGroup title="Forks" repos={forkedRepos} hideDetails />
  </section>
);

export default Github;
