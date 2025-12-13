import fs from "fs";
import path from "path";

import matter, { type GrayMatterFile } from "gray-matter";

import { type ImageData, getImageData } from "./image";

/*
NOTE:
- `load~` access the file-system and return raw data.
- `process~` transform the raw data and return processed data.
- `loadAndProcess~` combine loading and processing in one step.
*/

// TYPES
// --------------------------------------------------

export type Frontmatter = {
  date: string;
  thumbnail: string;
  images: string[];
  folder: string;
};

export type Post<T> = {
  fileName: string;
  content: string;
  data: T & Frontmatter;
};

export type ProcessedPost<T extends Frontmatter> = Awaited<
  ReturnType<typeof processPost<T>>
>;

// HELPERS
// --------------------------------------------------

export const makeFileNameFromSlug = (slug: string, ext = ".md") =>
  `${slug}${ext}`;

export const makeSlugFromFileName = (fileName: string, ext = ".md") =>
  fileName.replace(new RegExp(`${ext}$`), "");

// LOAD
// --------------------------------------------------

export const loadAllPostFileNames = (directory: string, ext = ".md") =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && dirent.name.endsWith(ext))
    .map((dirent) => dirent.name);

export const loadAllPostSlugs = (
  directory: string,
  ext = ".md",
): { slug: string }[] =>
  loadAllPostFileNames(directory, ext).map((fileName) => ({
    slug: makeSlugFromFileName(fileName, ext),
  }));

export const loadPost = <T extends Frontmatter>({
  directory,
  fileName,
}: {
  directory: string;
  fileName: string;
}): Post<T> => {
  const postPath = path.join(directory, fileName);

  if (!fs.existsSync(postPath)) {
    throw new Error(`Post '${makeSlugFromFileName(fileName)}' not found!'`);
  }

  const { content, data } = matter(
    fs.readFileSync(postPath, "utf8"),
  ) as GrayMatterFile<string> & {
    data: T;
  };

  return {
    fileName,
    content,
    data,
  };
};

// PROCESS
// --------------------------------------------------

export const processPost = async <T extends Frontmatter>({
  post: { fileName, content, data },
  isShallow = false,
}: {
  post: Post<T>;
  isShallow?: boolean;
}): Promise<
  Omit<Post<T>, "data"> & {
    slug: string;
    data: Omit<Post<T>["data"], "date" | "thumbnail" | "images"> & {
      date: Date;
      thumbnail: ImageData;
      images: ImageData[];
    };
  }
> => {
  // enhance images with joined src, metadata and blur-base64
  const processedThumbnail = await getImageData(data.thumbnail, data.folder);
  let processedImages: ImageData[] = [];
  if (!isShallow) {
    processedImages = await Promise.all(
      data.images.map((image: string) => getImageData(image, data.folder)),
    );
  }

  return {
    fileName,
    content,
    slug: makeSlugFromFileName(fileName),
    data: {
      // add front-matter:
      ...data,
      // process date:
      date: new Date(data.date),
      // add images:
      thumbnail: processedThumbnail,
      images: processedImages,
    },
  };
};

// LOAD AND PROCESS
// --------------------------------------------------

export const loadAndProcessPost = <T extends Frontmatter>({
  directory,
  fileName,
  isShallow = false,
}: {
  directory: string;
  fileName: string;
  isShallow?: boolean;
}) => processPost<T>({ post: loadPost<T>({ directory, fileName }), isShallow });

export const loadAndProcessAllPosts = <T extends Frontmatter>({
  directory,
  ext = ".md",
  isShallow = false,
}: {
  directory: string;
  ext?: string;
  isShallow?: boolean;
}) =>
  Promise.all(
    loadAllPostFileNames(directory, ext).map((fileName) =>
      loadAndProcessPost<T>({ directory, fileName, isShallow }),
    ),
  ).then((posts) => posts.sort((a, b) => (a.data.date < b.data.date ? 1 : -1)));
