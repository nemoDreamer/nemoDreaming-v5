import path from "path";

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
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

const getRandom = (arr: unknown[]) =>
  arr[Math.round(Math.random() * (arr.length - 1))];

const rotations = [1, 2, 3, 6];
const getRotation = () =>
  `${Math.random() < 0.5 ? "-" : ""}rotate-${getRandom(rotations)}`;

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

    {contentHtml && <div dangerouslySetInnerHTML={{ __html: contentHtml }} />}

    <div className="flex flex-row flex-wrap gap-4 items-start justify-start mt-4">
      {images.map((image) => (
        <div
          key={`image-${image}`}
          className={`box-content border-solid border-8 border-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 hover:${getRotation()}`}
          style={{ width: thumbnailSize, height: thumbnailSize }}
        >
          <Image
            className="inline-block"
            src={folder ? path.join(folder, image) : image}
            width={thumbnailSize}
            height={thumbnailSize}
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  </Main>
);

export default Work;
