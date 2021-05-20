import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";
import Separator from "../../components/Separator";
import { PostData, getAllPostSlugs, getPost } from "../../lib/posts";
import formatDate from "../../utils/formatDate";

import { DIRECTORY } from ".";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const workPost = await getPost(DIRECTORY, params?.slug as string);
  return {
    props: {
      workPost,
      siteTitle: workPost.title,
      prompt: {
        branch: "dev",
        filePath: `work/${params && params?.slug ? `${params.slug}.md` : ""}`,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs(DIRECTORY),
  fallback: false,
});

const subHeader = (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

const Work: React.FC<{
  workPost: PostData;
}> = ({ workPost: { title, date, contentHtml, category, technologies } }) => (
  <Main subHeader={subHeader}>
    <h1>{title}</h1>
    <div className="mb-4 text-sm text-gray-500 flex flex-row items-baseline space-x-4">
      <span className="date">{formatDate(date)}</span>
      {category && (
        <>
          <Separator />
          <span className="category rounded-sm bg-yellow-300 text-yellow-900 px-1.5 py-0.5">
            {category}
          </span>
        </>
      )}
      {technologies && (
        <>
          <Separator />
          <span className="technologies">
            {technologies.sort().join(" / ")}
          </span>
        </>
      )}
    </div>
    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
  </Main>
);

export default Work;
