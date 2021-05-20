import fs from "fs";
import path from "path";

import matter, { GrayMatterFile } from "gray-matter";
import remark from "remark";
import html from "remark-html";

export type PostData = GrayMatterFile<string>["data"] & {
  slug: string;
  title: string;
  date: string;
  content: string;
  contentHtml: string;
  url?: string;
  category?: string;
  technologies?: string[];
};

const getPath = (...parts: string[]) =>
  path.resolve(process.cwd(), "posts", ...parts);

const getFileName = (slug: string) => `${slug}.md`;
const getSlug = (fileName: string) => fileName.replace(/\.md$/, "");

const processPost = async (directory: string, fileName: string) => {
  const matterResult = matter(
    fs.readFileSync(getPath(directory, fileName), "utf8")
  );

  return {
    slug: getSlug(fileName),
    // parse content:
    contentHtml: await remark()
      .use(html)
      .process(matterResult.content)
      .then((content) => content.toString()),
    // add front-matter:
    ...matterResult.data,
  } as PostData;
};

const getAllPostFileNames = (directory: string) =>
  fs.readdirSync(getPath(directory));

export const getAllPostSlugs = (
  directory: string
): { params: { slug: string } }[] =>
  getAllPostFileNames(directory).map((fileName) => ({
    params: {
      slug: getSlug(fileName),
    },
  }));

export const getAllPosts = async (directory: string): Promise<PostData[]> =>
  Promise.all(
    getAllPostFileNames(directory).map(
      async (fileName) => await processPost(directory, fileName)
    )
  ).then((post) =>
    post.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    })
  );

export const getPost = async (
  directory: string,
  slug: string
): Promise<PostData> => await processPost(directory, getFileName(slug));
