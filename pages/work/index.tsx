import { GetStaticProps } from "next";
import * as React from "react";
import useSWR from "swr";

import ArrowLink from "../../components/ArrowLink";
import Comments from "../../components/Comments";
import Github, {
  RepositoryConnection,
  getRepos,
} from "../../components/Github";
import Main from "../../components/Layout/Main";
import Thumbnail from "../../components/Thumbnail";
import { PostData, getAllPosts } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

export const DIRECTORY = "work";

/**
 * SWR fetcher
 * @param cacheKey used internally by SWR, but used by us to get different repos
 */
const fetcher = async (cacheKey: string) =>
  await getRepos({ isFork: cacheKey === "forked" });

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    siteTitle: "Work",
    workPosts: await getAllPosts(DIRECTORY),
    prompt: {
      branch: "dev",
      filePath: "work/index.tsx",
    },
    ownRepos: await fetcher("own"),
    forkedRepos: await fetcher("forked"),
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
  const { data: ownRepos } = useSWR("own", fetcher, {
    initialData: preFetchedOwnRepos,
  });

  const { data: forkedRepos } = useSWR("forked", fetcher, {
    initialData: preFetchedForkedRepos,
  });

  return (
    <Main subHeader={subHeader}>
      <Comments
        lines={[
          <span key="todo" className="rounded-sm bg-yellow-200 text-yellow-900">
            TODO:
          </span>,
          "- [x] temporary thumbnailed links",
          "- [ ] make thumbnail grid",
          "- [ ] transfer items from old portfolio...!",
          "- [ ] add larger `featured` to top",
        ]}
      />
      {workPosts.map(({ title, slug, date, folder, thumbnail }) => (
        <div key={`work-post-${slug}`} className="mb-4">
          <ArrowLink href={`/work/${slug}`}>
            <div className="inline-block mr-2 align-middle">
              <Thumbnail
                image={thumbnail}
                folder={folder}
                width={48}
                height={48}
              />
            </div>
            <span className="underline group-hover:no-underline">{title}</span>
            <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
              {formatDate(date)}
            </span>
          </ArrowLink>
        </div>
      ))}
      <Github ownRepos={ownRepos} forkedRepos={forkedRepos} />
    </Main>
  );
};

export default AllWork;
