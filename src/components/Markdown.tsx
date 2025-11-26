import { createElement } from "react";
import ReactMarkdown, { type Components } from "react-markdown";

import H1 from "./core/H1";
import H2 from "./core/H2";
import H3 from "./core/H3";

/*
TODO:
- [ ] use rehype-slug and rehype-autolink-headings to add ids and links to headings
- [ ] use remark-gfm to support GitHub Flavored Markdown (tables, task lists, etc.)
*/

const DEFAULT_COMPONENTS: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
};

const SINGLE_LINE_COMPONENT: Components = {
  p: ({ children }) => <>{children}</>,
};

const Markdown: React.FC<{
  content: string;
  tag?: string;
  className?: string;
  components?: Components;
  isSingleLine?: boolean;
}> = ({
  content,
  tag = "div",
  className,
  components = {},
  isSingleLine = false,
}) =>
  createElement(
    tag,
    { className },
    <ReactMarkdown
      components={{
        ...DEFAULT_COMPONENTS,
        ...(isSingleLine ? SINGLE_LINE_COMPONENT : {}),
        ...components,
      }}
    >
      {content}
    </ReactMarkdown>,
  );

export default Markdown;
