import fs from "fs";
import path from "path";

import matter, { type GrayMatterFile } from "gray-matter";

import { type ImageData, getImageData } from "./image";

// --------------------------------------------------

export const makeFileNameFromSlug = (slug: string, ext = ".md") =>
  `${slug}${ext}`;

export const makeSlugFromFileName = (fileName: string, ext = ".md") =>
  fileName.replace(new RegExp(`${ext}$`), "");

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

export const loadPostByFileName = <Frontmatter>(
  directory: string,
  fileName: string,
) => ({
  fileName,
  ...(matter(
    fs.readFileSync(path.join(directory, fileName), "utf8"),
  ) as GrayMatterFile<string> & {
    data: Frontmatter;
  }),
});

export const loadAllPosts = <Frontmatter>(directory: string, ext = ".md") =>
  loadAllPostFileNames(directory, ext).map((fileName) =>
    loadPostByFileName<Frontmatter>(directory, fileName),
  );

// --------------------------------------------------

type Frontmatter = {
  date: string;
  folder: string;
  thumbnail: string | ImageData;
  images: string[];
};

export const processPost = async <T extends Frontmatter>(
  { fileName, content, data }: { fileName: string; content: string; data: T },
  { isShallow = false }: { isShallow?: boolean } = {},
): Promise<{
  fileName: string;
  content: string;
  // --- add slug, processed front-matter:
  slug: string;
  data: Omit<T, "date" | "thumbnail" | "images"> & {
    date: Date;
    thumbnail: ImageData;
    images: ImageData[];
  };
}> => {
  // enhance images with joined src, metadata and blur-base64
  const processedThumbnail =
    typeof data.thumbnail === "string"
      ? await getImageData(data.thumbnail, data.folder)
      : data.thumbnail;
  let processedImages: ImageData[] = [];
  if (!isShallow) {
    processedImages = await Promise.all(
      data.images.map((image: string) => getImageData(image, data.folder)),
    );
  }

  return {
    fileName,
    content,
    // add slug:
    slug: makeSlugFromFileName(fileName),
    // add front-matter:
    data: {
      ...data,
      // process date:
      date: new Date(data.date),
      // add images:
      thumbnail: processedThumbnail,
      images: processedImages,
    },
  };
};

export const loadAndProcessAllPosts = async <T extends Frontmatter>(
  directory: string,
  { isShallow = false }: { isShallow?: boolean } = {},
) =>
  Promise.all(
    loadAllPosts<T>(directory).map((post) =>
      processPost<T>(post, { isShallow }),
    ),
  );
