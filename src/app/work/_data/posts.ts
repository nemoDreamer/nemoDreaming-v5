import path from "path";

import {
  getAllPostFileNames,
  getAllPostSlugs,
  getFileNameFromSlug,
  processPost,
} from "@/utils/post";

type WorkPostData = {
  title: string;
  date: string;
  url?: string;
  category?: string;
  technologies?: string[];
  folder?: string;
  thumbnail: string;
  images: string[];
};

export type WorkPost = Awaited<ReturnType<typeof processPost<WorkPostData>>>;

// --------------------------------------------------

export const DIRECTORY = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

export const getAllWorkPostFileNames = () => getAllPostFileNames(DIRECTORY);

export const getAllWorkPostSlugs = () => getAllPostSlugs(DIRECTORY);

export const getAllWorkPosts = async () =>
  Promise.all(
    getAllWorkPostFileNames().map(
      async (fileName) => await processPost<WorkPostData>(DIRECTORY, fileName),
    ),
  ).then((post) =>
    post.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    }),
  );

export const getWorkPost = (slug: string) =>
  processPost<WorkPostData>(DIRECTORY, getFileNameFromSlug(slug));
