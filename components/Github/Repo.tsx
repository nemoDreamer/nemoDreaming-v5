import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import Link from "next/link";
import * as React from "react";

import { Repository } from "../../pages/api/github/types";

import Markdown from "../Markdown";

const login = "nemoDreamer";

const Repo: React.FC<
  {
    hideDetails?: boolean;
  } & Repository
> = ({
  url,
  name: childName,
  nameWithOwner,
  owner,
  parent,
  description,
  forkCount: childForkCount,
  stargazerCount: childStargazerCount,
  hideDetails = false,
}) => {
  const isOwn = (childName && !nameWithOwner) || owner?.login === login;

  let name = isOwn ? childName : nameWithOwner;
  let forkCount = childForkCount;
  let stargazerCount = childStargazerCount;
  if (parent) {
    name = parent.nameWithOwner;
    forkCount = parent.forkCount;
    stargazerCount = parent.stargazerCount;
  }

  return (
    <div>
      <Link href={url} passHref={true}>
        <a
          target="_blank"
          className="block group bg-white shadow-md hover:shadow-xl transition-shadow rounded-md cursor-pointer"
        >
          <span className="block p-4">
            <span className="font-bold group-hover:underline">
              <RepoIcon verticalAlign="middle" size={16} /> {name}
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
};

export default Repo;
