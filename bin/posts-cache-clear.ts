/* eslint-disable no-console */

import fs from "fs";
import path from "path";

import { POSTS_CACHE_PATH } from "@/app/work/_data/work-post";

if (fs.existsSync(POSTS_CACHE_PATH)) {
  fs.unlinkSync(POSTS_CACHE_PATH);
  console.log(
    `🗑️  Deleted posts cache at '${path.relative(
      process.cwd(),
      POSTS_CACHE_PATH,
    )}'.`,
  );
} else {
  console.log(`ℹ️  No posts cache found to delete.`);
}
