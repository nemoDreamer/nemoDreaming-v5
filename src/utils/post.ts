import fs from "fs";
import path from "path";

import matter, { type GrayMatterFile } from "gray-matter";

import { type ImageData, getImageData } from "./image";

// --------------------------------------------------

const FILENAMES_CACHE = new Map<string, string[]>();
const POSTS_CACHE = new Map<string, unknown>();

// --------------------------------------------------

export const getAllPostFileNames = (directory: string, ext = ".md") => {
  const cache_key = `${directory}::${ext}`;

  if (FILENAMES_CACHE.has(cache_key)) {
    return FILENAMES_CACHE.get(cache_key)!;
  }

  const fileNames = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(ext))
    .map((dirent) => dirent.name);

  FILENAMES_CACHE.set(cache_key, fileNames);

  return fileNames;
};

export const getFileNameFromSlug = (slug: string, ext = ".md") =>
  `${slug}${ext}`;

export const getSlugFromFileName = (fileName: string, ext = ".md") =>
  fileName.replace(new RegExp(`${ext}$`), "");

export const getAllPostSlugs = (
  directory: string,
  ext = ".md",
): { slug: string }[] =>
  getAllPostFileNames(directory, ext).map((fileName) => ({
    slug: getSlugFromFileName(fileName, ext),
  }));

// --------------------------------------------------

export const processPost = async <Raw>(
  directory: string,
  fileName: string,
): Promise<
  {
    slug: string;
    content: string;
  } & Omit<Raw, "date" | "thumbnail" | "images"> & {
      date: Date;
      thumbnail: ImageData;
      images: ImageData[];
    }
> => {
  const postPath = path.join(directory, fileName);

  if (POSTS_CACHE.has(postPath)) {
    return Promise.resolve(
      POSTS_CACHE.get(postPath) as ReturnType<typeof processPost<Raw>>,
    );
  }

  const { content, data } = matter(
    fs.readFileSync(postPath, "utf8"),
  ) as GrayMatterFile<string> & {
    data: Raw;
  };

  // enhance images with joined src, metadata and blur-base64
  const processedThumbnail = await getImageData(data.thumbnail, data.folder);
  const processedImages = await Promise.all(
    data.images.map((image: string) => getImageData(image, data.folder)),
  );

  const post = {
    slug: getSlugFromFileName(fileName),
    content,
    // add front-matter:
    ...data,
    // process date:
    date: new Date(data.date),
    // add images:
    thumbnail: processedThumbnail,
    images: processedImages,
  };

  POSTS_CACHE.set(postPath, post);

  return post;
};
