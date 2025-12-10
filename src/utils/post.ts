import fs from "fs";
import path from "path";

import matter, { type GrayMatterFile } from "gray-matter";

import { type ImageData, getImageData } from "./image";

// --------------------------------------------------

export const getAllPostFileNames = (directory: string, ext = ".md") =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(ext))
    .map((dirent) => dirent.name);

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

export const getRawPostByFileName = <Raw>(
  directory: string,
  fileName: string,
) => ({
  fileName,
  ...(matter(
    fs.readFileSync(path.join(directory, fileName), "utf8"),
  ) as GrayMatterFile<string> & {
    data: Raw;
  }),
});

// --------------------------------------------------

export const processPost = async <Raw>(
  { fileName, content, data }: ReturnType<typeof getRawPostByFileName<Raw>>,
  { isShallow = false } = {},
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
  // enhance images with joined src, metadata and blur-base64
  const processedThumbnail = await getImageData(data.thumbnail, data.folder);
  let processedImages = [];
  if (!isShallow) {
    processedImages = await Promise.all(
      data.images.map((image: string) => getImageData(image, data.folder)),
    );
  }

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
