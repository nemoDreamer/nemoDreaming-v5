import { GetStaticPaths, GetStaticProps } from "next";
import * as React from "react";

import ArrowLink from "../../components/ArrowLink";
import Main from "../../components/Layout/Main";
import Separator from "../../components/Separator";
import Thumbnail from "../../components/Thumbnail";
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
        filePath: `work/${workPost.slug ? `${workPost.slug}.md` : ""}`,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs(DIRECTORY),
  fallback: false,
});

const rowMax = 5;
const thumbnailSize = Math.floor(
  (640 - 8 * 2 * rowMax - (rowMax - 1) * 16) / rowMax
);

const subHeader = (
  <ArrowLink href="/work" isBack>
    Back
  </ArrowLink>
);

const Work: React.FC<{
  workPost: PostData;
}> = ({
  workPost: {
    title,
    date,
    contentHtml,
    category,
    technologies,
    folder,
    images,
  },
}) => (
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

    <div className="grid grid-cols-3 gap-4 md:grid-cols-7 mb-4">
      <div className="md:col-span-2 md:w-64 md:h-64 md:-ml-24">
        <div className="square">
          <div className="content">
            <Thumbnail image={images[0]} folder={folder} shouldFill />
          </div>
        </div>
      </div>
      <div
        className="col-span-2 md:col-span-5"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>

    <div className="flex flex-row flex-wrap gap-4 items-start justify-start">
      {images.slice(1).map((image) => (
        <Thumbnail
          key={`image-${image}`}
          image={image}
          folder={folder}
          width={thumbnailSize}
          height={thumbnailSize}
        />
      ))}
    </div>
  </Main>
);

export default Work;
