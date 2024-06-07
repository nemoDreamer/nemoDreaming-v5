import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import humanNumber from "human-number";
import Link from "next/link";
import { createElement } from "react";

import { Repository } from "../../pages/api/github/types";

import Card from "../Card";
import Markdown from "../Markdown";

const login = "nemoDreamer";
const formatCount = (number: number) =>
  humanNumber(number, (n): string =>
    Number.isInteger(n) ? n.toString() : n.toFixed(1),
  );

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
      <Link href={url} passHref={true} target="_blank">
        <Card hasHover className="cursor-pointer">
          <Card.Body>
            <div className="font-bold group-hover:underline">
              {createElement(isOwn ? RepoIcon : RepoForkedIcon, {
                verticalAlign: "middle",
                size: 16,
              })}{" "}
              {name}
            </div>
            {/* TODO: use `remark-react` to control wrapping `p`! */}
            <Markdown className="text-sm mb-0" content={description} />
          </Card.Body>
          {!hideDetails && !!stargazerCount && !!forkCount && (
            <Card.Details className="flex flex-row justify-end items-center text-xs">
              {!!stargazerCount && (
                <span>
                  <StarFillIcon
                    size={16}
                    fill="#ffe000"
                    aria-label="stargazer count"
                  />{" "}
                  {formatCount(stargazerCount)}
                </span>
              )}
              <span className="separator">|</span>
              {!!forkCount && (
                <span>
                  <RepoForkedIcon size={16} aria-label="fork count" />{" "}
                  {formatCount(forkCount)}
                </span>
              )}
            </Card.Details>
          )}
        </Card>
      </Link>
    </div>
  );
};

export default Repo;
