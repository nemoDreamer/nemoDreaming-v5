import fs from "fs";
import path from "path";

import matter, { GrayMatterFile } from "gray-matter";
import { getPlaiceholder } from "plaiceholder";
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

export type PostImage = PostData["images"][number];

const getPath = (...parts: string[]) =>
  path.resolve(process.cwd(), "posts", ...parts);

const getFileName = (slug: string) => `${slug}.md`;
const getSlug = (fileName: string) => fileName.replace(/\.md$/, "");

const processPost = async (directory: string, fileName: string) => {
  const { content, data } = matter(
    fs.readFileSync(getPath(directory, fileName), "utf8"),
  ) as PostResult;

  // --- helpers:

  const getImageSrc = (image: string) =>
    data.folder ? path.join(data.folder, image) : image;

  const getImageData = async (image: string) => {
    const src = getImageSrc(image);
    const file = fs.readFileSync(path.join("./public", src));
    const {
      base64,
      color: { hex },
      metadata: { width, height },
    } = await getPlaiceholder(file, { size: 5 });

    return { src, width, height, blurDataURL: base64, color: hex };
  };

  // ---

  // enhance images with joined src, metadata and blur-base64
  const thumbnail = await getImageData(data.thumbnail);
  const images = await Promise.all(data.images.map(getImageData));

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
    thumbnail,
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
