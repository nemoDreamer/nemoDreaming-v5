import { createElement } from "react";
import remark from "remark";
import html from "remark-html";

const toHTML = (markdown: string) =>
  remark().use(html).processSync(markdown).toString();

const Markdown: React.FC<{
  content: string;
  tag?: string;
  className?: string;
}> = ({ content, tag = "div", className }) =>
  createElement(tag, {
    className,
    // TODO: use `remark-react` to avoid this!
    dangerouslySetInnerHTML: { __html: toHTML(content) },
  });

export default Markdown;
