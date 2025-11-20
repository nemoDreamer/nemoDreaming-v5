import fs from "fs";
import path from "path";

import matter, { type GrayMatterFile } from "gray-matter";

import { type ImageData, getImageData } from "./image";

// --------------------------------------------------

export const getAllPostFileNames = (directory: string) =>
  fs.readdirSync(directory);

export const getFileNameFromSlug = (slug: string, ext = ".md") =>
  `${slug}${ext}`;
export const getSlugFromFileName = (fileName: string, ext = ".md") =>
  fileName.replace(new RegExp(`${ext}$`), "");

export const getAllPostSlugs = (directory: string): { slug: string }[] =>
  getAllPostFileNames(directory).map((fileName) => ({
    slug: getSlugFromFileName(fileName),
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
  const { content, data } = matter(
    fs.readFileSync(path.join(directory, fileName), "utf8"),
  ) as GrayMatterFile<string> & {
    data: Raw;
  };

  // enhance images with joined src, metadata and blur-base64
  const processedThumbnail = await getImageData(data.thumbnail, data.folder);
  const processedImages = await Promise.all(
    data.images.map((image: string) => getImageData(image, data.folder)),
  );

  return {
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
};
