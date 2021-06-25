import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import Link from "next/link";
import * as React from "react";

import Markdown from "../Markdown";

const Repo: React.FC<{
  isOwn?: boolean;
  url: string;
  name?: string;
  nameWithOwner: string;
  parent?: { nameWithOwner: string };
  description: string;
  forkCount: number;
  stargazerCount: number;
  hideDetails?: boolean;
}> = ({
  isOwn = false,
  url,
  name,
  nameWithOwner,
  parent,
  description,
  forkCount,
  stargazerCount,
  hideDetails = false,
}) => (
  <div>
    <Link href={url} passHref={true}>
      <a
        target="_blank"
        className="block group bg-white shadow-md hover:shadow-xl transition-shadow rounded-md cursor-pointer"
      >
        <span className="block p-4">
          <span className="font-bold group-hover:underline">
            <RepoIcon verticalAlign="middle" size={16} />{" "}
            {isOwn ? name : parent?.nameWithOwner || nameWithOwner}
          </span>
          <Markdown className="description text-sm" content={description} />
        </span>
        {!hideDetails && (
          <span className="bg-gray-100 group-hover:bg-gray-50 transition-colors p-4 rounded-b-md flex flex-row justify-end items-center text-sm">
            {!!stargazerCount && (
              <span className="stargazerCount">
                <StarFillIcon size={16} fill="#ffe000" /> {stargazerCount}
              </span>
            )}
            {!!stargazerCount && !!forkCount && (
              <span className="mx-2 text-gray-300">|</span>
            )}
            {!!forkCount && (
              <span className="forkCount">
                <RepoForkedIcon size={16} /> {forkCount}
              </span>
            )}
          </span>
        )}
      </a>
    </Link>
  </div>
);

export default Repo;
