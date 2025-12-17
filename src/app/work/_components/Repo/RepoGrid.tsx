"use client";

import Masonry from "@mui/lab/Masonry";
import { useEffect, useRef, useState } from "react";

import { Repository } from "../../_data/github/endpoints";

import Repo from "./Repo";

export default function RepoGrid({
  repos,
  hideDetails = false,
}: {
  repos: Repository[];
  hideDetails?: boolean;
}) {
  const [columns, setColumns] = useState(2);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      setColumns(element.clientWidth < 608 ? 1 : 2);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return (
    <Masonry columns={columns} spacing={2} ref={ref}>
      {repos.map((repo, index) => (
        <Repo
          key={`${repo.name}+${index}`}
          {...repo}
          hideDetails={hideDetails}
        />
      ))}
    </Masonry>
  );
}
