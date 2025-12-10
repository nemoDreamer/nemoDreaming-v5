import path from "path";

import {
  getAllPostFileNames,
  getAllPostSlugs,
  getFileNameFromSlug,
  getRawPostByFileName,
  processPost,
} from "@/utils/post";

type WorkPostData = {
  title: string;
  date: string;
  url?: string;
  // ---
  category: string;
  categories: string[];
  tags: string[];
  // ---
  folder: string;
  thumbnail: string;
  images: string[];
  // ---
  excerpt: string;
};

export type WorkPost = Awaited<ReturnType<typeof processPost<WorkPostData>>>;

// --------------------------------------------------

export const DIRECTORY = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

export const getAllWorkPostFileNames = () => getAllPostFileNames(DIRECTORY);

export const getAllWorkPostSlugs = () => getAllPostSlugs(DIRECTORY);

const ITEMS_PER_PAGE = 20;

// cache sorted metadata to avoid re-reading all files on every request
let sortedMetadataCache: { fileName: string; date: string }[] | null = null;

const getSortedPostMetadata = () => {
  if (sortedMetadataCache) {
    return sortedMetadataCache;
  }

  sortedMetadataCache = getAllWorkPostFileNames()
    .map((fileName) => {
      const { data } = getRawPostByFileName<WorkPostData>(DIRECTORY, fileName);
      return { fileName, date: data.date };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return sortedMetadataCache;
};

export const getAllWorkPosts = async ({
  isShallow = false,
  page = 1,
  limit = ITEMS_PER_PAGE,
}: {
  isShallow?: boolean;
  page?: number;
  limit?: number;
} = {}) => {
  // get sorted metadata (reads only frontmatter, cached after first call)
  const sortedMetadata = getSortedPostMetadata();

  // process only the files needed for this page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const processedPosts = (
    await Promise.all(
      sortedMetadata.slice(startIndex, endIndex).map(async ({ fileName }) => {
        const rawPost = getRawPostByFileName<WorkPostData>(DIRECTORY, fileName);
        return await processPost<WorkPostData>(rawPost, { isShallow });
      }),
    )
  )
    // re-sort after Promise.all since it resolves out of order
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    posts: processedPosts,
    total: sortedMetadata.length,
    totalPages: Math.ceil(sortedMetadata.length / limit),
  };
};

export const getWorkPost = (slug: string) =>
  processPost<WorkPostData>(
    getRawPostByFileName<WorkPostData>(DIRECTORY, getFileNameFromSlug(slug)),
  );
