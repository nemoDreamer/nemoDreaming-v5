import fs from "fs";
// import fs from "node:fs/promises";
import path from "path";

import matter, { GrayMatterFile } from "gray-matter";
// import { getPlaiceholder } from "plaiceholder";
import remark from "remark";
import html from "remark-html";

type PostResult = GrayMatterFile<string> & {
  data: {
    title: string;
    date: string;
    url?: string;
    category?: string;
    technologies?: string[];
    folder?: string;
    thumbnail: string;
    images: string[];
  };
};

export type PostData = Awaited<ReturnType<typeof processPost>>;

const getPath = (...parts: string[]) =>
  path.resolve(process.cwd(), "posts", ...parts);

const getFileName = (slug: string) => `${slug}.md`;
const getSlug = (fileName: string) => fileName.replace(/\.md$/, "");

const processPost = async (directory: string, fileName: string) => {
  const { content, data } = matter(
    fs.readFileSync(getPath(directory, fileName), "utf8"),
  ) as PostResult;

  const images = data.folder
    ? data.images.map((image) => path.join(data.folder as string, image))
    : data.images;

  //   await data.images.map(
  //   async (image) => {
  //     const file = await fs.readFile(
  //       path.join(data.folder, image),
  //     );
  //     await getPlaiceholder(file);
  //   },
  // );

  return {
    slug: getSlug(fileName),
    // parse content:
    contentHtml: await remark()
      .use(html)
      .process(content)
      .then((content) => content.toString()),
    // add front-matter:
    ...data,
    // add images:
    images,
  };
};

const getAllPostFileNames = (directory: string) =>
  fs.readdirSync(getPath(directory));

export const getAllPostSlugs = (
  directory: string,
): { params: { slug: string } }[] =>
  getAllPostFileNames(directory).map((fileName) => ({
    params: {
      slug: getSlug(fileName),
    },
  }));

export const getAllPosts = async (directory: string): Promise<PostData[]> =>
  Promise.all(
    getAllPostFileNames(directory).map(
      async (fileName) => await processPost(directory, fileName),
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

export const getPost = (directory: string, slug: string): Promise<PostData> =>
  processPost(directory, getFileName(slug));
