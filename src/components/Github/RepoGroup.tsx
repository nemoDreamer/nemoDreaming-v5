import Masonry from "@mui/lab/Masonry";
import Link from "next/link";

import { Repository } from "../../pages/api/github/types";

import Repo from "./Repo";

const RepoGroup = ({
  title,
  repos,
  total,
  hideDetails = false,
}: {
  title: string | React.ReactNode;
  repos: Repository[] | undefined;
  total: number;
  hideDetails?: boolean;
}) => (
  <div className="mb-4">
    <h3 className="flex flex-row items-center">
      <span className="flex-1">{title}</span>
      {repos && (
        <span className="text-xs font-normal flex flex-row">
          <span className="count">
            {repos.length} of {total}
          </span>
          <div className="mx-1 text-gray-400">|</div>
          <Link
            href="https://github.com/nemoDreamer"
            className="text-blue-500"
            target="_blank"
          >
            See all ↗︎
          </Link>
        </span>
      )}
    </h3>
    <Masonry columns={2} spacing={2}>
      {repos ? (
        repos.map((repo) => (
          <Repo key={repo.name} {...repo} hideDetails={hideDetails} />
        ))
      ) : (
        <span>Loading...</span>
      )}
    </Masonry>
  </div>
);

export default RepoGroup;
