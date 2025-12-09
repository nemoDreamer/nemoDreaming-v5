[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This is a hand-coded [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## Project Overview

This is a Next.js 16 portfolio site using the App Router, React 19, TypeScript, Tailwind CSS 4, and SCSS. The site showcases design/development work and integrates with the GitHub GraphQL API to display open-source contributions.

## Architecture & Data Flow

### Content Management Pattern

Portfolio work items are stored as **Markdown files with YAML frontmatter** in `src/app/work/_data/posts/*.md`. The pattern:

1. **Frontmatter** defines metadata (title, date, categories, tags, folder path, thumbnail, images array)
2. **Content** uses Markdown for the description
3. **Images** are referenced by filename in frontmatter and resolved to `/public/work/{folder}/` paths
4. **Processing** happens via `utils/post.ts` which uses `gray-matter` to parse frontmatter and `plaiceholder` to generate blur placeholders and dominant colors for images

See example in `src/app/work/_data/posts/songness-com.md`.

Resume data follows similar pattern but uses pure YAML (`src/app/about/_data/resume.yaml`) with a JSON schema for validation.

### Next.js Specific Patterns

- **Parallel Routes**: Uses `@prompt` slot in root layout for the terminal-style header prompt
- **Static Generation**: Work posts use `generateStaticParams()` for build-time rendering
- **Metadata API**: Uses `generateMetadata()` for dynamic SEO tags per page
- **Turbopack Config**: Custom loaders for `.graphql` files (`graphql-tag/loader`) and `.yaml` files (`yaml-loader`)
- **Path Aliases**: `@/*` maps to `src/*` (configured in `tsconfig.json`)

### GitHub Integration

GitHub data fetching via **Octokit GraphQL** client (`@octokit/graphql`):

- Queries defined in `src/app/work/_data/github/queries/*.graphql`
- Wrapper utility at `src/app/work/_data/github/utils/octokitGraphQL.ts`
- Requires `GITHUB_ACCESS_TOKEN` environment variable
- Endpoints in `src/app/work/_data/github/endpoints.ts` return typed, transformed data

## Development Workflows

### Running the Dev Server

```bash
pnpm dev
```

### Build & Type Checking

```bash
pnpm build      # Next.js production build
pnpm type-check # TypeScript compiler check (no emit)
```

### Linting & Formatting

- **ESLint**: Configured with flat config in `eslint.config.mjs`
- **Prettier**: Minimal config in `prettier.config.ts`
- **Husky + lint-staged**: Pre-commit hooks run type-check, ESLint, Prettier, and `sort-package-json`

Run linting manually:

```bash
pnpm lint:js .          # Fix all JS/TS files
pnpm lint:md **/*.md    # Format all Markdown
```

## Code Conventions

### Import Organization (Enforced by ESLint)

Imports are auto-sorted with **alphabetical ordering within groups** and **blank lines between groups**:

1. Node builtins (`fs`, `path`)
2. External packages (`react`, `next/image`)
3. Internal aliases (`@/components/*`)
4. Parent imports (`../utils`)
5. Sibling imports (`./Header`)
6. Index imports

Immediate parent imports (`../{file}`) separated from ancestor imports (`../../`).

### Component Patterns

- **Server Components by default**: Only add `"use client"` when needed (state, effects, event handlers, browser APIs)
- **TypeScript everywhere**: No PropTypes, strict mode enabled
- **Styling**: Tailwind utilities via `classNames()` helper, with SCSS for global styles
- **Images**: Always use `next/image` with blur placeholders from `plaiceholder`

Example client component pattern:

```tsx
"use client";

import { useState } from "react";

export default function MyComponent() {
  const [state, setState] = useState(false);
  // ...
}
```

### Styling Patterns

- **Tailwind v4**: Uses `@theme inline` and `@theme` directives in `globals.scss`
- **Custom breakpoint**: `xs` at 480px added to default Tailwind breakpoints
- **Custom teal palette**: Extended color system with teal-100 through teal-900
- **Font stacks**: Three custom font variables: `--font-sans-override`, `--font-mono-override`, `--font-ascii`
- **Grid component**: `Grid.SIZES` constant provides responsive image sizes string

### Type Safety

- **Strict TypeScript**: All optional checks enabled
- **Typed utilities**: `processPost<T>()` is generic and returns intersection types
- **Image types**: `ImageData` type in `utils/image.ts` for consistent image handling

## Common Gotchas

1. **No console.log**: ESLint enforces `no-console: error` - remove before committing
2. **React 19 key warnings**: Ensure all mapped elements have unique `key` prop
3. **GraphQL files**: Imported as modules via Turbopack config - use `print()` from `graphql` to convert to string
4. **YAML frontmatter**: Must match expected schema - see existing posts for reference
5. **Module resolution error**: If seeing "Cannot use import statement outside a module" in dev server, typically indicates a build cache issue - delete `.next` and restart

## File Structure Conventions

- **`_components/`**: Private components scoped to that route segment
- **`_data/`**: Data files (Markdown, YAML, GraphQL queries) scoped to route
- **`@prompt/`**: Parallel route slot (not a regular route)
- **`src/components/`**: Shared components across entire app
  - `core/`: Base HTML element wrappers (H1, H2, H3)
  - `elements/`: Reusable UI components
  - `Layout/`: Layout components (Header, Footer, Grid, etc.)
  - `Terminal/`: Terminal-style prompt components

## Terminal/Prompt Component Styling

The site features a **terminal-style header prompt** implemented via parallel routes (`@prompt` slot):

- **Segment-based design**: Prompt is composed of `<Segment>` components that render with SVG carets for a terminal aesthetic
- **Parallel route per page**: Each route can customize the prompt via `@prompt/{route}/page.tsx`
- **Configuration**: `segmentConfigs` array in `Prompt.tsx` defines fg/bg colors and fonts for each segment
- **Dynamic values**: Segments show version, user, branch, and filePath - customizable per route

Example parallel route prompt:

```tsx
// src/app/@prompt/work/clients/page.tsx
import Prompt from "@/components/Terminal/Prompt";

export default function PagePrompt() {
  return <Prompt branch="dev" filePath="work/index.tsx" />;
}
```

Segment rendering uses inline styles with z-index stacking and negative margins to create overlapping caret effect. The `Caret` component is a pure SVG triangle that matches the background color of its segment.

## WordPress Migration Scripts

Two Node.js scripts in `/bin` for migrating legacy WordPress content:

1. **`wp-dump-to-pages.js`**: Converts MySQL JSON dump to Markdown files
   - Reads `_dumps/wp_posts.json` (from custom SQL query joining posts + postmeta)
   - Uses `turndown` to convert HTML to Markdown
   - Parses serialized PHP meta values with `php-unserialize`
   - Outputs to `_dumps/pages/*.md` with YAML frontmatter

2. **`wp-xml-to-pages.cjs`**: Converts WordPress XML export to Markdown
   - Parses WordPress XML export format with `xml2js`
   - Similar Markdown conversion and frontmatter generation
   - Useful for standard WXR (WordPress eXtended RSS) exports

These are **one-time migration tools** - not part of the runtime application. Both scripts use `turndown` for HTML→Markdown conversion and generate the same frontmatter structure used by `src/utils/post.ts`.

## Key Files to Reference

- `src/utils/post.ts`: Content processing pipeline
- `src/utils/image.ts`: Image optimization with blur placeholders
- `src/app/work/_data/posts.ts`: Work portfolio data layer
- `eslint.config.mjs`: Import sorting and code quality rules
- `next.config.ts`: Turbopack custom loaders and redirects
- `src/app/layout.tsx`: Root layout with parallel routes example
- `src/components/Terminal/Prompt.tsx`: Terminal prompt component with segment configs
- `src/app/@prompt/`: Parallel route slot for per-page prompt customization
