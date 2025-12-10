#!/usr/bin/env pnpx tsx
/* eslint-disable no-console */

import fs from "fs/promises";
import path from "path";

import {
  DIRECTORY,
  type ProcessedWorkPost,
  loadAndProcessAllWorkPosts,
} from "../src/app/work/_data/work-post";

const CACHE_FILE_NAME = ".posts-cache.json";

async function generatePostsCache() {
  console.log(`🔍 Finding posts...`);

  const posts = (await loadAndProcessAllWorkPosts()).map(
    // reduce the size of the cache file:
    (
      post: Omit<ProcessedWorkPost, "content" | "data"> & {
        content?: string;
        data: Omit<ProcessedWorkPost["data"], "images"> & { images?: unknown };
      },
    ) => {
      delete post.content;
      delete post.data.images;
      return post;
    },
  );

  console.log(`🔍 Processed ${posts.length} posts.`);

  const CACHE_PATH = path.resolve(DIRECTORY, "../", CACHE_FILE_NAME);

  await fs.writeFile(CACHE_PATH, JSON.stringify(posts, null, 2), {
    encoding: "utf-8",
  });

  console.log(
    `👍 Wrote cache to '${path.relative(process.cwd(), CACHE_PATH)}'.`,
  );
}

generatePostsCache().catch((error) => {
  console.error("❌ Error!", error);
});
