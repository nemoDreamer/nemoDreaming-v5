import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

import Main from "../../components/Layout/Main";
import { PostData, getAllPostSlugs, getPost } from "../../lib/pages";

import { DIRECTORY } from ".";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPost = await getPost(DIRECTORY, params?.slug as string);
  return {
    props: {
      workPost,
      siteTitle: workPost.title,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs(DIRECTORY),
  fallback: false,
});

const Work: React.FC<{
  workPost: PostData;
}> = ({ workPost }) => (
  <Main>
    <h1>{workPost.title}</h1>
    <div className="mb-4 text-sm text-gray-500">
      <span className="date">{workPost.date}</span>
    </div>
    <div dangerouslySetInnerHTML={{ __html: workPost.contentHtml }} />
  </Main>
);

export default Work;
