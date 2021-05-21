import { GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Comments from "../../components/Comments";
import Main from "../../components/Layout/Main";
import { PostData, getAllPosts } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

export const DIRECTORY = "work";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    siteTitle: "Work",
    workPosts: await getAllPosts(DIRECTORY),
    prompt: {
      branch: "dev",
      filePath: "work/index.tsx",
    },
  },
});

const subHeader = (
  <>
    <h1>Work</h1>
  </>
);

const AllWork: React.FC<{
  workPosts: PostData[];
}> = ({ workPosts }) => (
  <Main subHeader={subHeader}>
    <Comments
      lines={[
        <span key="todo" className="rounded-sm bg-yellow-200 text-yellow-900">
          TODO:
        </span>,
        "- [ ] make grid of thumbnails",
        "- [ ] add larger `featured` to top",
        "- [ ] transfer all other work",
      ]}
    />
    {workPosts.map(({ title, slug, date }) => (
      <div key={`work-post-${slug}`} className="mb-4">
        <ArrowLink href={`/work/${slug}`}>
          <span className="underline group-hover:no-underline">{title}</span>
          <span className="ml-2 text-xs italic text-gray-500 group-hover:text-gray-300">
            {formatDate(date)}
          </span>
        </ArrowLink>
      </div>
    ))}
  </Main>
);

export default AllWork;
