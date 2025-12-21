#!/usr/bin/env npx tsx
/* eslint-disable no-console */

import * as fs from "fs";
import * as path from "path";

import { POSTS_DIR } from "@/app/work/_data/work-post";

if (!fs.existsSync(POSTS_DIR)) {
  console.error(`❌  Posts directory does not exist at '${POSTS_DIR}'.`);
  process.exit(1);
}

const DATE_REGEX = /date:\s*(.+)$/m;

const files = fs
  .readdirSync(POSTS_DIR, { withFileTypes: true })
  .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".md"));

files.forEach((file) => {
  const filePath = path.join(file.parentPath, file.name);

  const content = fs.readFileSync(filePath, "utf8");

  const match = content.match(DATE_REGEX);
  if (match) {
    const date = new Date(match[1].trim());

    // date.setMilliseconds(0);
    // date.setSeconds(0);

    const fixedDate = date.toLocaleString();

    const updatedContent = content.replace(DATE_REGEX, `date: ${fixedDate}`);

    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, "utf8");

      console.log(`   - ✅ fixed '${file.name}' to '${fixedDate}'`);
    } else {
      console.info(`   - skipped '${file.name}'`);
    }
  }
});

console.log(`👍 Done!`);
