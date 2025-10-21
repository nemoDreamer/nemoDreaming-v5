#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const Turndown = require("turndown");
const YAML = require("yaml");

/*
NOTE: dump created via:
```sql
SELECT
    wp_posts.id,
    wp_posts.post_type,
    wp_posts.post_title,
    wp_posts.post_name,
    wp_posts.post_date,
    wp_posts.post_content,
    wp_postmeta.meta_value AS nemo
FROM wp_posts
LEFT JOIN wp_postmeta
    ON wp_posts.id = wp_postmeta.post_id
WHERE
    wp_posts.post_type IN ("page", "post")
AND
    wp_postmeta.meta_key = "nemo"
```
*/

const DUMPS_DIR = path.resolve(__dirname, "../_dumps/");
const PAGES_DIR = path.join(DUMPS_DIR, "pages");

if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { force: true });
}

const turndown = new Turndown({
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
});

JSON.parse(fs.readFileSync(path.join(DUMPS_DIR, "wp_posts.json")))
  .find((obj) => obj.type === "table")
  .data.forEach(
    ({
      post_title: title,
      post_name: slug,
      post_date: date,
      post_content: content,
      nemo,
    }) => {
      // NOTE: `nemo` is a PHP serialized object...
      const n = nemo.match(
        /web-url"[^"]*?"([^"]*).*main-category"[^"]*?"([^"]*)/m,
      );
      const frontMatter = YAML.stringify({
        title,
        date: new Date(date).toLocaleString(),
        url: n[1],
        category: n[2],
      }).trim();

      const output = [
        "---",
        frontMatter,
        "---",
        "",
        turndown.turndown(content),
        "", // <- EOF new-line
      ].join("\n");

      const fileName = path.join(PAGES_DIR, `${slug}.md`);

      fs.writeFileSync(fileName, output, {
        flag: "w",
      });

      console.log("wrote", fileName);
    },
  );
