import fs from "fs";
import path from "path";

import type { ImageData } from "@/utils/image";
import {
  loadAllPostFileNames,
  loadAllPostSlugs,
  loadAllPosts,
  loadAndProcessAllPosts,
  loadPostByFileName,
  makeFileNameFromSlug,
  processPost,
} from "@/utils/post";

export type WorkPostFrontmatter = {
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

export type CachedPost = {
  fileName: string;
  data: Omit<WorkPostFrontmatter, "thumbnail"> & {
    thumbnail: ImageData;
  };
};

export type WorkPost = Awaited<
  ReturnType<typeof processPost<WorkPostFrontmatter>>
>;

// --------------------------------------------------

export const DIRECTORY = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

const CACHE_FILE = path.resolve(
  process.cwd(),
  "./src/app/work/_data/.posts-cache.json",
);

export const getAllWorkPostFileNames = () => loadAllPostFileNames(DIRECTORY);

export const getAllWorkPostSlugs = () => loadAllPostSlugs(DIRECTORY);

const ITEMS_PER_PAGE = 20;

// cache sorted metadata (loaded from build-time cache file)
let sortedPostsCache: CachedPost[] | null = null;

const loadSortedPosts = async (): Promise<CachedPost[]> => {
  if (sortedPostsCache) {
    return sortedPostsCache;
  }

  // try to load from cache file (generated at build time)
  if (fs.existsSync(CACHE_FILE)) {
    const cacheData = fs.readFileSync(CACHE_FILE, "utf8");
    sortedPostsCache = JSON.parse(cacheData) as CachedPost[];
    return sortedPostsCache;
  }

  // fallback: generate at runtime (for development)
  sortedPostsCache = (
    await loadAndProcessAllPosts<WorkPostFrontmatter>(DIRECTORY, {
      isShallow: true,
    })
  ).sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  return sortedPostsCache;
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
  const sortedPosts = await loadSortedPosts();

  // process only the posts needed for this page
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const processedPosts = (
    await Promise.all(
      sortedPosts
        .slice(startIndex, endIndex)
        .map(async ({ fileName, data }) => {
          if (isShallow) {
            return await processPost<WorkPostFrontmatter>(
              { fileName, content: "", data },
              { isShallow },
            );
          }

          const rawPost = loadPostByFileName<WorkPostFrontmatter>(
            DIRECTORY,
            fileName,
          );

          // prefer cached frontmatter (includes processed thumbnail) but merge with raw to keep content in sync
          const mergedData = { ...rawPost.data, ...data };

          return await processPost<WorkPostFrontmatter>({
            ...rawPost,
            data: mergedData,
          });
        }),
    )
  )
    // re-sort after Promise.all since it resolves out of order
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    posts: processedPosts,
    total: sortedPosts.length,
    totalPages: Math.ceil(sortedPosts.length / limit),
  };
};

export const getWorkPost = (slug: string) =>
  (() => {
    const fileName = makeFileNameFromSlug(slug);
    const cached = loadSortedPosts().find(
      (entry) => entry.fileName === fileName,
    );

    const rawPost = loadPostByFileName<WorkPostFrontmatter>(
      DIRECTORY,
      fileName,
    );

    const mergedData = cached
      ? { ...rawPost.data, ...cached.data }
      : rawPost.data;

    return processPost<WorkPostFrontmatter>({ ...rawPost, data: mergedData });
  })();
