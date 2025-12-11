import fs from "fs";
import path from "path";

import {
  type Frontmatter,
  type Post,
  type ProcessedPost,
  loadAllPostFileNames,
  loadAllPostSlugs,
  loadAndProcessAllPosts,
  loadAndProcessPost,
  makeFileNameFromSlug,
} from "@/utils/post";

// import postsJson from "./posts-cache.json";

// const POSTS: CachedWorkPost[] = postsJson.map((post) => ({
//   ...post,
//   data: {
//     ...post.data,
//     date: new Date(post.data.date),
//   },
// }));

// --------------------------------------------------

export type WorkPostFrontmatter = Frontmatter & {
  title: string;
  url?: string;
  // ---
  category: string;
  categories: string[];
  tags: string[];
  // ---
  excerpt: string;
};

export type WorkPost = Post<WorkPostFrontmatter>;

export type ProcessedWorkPost = ProcessedPost<WorkPostFrontmatter>;

type CachedWorkPost = Awaited<ReturnType<typeof loadWorkPostsForCache>>[0];

// --------------------------------------------------
export const POSTS_DIR = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

export const POSTS_CACHE_PATH = path.resolve(
  process.cwd(),
  "public/posts-cache.json",
);

export const loadAllWorkPostFileNames = () => loadAllPostFileNames(POSTS_DIR);

export const loadAllWorkPostSlugs = () => loadAllPostSlugs(POSTS_DIR);

export const getPaginatedPosts = async ({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  // get posts (loaded from cache file)
  const POSTS = await getCachedPosts();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pagePosts = POSTS.slice(startIndex, endIndex);

  return {
    posts: pagePosts,
    total: POSTS.length,
    totalPages: Math.ceil(POSTS.length / limit),
  };
};

/**
 * @returns array of shallowly processed posts
 */
export const loadWorkPostsForCache = () =>
  loadAndProcessAllPosts<WorkPostFrontmatter>({
    directory: POSTS_DIR,
    isShallow: true,
  }).then((posts) =>
    // reduce the size of the cache file:
    posts.map(
      (
        post: Omit<ProcessedWorkPost, "content" | "data"> & {
          content?: string;
          data: Omit<ProcessedWorkPost["data"], "images"> & {
            images?: unknown;
          };
        },
      ) => {
        delete post.content;
        delete post.data.images;
        return post;
      },
    ),
  );

export const loadAndProcessWorkPost = ({
  slug,
  isShallow = false,
}: {
  slug: string;
  isShallow?: boolean;
}) =>
  loadAndProcessPost<WorkPostFrontmatter>({
    directory: POSTS_DIR,
    fileName: makeFileNameFromSlug(slug),
    isShallow,
  });

// CACHING
// --------------------------------------------------

/** Cached, shallowly processed posts (loaded from build-time cache file). */
let POSTS_CACHE: CachedWorkPost[] | null = null;

const getCachedPosts = async () => {
  if (POSTS_CACHE) {
    return POSTS_CACHE;
  }

  // try to load from cache file (generated at build time)
  if (fs.existsSync(POSTS_CACHE_PATH)) {
    const cacheData = fs.readFileSync(POSTS_CACHE_PATH, "utf8");
    POSTS_CACHE = (
      JSON.parse(cacheData) as (Omit<CachedWorkPost, "data"> & {
        data: Omit<CachedWorkPost["data"], "date"> & { date: string };
      })[]
    ).map((post) => ({
      ...post,
      data: {
        ...post.data,
        date: new Date(post.data.date),
      },
    }));
    return POSTS_CACHE;
  }

  // fallback: generate at runtime (for development)
  POSTS_CACHE = await loadWorkPostsForCache();

  return POSTS_CACHE;
};
