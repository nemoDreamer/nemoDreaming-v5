import path from "path";

import {
  type Frontmatter,
  type Post,
  type ProcessedPost,
  loadAllPostFileNames,
  loadAllPostSlugs,
  loadAndProcessAllPosts,
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

// --------------------------------------------------

export const DIRECTORY = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);

export const loadAllWorkPostFileNames = () => loadAllPostFileNames(DIRECTORY);

export const loadAllWorkPostSlugs = () => loadAllPostSlugs(DIRECTORY);

const ITEMS_PER_PAGE = 20;

// cache sorted metadata to avoid re-reading all files on every request
let sortedMetadataCache: { fileName: string; date: string }[] | null = null;

const getSortedPostMetadata = () => {
  if (sortedMetadataCache) {
    return sortedMetadataCache;
  }

  sortedMetadataCache = loadAllWorkPostFileNames()
    .map((fileName) => {
      const { data } = loadPost<WorkPostFrontmatter>(DIRECTORY, fileName);
      return { fileName, date: data.date };
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  return sortedMetadataCache;
};

export const loadAllWorkPosts = async ({
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
      sortedMetadata
        .slice(startIndex, endIndex)
        .map(({ fileName }) =>
          processPost<WorkPostFrontmatter>(
            loadPost<WorkPostFrontmatter>(DIRECTORY, fileName),
            { isShallow },
          ),
        ),
    )
  )
    // re-sort after Promise.all since it resolves out of order
    .sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  return {
    posts: processedPosts,
    total: sortedMetadata.length,
    totalPages: Math.ceil(sortedMetadata.length / limit),
  };
};

export const loadAndProcessAllWorkPosts = (isShallow = false) =>
  loadAndProcessAllPosts<WorkPostFrontmatter>(DIRECTORY, undefined, {
    isShallow,
  });

export const loadAndProcessWorkPost = (slug: string) =>
  processPost<WorkPostFrontmatter>(
    loadPost<WorkPostFrontmatter>(DIRECTORY, makeFileNameFromSlug(slug)),
  );
