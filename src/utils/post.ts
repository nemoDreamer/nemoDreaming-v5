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

export const loadPost = <Frontmatter>(directory: string, fileName: string) => ({
  fileName,
  ...(matter(
    fs.readFileSync(path.join(directory, fileName), "utf8"),
  ) as GrayMatterFile<string> & {
    data: Frontmatter;
  }),
});

// PROCESS
// --------------------------------------------------

export const processPost = async <Frontmatter>(
  { fileName, content, data }: ReturnType<typeof loadPost<Frontmatter>>,
  { isShallow = false } = {},
): Promise<
  {
    slug: string;
    content: string;
  } & Omit<Frontmatter, "date" | "thumbnail" | "images"> & {
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
    slug: makeSlugFromFileName(fileName),
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

// LOAD AND PROCESS
// --------------------------------------------------

export const loadAndProcessPost = <Frontmatter>(
  directory: string,
  fileName: string,
) => processPost<Frontmatter>(loadPost<Frontmatter>(directory, fileName));

export const loadAndProcessAllPosts = <Frontmatter>(
  directory: string,
  ext = ".md",
) =>
  Promise.all(
    loadAllPostFileNames(directory, ext).map((fileName) =>
      loadAndProcessPost<Frontmatter>(directory, fileName),
    ),
  ).then((posts) => posts.sort((a, b) => b.date.getTime() - a.date.getTime()));
