import fs from "fs";
import path from "path";

import startCase from "lodash.startcase";

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
  category: CategoryLabel;
  categories: CategoryLabels;
  tags: string[];
  // ---
  excerpt: string;
};

export type WorkPost = Post<WorkPostFrontmatter>;

export type ProcessedWorkPost = ProcessedPost<WorkPostFrontmatter>;

export type CachedWorkPost = Awaited<
  ReturnType<typeof loadWorkPostsForCache>
>[0];

export type CategoryLabel = string;
export type CategoryLabels = CategoryLabel[];
export type CategoryWorkPostSlugs = Record<CategoryLabels[number], string[]>;

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

// --------------------------------------------------

export const ALL_CATEGORY = "all";
export const ALL_CATEGORY_LABEL = "All";

const filterPostsByCategory = (posts: CachedWorkPost[], categorySlug: string) =>
  // optionally filter by category (matches main category or additional ones)
  categorySlug !== ALL_CATEGORY
    ? posts.filter((post) => {
        const targetLabel = startCase(categorySlug);
        const mainCategory = post.data.category;
        const additionalCategories = post.data.categories;

        return (
          mainCategory === targetLabel ||
          additionalCategories.includes(targetLabel)
        );
      })
    : posts;

export const getCategoryWorkPosts = async (categorySlug = ALL_CATEGORY) => {
  // get posts (loaded from cache file)
  const POSTS = await getCachedPosts();

  if (!(await getAllCategoryLabels()).includes(startCase(categorySlug))) {
    throw new Error(`Category '${categorySlug}' does not exist.`);
  }

  return filterPostsByCategory(POSTS, categorySlug);
};

export const getAllCategoryWorkPostSlugs = async () => {
  const POSTS = await getCachedPosts();
  const categoryLabels = await getAllCategoryLabels();

  return categoryLabels.reduce((acc: CategoryWorkPostSlugs, categoryLabel) => {
    const categorySlug = categoryLabel.toLowerCase();
    acc[categorySlug] = filterPostsByCategory(POSTS, categorySlug).map(
      (post) => post.slug,
    );
    return acc;
  }, {});
};

export const getPaginatedWorkPosts = async ({
  page = 1,
  limit = 20,
  category: categorySlug = ALL_CATEGORY,
}: {
  page?: number;
  limit?: number;
  category?: string;
} = {}) => {
  const list = await getCategoryWorkPosts(categorySlug);

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    posts: list.slice(startIndex, endIndex),
    total: list.length,
    totalPages: Math.ceil(list.length / limit),
  };
};

// CACHING
// --------------------------------------------------

let CATEGORY_LABELS_CACHE: string[] | null = null;

/**
 * @returns sorted array of in-use unique categories (with "All" at the start)
 */
export const getAllCategoryLabels = async (): Promise<string[]> => {
  if (CATEGORY_LABELS_CACHE) {
    return CATEGORY_LABELS_CACHE;
  }

  const POSTS = await getCachedPosts();
  const categories = new Set<string>(); // <- ignores duplicates

  POSTS.forEach((post) => {
    categories.add(post.data.category);
    (post.data.categories || []).forEach((category) =>
      categories.add(category),
    );
  });

  CATEGORY_LABELS_CACHE = [
    ALL_CATEGORY_LABEL,
    ...Array.from(categories).sort(),
  ];

  return CATEGORY_LABELS_CACHE;
};

let POSTS_CACHE: CachedWorkPost[] | null = null;

/**
 * gets cached, shallowly processed posts, either from in-memory cache,
 * build-time cache file, or by generating at runtime.
 */
const getCachedPosts = async () => {
  // in-memory?
  if (POSTS_CACHE) {
    return POSTS_CACHE;
  }

  // build-time cache file?
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

/**
 * loads and shallowly processed posts
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
