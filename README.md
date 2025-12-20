[![Next.js](https://img.shields.io/badge/framework-Next.js-000000?logo=nextdotjs&logoColor=white&style=flat)](https://nextjs.org)
[![TypeScript](https://shields.io/badge/safety-TypeScript-3178C6?logo=TypeScript&logoColor=white&style=flat)](https://www.typescriptlang.org)
[![ESLint](https://img.shields.io/badge/validation-ESLint-3A33D1?logo=eslint&logoColor=white&style=flat)](https://eslint.org)
[![Prettier](https://img.shields.io/badge/formatting-Prettier-F7B93E?logo=prettier&logoColor=white&style=flat)](https://prettier.io)
[![Vercel](https://img.shields.io/badge/deployment-Vercel-000000?logo=vercel&logoColor=white&style=flat)](https://vercel.com)

# nemoDreaming v5

A Next.js 15 portfolio site that blends modern web standards with distinctive design choices — built on the App Router, React 19, TypeScript, Tailwind CSS 4, and SCSS. This codebase demonstrates a file-based CMS approach, advanced Next.js routing patterns, and a retro-terminal aesthetic :computer: that sets it apart from typical portfolio implementations.

---

- [What Makes This Codebase Unique? :sparkles:](#what-makes-this-codebase-unique-sparkles)
  - [:memo: Markdown-as-CMS with Enhanced Image Processing](#memo-markdown-as-cms-with-enhanced-image-processing)
  - [:satellite: Terminal-Style UI via Parallel Routes](#satellite-terminal-style-ui-via-parallel-routes)
  - [:octocat: GraphQL-First GitHub Integration](#octocat-graphql-first-github-integration)
  - [:floppy_disk: Layered Caching for Markdown Content](#floppy_disk-layered-caching-for-markdown-content)
  - [:card_index_dividers: Opinionated Import Sorting](#card_index_dividers-opinionated-import-sorting)
  - [:ocean: Tailwind 4 with Custom Design Tokens](#ocean-tailwind-4-with-custom-design-tokens)
  - [:shield: Strict TypeScript Throughout](#shield-strict-typescript-throughout)
  - [:house_with_garden: Route-Scoped Component Architecture](#house_with_garden-route-scoped-component-architecture)
  - [:amphora: WordPress Migration Archaeology](#amphora-wordpress-migration-archaeology)
  - [:white_check_mark: Pre-Commit Quality Gates](#white_check_mark-pre-commit-quality-gates)
- [Technical Stack :gear:](#technical-stack-gear)
- [Architecture Highlights :building_construction:](#architecture-highlights-building_construction)
  - [:key: Key Files](#key-key-files)
  - [:thought_balloon: Design Philosophy](#thought_balloon-design-philosophy)

---

## What Makes This Codebase Unique? :sparkles:

### :memo: Markdown-as-CMS with Enhanced Image Processing

Rather than relying on a headless CMS or database, this site treats **Markdown files with YAML frontmatter** as the single source of truth. Portfolio work items live in `src/app/work/_data/posts/*.md`, where frontmatter defines metadata and Markdown provides the content body. What makes this approach distinctive:

- **Image pipeline:** uses `plaiceholder` to generate blur placeholders and extract dominant colors from every image at build time, creating a polished loading experience without runtime overhead
- **Structured metadata:** frontmatter includes categories, tags, folder paths, and image arrays — all typed and validated by the processing pipeline in `utils/post.ts`
- **Co-location:** content, images, and code live side-by-side in the file system, making the relationship between data and UI immediately visible

Resume data follows a similar philosophy with pure YAML (`src/app/about/_data/resume.yaml`) that's validated against a JSON schema.

### :satellite: Terminal-Style UI via Parallel Routes

The site's most visually distinctive feature is its **terminal prompt header**, which updates contextually as users navigate. This is implemented using Next.js parallel routes (`@prompt` slot), allowing each route to define its own prompt customization:

- **Segment architecture:** the prompt is composed of `<Segment>` components that render with overlapping SVG carets, creating the illusion of a shell prompt with stacked color transitions
- **Per-route customization:** each page can override the prompt via `@prompt/{route}/page.tsx`, showing different branches, file paths, or version numbers
- **Pure CSS artistry:** segment rendering uses z-index stacking, negative margins, and inline SVG to achieve the terminal aesthetic without canvas or complex animations

This demonstrates practical use of parallel routes for something beyond loading states — treating them as a layout composition tool.

### :octocat: GraphQL-First GitHub Integration

Portfolio open-source contributions are pulled live from GitHub using typed GraphQL queries, not the REST API:

- **Query files as modules:** `.graphql` files in `src/app/work/_data/github/queries/` are imported directly thanks to Turbopack's custom loader configuration
- **Octokit wrapper:** `octokitGraphQL.ts` provides a thin, typed layer over `@octokit/graphql` that transforms raw responses into domain models
- **Build-time fetching:** queries execute during static generation, eliminating client-side API calls and rate limit concerns

This showcases TypeScript integration with GraphQL in a way that avoids heavyweight code generation tools while maintaining type safety.

### :floppy_disk: Layered Caching for Markdown Content

The work pages lean on a three-tier cache to keep builds and navigation fast:

- **In-memory reuse:** `getCachedPosts()` memoizes the shallow post list during a process lifetime, so repeated calls never hit disk after first load
- **Build-time JSON cache:** `loadWorkPostsForCache()` writes a trimmed payload (no Markdown body, no image metadata) to `public/posts-cache.json`, letting the runtime skip Markdown parsing entirely in production
- **Scripts for control:** `bin/posts-cache-generate.ts` regenerates the cache after content edits, while `bin/posts-cache-clear.ts` removes it when you want a fresh read from source

In development, if the cache file is missing the loader quietly regenerates it on the fly, so you can iterate without manual steps.

### :card_index_dividers: Opinionated Import Sorting

The ESLint configuration enforces **alphabetical ordering within strict import groups**, with automatic fixes that eliminate bikeshedding:

1. Node builtins (`fs`, `path`)
2. External packages (`react`, `next/image`)
3. Internal aliases (`@/components/*`)
4. Parent imports (`../utils`, with immediate parents separated from ancestors)
5. Sibling imports (`./Header`)
6. Index imports

Blank lines between groups are enforced, creating visual rhythm that makes module dependencies scannable at a glance. This level of import pedantry is rare outside enterprise codebases but dramatically improves navigability in a large file tree. :sweat_smile:

### :ocean: Tailwind 4 with Custom Design Tokens

This codebase adopts **Tailwind CSS 4** with its new `@theme` directives in SCSS:

- **Extended color palette:** a custom teal system (teal-100 through teal-900) supplements the default palette
- **Custom breakpoint:** an `xs` breakpoint at 480px fills the gap between mobile-first and `sm`
- **Font variables:** three custom font stacks (`--font-sans-override`, `--font-mono-override`, `--font-ascii`) allow granular typography control across terminal and prose contexts

The combination of Tailwind utilities with SCSS global styles demonstrates a pragmatic middle ground — utility classes for component styling, SCSS for theme-level concerns.

### :shield: Strict TypeScript Throughout

TypeScript is configured with all strict checks enabled, and the codebase leverages advanced patterns:

- **Generic utilities:** `processPost<T>()` returns intersection types, merging frontmatter with processed content
- **Typed image handling:** `ImageData` type in `utils/image.ts` ensures consistent blur placeholder and color handling across all components
- **No PropTypes:** everything is typed via interfaces, with no runtime validation overhead

This demonstrates modern TypeScript practices where the type system serves as living documentation.

### :house_with_garden: Route-Scoped Component Architecture

The file structure uses Next.js conventions to enforce clear boundaries:

- **`_components/`:** private components scoped to a specific route segment, never imported elsewhere
- **`_data/`:** data files (Markdown, YAML, GraphQL queries) co-located with the routes that consume them
- **`@prompt/`:** a parallel route slot, not a regular route — showcasing advanced App Router patterns

Shared components live in `src/components/` with semantic subdivisions (`core/`, `elements/`, `Layout/`, `Terminal/`), but the majority of components are route-specific. This reduces coupling and makes dependency graphs obvious.

### :amphora: WordPress Migration Archaeology

Two one-time migration scripts in `/bin` demonstrate data transformation workflows:

- **`wp-dump-to-pages.js`:** converts MySQL JSON dumps to Markdown, including `php-unserialize` for serialized PHP metadata
- **`wp-xml-to-pages.cjs`:** parses WordPress XML exports with `xml2js` and `turndown` for HTML-to-Markdown conversion

These scripts aren't part of the runtime app but document the site's content evolution from WordPress to static Markdown — useful context for understanding the frontmatter schema's origins.

### :white_check_mark: Pre-Commit Quality Gates

Husky and lint-staged enforce quality checks before every commit:

- TypeScript type checking (no-emit mode)
- ESLint auto-fix with import sorting
- Prettier formatting
- `sort-package-json` to keep dependencies alphabetized

Combined with ESLint's `no-console: error` rule, this creates a low-friction workflow where code quality is automatic, not aspirational.

---

## Technical Stack :gear:

- **Next.js 15:** with App Router and Turbopack
- **React 19:** (server components by default)
- **TypeScript:** (strict mode)
- **Tailwind CSS 4:** with custom theme
- **SCSS:** for global styles
- **pnpm:** for package management
- **Husky + lint-staged:** for pre-commit hooks

---

## Architecture Highlights :building_construction:

### :key: Key Files

- [`src/utils/post.ts`](src/utils/post.ts): content processing pipeline with gray-matter and plaiceholder integration
- [`src/utils/image.ts`](src/utils/image.ts): image optimization with blur placeholders and dominant color extraction
- [`src/app/work/_data/posts.ts`](src/app/work/_data/posts.ts): work portfolio data layer
- [`eslint.config.mjs`](eslint.config.mjs): flat config with import sorting rules
- [`next.config.ts`](next.config.ts): Turbopack loaders for `.graphql` and `.yaml` files
- [`src/app/layout.tsx`](src/app/layout.tsx): root layout demonstrating parallel routes
- [`src/components/Terminal/Prompt.tsx`](src/components/Terminal/Prompt.tsx): terminal prompt with segment configs
- [`src/app/@prompt/`](src/app/@prompt/): parallel route slot for per-page prompt customization

### :thought_balloon: Design Philosophy

This codebase values:

- **Explicitness over magic:** custom loaders and processing pipelines are visible and auditable
- **Co-location:** content, queries, and components live near each other in the file tree
- **Type safety:** TypeScript catches errors at build time, not runtime
- **Visual distinctiveness:** the terminal UI aesthetic differentiates this portfolio from template-based sites
- **Static-first:** everything that can be pre-rendered is pre-rendered
