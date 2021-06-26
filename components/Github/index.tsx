import * as React from "react";

import { Repository } from "../../pages/api/github/types";

import RepoGroup from "./RepoGroup";

const ownTitle = (
  <span>
    Repositories <em>(Public)</em>
  </span>
);

const Github: React.FC<{
  ownRepos: Repository[] | undefined;
  forkedRepos: Repository[] | undefined;
}> = ({ ownRepos, forkedRepos }) => (
  <section>
    <h2>Open-Source</h2>
    <RepoGroup title={ownTitle} repos={ownRepos} />
    <RepoGroup title="Forks" repos={forkedRepos} hideDetails />
  </section>
);

export default Github;
