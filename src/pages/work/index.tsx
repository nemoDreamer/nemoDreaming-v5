import { type GetStaticProps } from "next";
import { useMemo } from "react";
import useSWR from "swr";

import ArrowLink from "@//components/ArrowLink";
import Comments from "@//components/Comments";
import RepoGroup from "@//components/Github/RepoGroup";
import { SharedLayoutProps } from "@//components/Layout/Layout";
import Main from "@//components/Layout/Main";
import Thumbnail from "@//components/Thumbnail";
import fetcher from "@//lib/fetcher";
import { type PostData, getAllPosts } from "@//lib/posts";
import formatDate from "@//utils/formatDate";

import { customFetch, endpoints } from "../api/github/[endpointId]";
import { type Repository } from "../api/github/types";
import { stargazerCountDesc } from "../api/github/utils/sorters";

export const DIRECTORY = "work";

const LIMIT = 10;

export const getStaticProps: GetStaticProps<
  React.ComponentProps<typeof AllWork> & SharedLayoutProps,
  {}
> = async () => {
  const workPosts = await getAllPosts(DIRECTORY);
  const repos = await customFetch(
    endpoints.allTopRepositories,
    // NOTE: no limit here, we need the actual total count on this server-side
    // fetch
  );

  return {
    props: {
      workPosts,
      repos: repos.slice(0, LIMIT),
      reposTotal: repos.length,
      // ---
      pageTitle: "Work",
      prompt: {
        branch: "dev",
        filePath: "work/index.tsx",
      },
    },
  };
};

const SUB_HEADER = (
  <>
    <h1>Work</h1>
  </>
);

const AllWork: React.FC<{
  workPosts: PostData[];
  repos: Repository[];
  reposTotal: number;
}> = ({ workPosts, repos: initialRepos, reposTotal }) => {
  const { data: repos } = useSWR<Repository[]>(
    ["/api/github/allTopRepositories", undefined],
    fetcher,
    {
      initialData: initialRepos,
    },
  );

  const truncatedRepos = useMemo(
    () => (repos ? repos.sort(stargazerCountDesc).slice(0, LIMIT) : []),
    [repos],
  );

  return (
    <Main subHeader={SUB_HEADER}>
      <Comments
        lines={[
          <span key="note">
            <span className="rounded-sm bg-teal-500 text-teal-200">NOTE:</span>{" "}
            please excuse the mess...
          </span>,
          <span key="todo" className="rounded-sm bg-yellow-200 text-yellow-900">
            TODO:
          </span>,
          "- [x] temporary thumbnailed links",
          "- [x] temporary repo list",
          "- [ ] make thumbnail grid",
          "- [ ] transfer items from old portfolio...!",
          "- [x] use `topRepositories` to better reflect open-source contributions",
          "- [ ] add larger `featured` to top",
        ]}
      />
      <div className="mb-8">
        <h2>Client Work</h2>
        {workPosts.map(({ title, slug, date, thumbnail }) => (
          <div key={`work-post-${slug}`} className="mb-2">
            <ArrowLink href={`/work/${slug}`}>
              <div className="inline-block mr-2 align-middle">
                <Thumbnail
                  alt="Preview Thumbnail"
                  image={thumbnail}
                  width={48}
                  height={48}
                />
              </div>
              <span className="underline group-hover:no-underline">
                {title}
              </span>
              <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
                {formatDate(date)}
              </span>
            </ArrowLink>
          </div>
        ))}
      </div>
      <div>
        <h2>Open-Source</h2>
        <RepoGroup
          title="Top Repositories"
          repos={truncatedRepos}
          total={reposTotal}
        />
      </div>
    </Main>
  );
};

export default AllWork;
