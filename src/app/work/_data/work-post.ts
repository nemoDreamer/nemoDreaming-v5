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
  loadPost,
  makeFileNameFromSlug,
  processPost,
} from "@/utils/post";

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

type CachedWorkPosts = Awaited<ReturnType<typeof loadWorkPostsForCache>>;

// --------------------------------------------------
export const POSTS_DIR = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

const ITEMS_PER_PAGE = 20;

/** Build-time cache file path */
export const POSTS_CACHE_PATH = path.resolve(
  process.cwd(),
  "static",
  "posts-cache.json",
);

export const loadAllWorkPostFileNames = () => loadAllPostFileNames(POSTS_DIR);

export const loadAllWorkPostSlugs = () => loadAllPostSlugs(POSTS_DIR);

export const getPaginatedPosts = async ({
  page = 1,
  limit = ITEMS_PER_PAGE,
}: {
  page?: number;
  limit?: number;
} = {}) => {
  // get posts (loaded from cache file)
  const posts = await getCachedPosts();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pagePosts = posts.slice(startIndex, endIndex);

  return {
    posts: pagePosts,
    total: posts.length,
    totalPages: Math.ceil(posts.length / limit),
  };
};

export const loadAndProcessAllWorkPosts = (isShallow = false) =>
  loadAndProcessAllPosts<WorkPostFrontmatter>(POSTS_DIR, undefined, {
    isShallow,
  });

/**
 * @returns array of shallowly processed posts
 */
export const loadWorkPostsForCache = () =>
  loadAndProcessAllWorkPosts(/* is shallow?: */ true).then((posts) =>
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
  loadAndProcessPost<WorkPostFrontmatter>(
    POSTS_DIR,
    makeFileNameFromSlug(slug),
    { isShallow },
  );

// CACHING
// --------------------------------------------------

/** Cached, shallowly processed posts (loaded from build-time cache file). */
let POSTS_CACHE: CachedWorkPosts | null = null;

const getCachedPosts = async () => {
  if (POSTS_CACHE) {
    return POSTS_CACHE;
  }

  // try to load from cache file (generated at build time)
  if (fs.existsSync(POSTS_CACHE_PATH)) {
    const cacheData = fs.readFileSync(POSTS_CACHE_PATH, "utf8");
    POSTS_CACHE = JSON.parse(cacheData) as CachedWorkPosts;
    return POSTS_CACHE;
  }

  // fallback: generate at runtime (for development)
  POSTS_CACHE = await loadWorkPostsForCache();

  return POSTS_CACHE;
};
