#!/usr/bin/env tsx
/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import type { CachedPost, WorkPostFrontmatter } from "@/app/work/_data/posts";

import { getImageData } from "../src/utils/image";
import { loadAllPostFileNames, loadPostByFileName } from "../src/utils/post";

const POSTS_DIRECTORY = path.resolve(
  process.cwd(),
  "./src/app/work/_data/posts",
);
const CACHE_FILE = path.resolve(
  process.cwd(),
  "./src/app/work/_data/.posts-cache.json",
);

async function generatePostsCache() {
  console.log("🔄 Generating posts metadata cache...");

  const fileNames = loadAllPostFileNames(POSTS_DIRECTORY);
  console.log(`📝 Found ${fileNames.length} posts`);

  const cachedMetadata: CachedPost[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const { data } = loadPostByFileName<WorkPostFrontmatter>(
        POSTS_DIRECTORY,
        fileName,
      );

      // generate thumbnail ImageData at build time
      const thumbnailSource =
        typeof data.thumbnail === "string"
          ? data.thumbnail
          : data.thumbnail.src;
      const thumbnailData = await getImageData(thumbnailSource, data.folder);

      console.log(`  ✓ Processed ${fileName}`);

      return {
        fileName,
        data: {
          ...data,
          thumbnail: thumbnailData,
        },
      };
    }),
  );

  // sort by date (newest first)
  cachedMetadata.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));

  // write cache file
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cachedMetadata, null, 2));

  console.log(`✅ Cache generated successfully at ${CACHE_FILE}`);
  console.log(`📊 Total posts cached: ${cachedMetadata.length}`);
}

generatePostsCache().catch((error) => {
  console.error("❌ Error generating posts cache:", error);
  process.exit(1);
});
