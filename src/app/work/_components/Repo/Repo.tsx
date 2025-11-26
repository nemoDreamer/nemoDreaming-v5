import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import humanNumber from "human-number";
import truncate from "lodash.truncate";
import Link from "next/link";
import { createElement } from "react";

import Markdown from "@/components/Markdown";
import Card, { CardBody, CardDetails } from "@/components/elements/Card";

import type { Repository } from "../../_data/github/endpoints";

// SETUP
// --------------------------------------------------

const LOGIN = process.env.GITHUB_USERNAME || "";
const MIN_STARS = 2;
const MIN_FORKS = 1;

// HELPERS
// --------------------------------------------------

const formatCount = (number: number) =>
  humanNumber(number, (n): string =>
    Number.isInteger(n) ? n.toString() : n.toFixed(1),
  );

const truncateDescription = (description: string) =>
  truncate(
    description
      // clean up ugly descriptions:
      .replace(/\w+ is no longer (\w+ )?maintained./, "")
      .replace("Follow the directions at:", ""),
    {
      length: 128,
      separator: /\s/,
    },
  );

// COMPONENT
// --------------------------------------------------

export default function Repo({
  url,
  name: childName,
  nameWithOwner,
  owner,
  parent,
  description,
  forkCount: childForkCount,
  stargazerCount: childStargazerCount,
  hideDetails = false,
}: {
  hideDetails?: boolean;
} & Repository) {
  const isOwn = (childName && !nameWithOwner) || owner?.login === LOGIN;

  let name = isOwn ? childName : nameWithOwner;
  let forkCount = childForkCount;
  let stargazerCount = childStargazerCount;
  if (parent) {
    name = parent.nameWithOwner;
    forkCount = parent.forkCount;
    stargazerCount = parent.stargazerCount;
  }

  const showStars = stargazerCount >= MIN_STARS;
  const showForks = forkCount >= MIN_FORKS;

  return (
    <div>
      <Link href={url} passHref={true} target="_blank">
        <Card hasHover className="cursor-pointer">
          <CardBody>
            <div className="font-bold group-hover:underline">
              {createElement(isOwn ? RepoIcon : RepoForkedIcon, {
                verticalAlign: "middle",
                size: 16,
                className: "inline",
              })}{" "}
              {name}
            </div>
            <Markdown
              className="text-sm mb-0"
              content={truncateDescription(description)}
              isSingleLine
            />
          </CardBody>
          {!hideDetails && (showStars || showForks) && (
            <CardDetails className="flex flex-row justify-end items-center text-xs">
              {showStars && (
                <span>
                  <StarFillIcon
                    size={16}
                    fill="#ffe000"
                    aria-label="stargazer count"
                    className="inline"
                  />{" "}
                  {formatCount(stargazerCount)}
                </span>
              )}
              {showStars && showForks && <span className="separator">|</span>}
              {showForks && (
                <span>
                  <RepoForkedIcon
                    size={16}
                    aria-label="fork count"
                    className="inline"
                  />{" "}
                  {formatCount(forkCount)}
                </span>
              )}
            </CardDetails>
          )}
        </Card>
      </Link>
    </div>
  );
}
