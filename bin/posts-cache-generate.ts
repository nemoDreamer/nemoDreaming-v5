#!/usr/bin/env npx tsx
/* eslint-disable no-console */

import fs from "fs/promises";
import path from "path";

import {
  POSTS_CACHE_PATH,
  loadWorkPostsForCache,
} from "@/app/work/_data/work-post";

async function generatePostsCache() {
  console.log(`🔍 Finding posts...`);

  const posts = await loadWorkPostsForCache();

  console.log(`🔍 Processed ${posts.length} posts.`);

  // ensure directory exists
  await fs.mkdir(path.dirname(POSTS_CACHE_PATH), { recursive: true });

  await fs.writeFile(POSTS_CACHE_PATH, JSON.stringify(posts, null, 2), {
    encoding: "utf-8",
  });

  console.log(
    `👍 Wrote cache to '${path.relative(process.cwd(), POSTS_CACHE_PATH)}'.`,
  );
}

generatePostsCache().catch((error) => {
  console.error("❌ Error!", error);
});
