import { GetStaticProps } from "next";
import * as React from "react";
import useSWR from "swr";

import ArrowLink from "../../components/ArrowLink";
import Comments from "../../components/Comments";
import Github from "../../components/Github";
import Main from "../../components/Layout/Main";
import Thumbnail from "../../components/Thumbnail";
import fetcher from "../../lib/fetcher";
import { PostData, getAllPosts } from "../../lib/posts";
import formatDate from "../../utils/formatDate";
import {
  RepositoryConnection,
  customFetch,
  queries,
} from "../api/github/[queryId]";

export const DIRECTORY = "work";

// keep references stable:
const forkVariables = { isFork: true, limit: 6 };
const ownVariables = { isFork: false, limit: 6 };
const getApiUrlAndBody = (
  isFork = false
): [string, { [key: string]: unknown }] => [
  "/api/github/repositories",
  isFork ? forkVariables : ownVariables,
];

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    siteTitle: "Work",
    workPosts: await getAllPosts(DIRECTORY),
    prompt: {
      branch: "dev",
      filePath: "work/index.tsx",
    },
    ownRepos: await customFetch(queries.repositories, ownVariables),
    forkedRepos: await customFetch(queries.repositories, forkVariables),
  },
});

const subHeader = (
  <>
    <h1>Work</h1>
  </>
);

const AllWork: React.FC<{
  workPosts: PostData[];
  ownRepos: RepositoryConnection;
  forkedRepos: RepositoryConnection;
}> = ({
  workPosts,
  ownRepos: preFetchedOwnRepos,
  forkedRepos: preFetchedForkedRepos,
}) => {
  const { data: ownRepos } = useSWR<RepositoryConnection>(
    getApiUrlAndBody(),
    fetcher,
    {
      initialData: preFetchedOwnRepos,
    }
  );

  const { data: forkedRepos } = useSWR<RepositoryConnection>(
    getApiUrlAndBody(true),
    fetcher,
    {
      initialData: preFetchedForkedRepos,
    }
  );

  return (
    <Main subHeader={subHeader}>
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
          "- [ ] use `topRepositories` to better reflect open-source contributions",
          "- [ ] add larger `featured` to top",
        ]}
      />
      <div className="mb-8">
        {workPosts.map(({ title, slug, date, folder, thumbnail }) => (
          <div key={`work-post-${slug}`} className="mb-2">
            <ArrowLink href={`/work/${slug}`}>
              <div className="inline-block mr-2 align-middle">
                <Thumbnail
                  image={thumbnail}
                  folder={folder}
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
      <Github ownRepos={ownRepos} forkedRepos={forkedRepos} />
    </Main>
  );
};

export default AllWork;
