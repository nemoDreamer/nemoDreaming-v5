import { GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
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
