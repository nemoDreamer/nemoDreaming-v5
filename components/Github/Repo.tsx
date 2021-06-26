import { RepoForkedIcon, RepoIcon, StarFillIcon } from "@primer/octicons-react";
import Link from "next/link";
import * as React from "react";

import { Repository } from "../../pages/api/github/types";

import Markdown from "../Markdown";

import styles from "./Repo.module.scss";

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
        <a target="_blank">
          <div className={styles.card}>
            <div className={styles.top}>
              <div className={styles.name}>
                {React.createElement(isOwn ? RepoIcon : RepoForkedIcon, {
                  verticalAlign: "middle",
                  size: 16,
                })}{" "}
                {name}
              </div>
              <Markdown className={styles.description} content={description} />
            </div>
            {!hideDetails && !!stargazerCount && !!forkCount && (
              <div className={styles.details}>
                {!!stargazerCount && (
                  <span>
                    <StarFillIcon
                      size={16}
                      fill="#ffe000"
                      aria-label="stargazer count"
                    />{" "}
                    {stargazerCount}
                  </span>
                )}
                <span className="separator">|</span>
                {!!forkCount && (
                  <span>
                    <RepoForkedIcon size={16} aria-label="fork count" />{" "}
                    {forkCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Repo;
