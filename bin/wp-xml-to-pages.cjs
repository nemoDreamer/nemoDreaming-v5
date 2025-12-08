#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");

const startCase = require("lodash.startcase");
const PhpUnserialize = require("php-unserialize");
const Turndown = require("turndown");
const { parseStringPromise } = require("xml2js");
const YAML = require("yaml");

/*
NOTE: dump created via:
```sh
mysqldump -p nemodreaming_v3 wp_posts wp_postmeta wp_terms wp_term_taxonomy wp_term_relationships -X > _dumps/wp_posts.xml
```
*/

const DUMPS_DIR = path.resolve(__dirname, "../_dumps/");
const PAGES_DIR = path.join(__dirname, "../src/app/work/_data/posts");

if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { force: true });
}

async function xmlToPages() {
  const xmlPath = path.join(DUMPS_DIR, "wp_posts.xml");
  const xmlContent = fs.readFileSync(xmlPath, "utf8");

  const result = await parseStringPromise(xmlContent);
  const tableDataXML = result.mysqldump.database[0].table_data;

  // convert XML table data into JS objects:
  // (and strip redundant prefixes)
  const tableData = tableDataXML.reduce((tables, table) => {
    // "wp_posts" -> "posts", etc...
    const tableName = table.$.name.replace(/^wp_/, "");

    tables[tableName] = table.row.map((row) =>
      // "post_content" -> "content", "meta_value" -> "value", etc...
      row.field.reduce((prev, field) => {
        const fieldName = field.$.name.replace(
          new RegExp(`^(${tableName.replace(/s$/, "s?")}|meta)_`),
          "",
        );
        prev[fieldName] = field._;
        return prev;
      }, {}),
    );

    return tables;
  }, {});

  // create lookup helpers for related tables:
  const getTermById = makeLookup(tableData.terms, "id");
  const getTermTaxonomyById = makeLookup(tableData.term_taxonomy, "id");

  // enrich posts with metadata, categories:
  // --------------------------------------------------
  const posts = tableData.posts
    .filter(({ type }) => type === "post")
    .map((post) => {
      post.metadata = tableData.postmeta
        .filter((meta) => meta.post_id === post.ID)
        .reduce((prev, { key, value }) => {
          const trimmed = value.replace(/^\s*(.*)\s*$/g, "$1");
          prev[key] = ["nemo"].includes(key)
            ? PhpUnserialize.unserialize(trimmed)
            : trimmed;
          return prev;
        }, {});

      if (post.content) {
        // remove old `[gallery]` shortcodes:
        post.content = post.content.replace(/\[gallery[^\]]*\]\n*/g, "");
      }

      post.relationships = tableData.term_relationships
        .filter(({ object_id }) => object_id === post.ID)
        .reduce(
          (acc, { term_taxonomy_id }) => {
            const termTaxonomy = getTermTaxonomyById(term_taxonomy_id);
            const term = getTermById(termTaxonomy.term_id);

            if (
              termTaxonomy.taxonomy === "post_tag" ||
              termTaxonomy.taxonomy === "category"
            ) {
              if (term.name === "Featured") {
                acc.featured = true;
              } else {
                acc[
                  termTaxonomy.taxonomy === "category" ? "categories" : "tags"
                ].push(cleanupTags(term.name));
              }
            }

            return acc;
          },
          { categories: [], tags: [] },
        );

      return post;
    });

  // console.log(posts[0]);
  // return;

  // output posts as Markdown files with YAML front-matter:
  // --------------------------------------------------

  const turndown = new Turndown({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
  });

  posts.forEach(
    ({
      title,
      name: slug,
      date,
      content,
      excerpt,
      metadata: { nemo },
      relationships: { categories, tags, featured },
    }) => {
      const frontMatter = YAML.stringify({
        title,
        date: new Date(date).toLocaleString(),
        url: nemo["web-url"],
        category: startCase(nemo["main-category"]),
        categories: categories.sort(),
        tags: tags.sort(),
        featured,
        // stubs:
        folder: `/work/${slug}`,
        thumbnail: "",
        images: [],
      }).trim();

      const output = [
        "---",
        frontMatter,
        "---",
        "",
        [
          excerpt ? turndown.turndown(excerpt).trim() : "",
          "",
          content ? turndown.turndown(content).trim() : "",
        ]
          .join("\n")
          .trim(),
        "", // <- EOF new-line
      ].join("\n");

      const fileName = path.join(PAGES_DIR, `${slug}.md`);

      fs.writeFileSync(fileName, output, {
        flag: "w",
      });
    },
  );

  console.log(`Wrote ${posts.length} files.`);
}

// run!
xmlToPages();

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const makeLookup = (table, key) => {
  const lookup = new Map();
  table.forEach((row, index) => lookup.set(row[key], index));

  return (value) => table[lookup.get(String(value))];
};

const cleanupTags = (str) =>
  str
    // add "Adobe" if missing
    .replace(
      /^(Photoshop|InDesign|Illustrator|Flash|DreamWeaver|Contribute)/,
      "Adobe $1",
    )
    // add space after "ActionScript"
    .replace(/(ActionScript)(\d)/, "$1 $2")
    // replace antiquated "XHTML"
    .replace("XHTML", "HTML")
    // fix "Javascript" casing
    .replace(/javascript/i, "JavaScript")
    // fix "Css" casing
    .replace(/css/i, "CSS")
    .trim();

// const rowIs = (key, valueOrArray) => (row) =>
//   row.field.some(
//     (field) =>
//       field.$.name === key &&
//       (Array.isArray(valueOrArray)
//         ? valueOrArray.includes(field._)
//         : field._ === valueOrArray),
//   );
