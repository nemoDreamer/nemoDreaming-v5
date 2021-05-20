import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";
import { PostData, getAllPostSlugs, getPost } from "../../lib/pages";
import formatDate from "../../utils/formatDate";

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

const Separator = () => <span className="text-gray-300">|</span>;

const Work: React.FC<{
  workPost: PostData;
}> = ({ workPost: { title, date, contentHtml } }) => (
  <Main>
    <h1>{title}</h1>
    <div className="mb-4 text-sm text-gray-500 flex flex-row items-baseline space-x-4">
      <ArrowLink href="/work" isBack>
        Back
      </ArrowLink>
      <Separator />
      <span className="date">{formatDate(date)}</span>
    </div>
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  </Main>
);

export default Work;
